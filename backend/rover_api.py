from flask import Flask, jsonify, Response, request
from flask_cors import CORS
import requests
import time
import os
import cv2
import subprocess
import psutil
import socket

app = Flask(__name__)
CORS(app)

# === Constants ===
API_BASE = "https://fleetbots-production.up.railway.app/api"
ROVERS = [f"Rover-{i}" for i in range(1, 6)]
DIRECTIONS = ["forward", "backward", "left", "right"]
SESSION_FILE = "session_id.txt"
LOG_FILE = "session_log.txt"
SESSION_REFRESH_INTERVAL = 50
ROVER_SOCKET_PORTS = {
    "Rover-1": 9001,
    "Rover-2": 9002,
    "Rover-3": 9003,
    "Rover-4": 9004,
    "Rover-5": 9005
}

# === Globals ===
session_id = None
request_counter = 0
webots_process = None

# === Session Utilities ===
def write_session_to_file(sid):
    with open(SESSION_FILE, "w") as f:
        f.write(sid)
    with open(LOG_FILE, "a") as log:
        log.write(f"{sid} | {time.ctime()}\n")

def read_session_from_file():
    if os.path.exists(SESSION_FILE):
        with open(SESSION_FILE, "r") as f:
            return f.read().strip()
    return None

def start_session():
    global session_id
    try:
        res = requests.post(f"{API_BASE}/session/start", timeout=5)
        res.raise_for_status()
        session_id = res.json().get("session_id")
        write_session_to_file(session_id)
        print(f"[INFO] New session started: {session_id}")
    except Exception as e:
        print(f"[ERROR] Failed to start session: {e}")
        session_id = None

def refresh_session_if_needed():
    global request_counter
    request_counter += 1
    if request_counter >= SESSION_REFRESH_INTERVAL:
        request_counter = 0
        start_session()

# === Rover API ===
@app.route("/rovers/<rover_id>/<data_type>")
def fetch_rover_data(rover_id, data_type):
    if rover_id not in ROVERS:
        return jsonify({"error": "Invalid rover ID"}), 400
    endpoint_map = {
        "status": f"rover/{rover_id}/status",
        "battery": f"rover/{rover_id}/battery",
        "coordinates": f"rover/{rover_id}/coordinates",
        "sensors": f"rover/{rover_id}/sensor-data",
        "sensor-data": f"rover/{rover_id}/sensor-data"
    }
    if data_type not in endpoint_map:
        return jsonify({"error": "Invalid data type"}), 400
    data = get_data(endpoint_map[data_type])
    return jsonify(data)

def get_data(path):
    refresh_session_if_needed()
    sid = session_id or read_session_from_file()
    if not sid:
        return {"error": "No active session_id"}
    try:
        res = requests.get(f"{API_BASE}/{path}?session_id={sid}", timeout=5)
        res.raise_for_status()
        return res.json()
    except Exception as e:
        return {"error": str(e)}

# === Webots Simulation Controls ===
@app.route("/start")
def start_simulation():
    global webots_process
    if webots_process is None:
        try:
            webots_process = subprocess.Popen([
                r"C:\Program Files\Webots\msys64\mingw64\bin\webots.exe",
                "--stdout",
                r"C:\Users\disng\slambot_sim\webots\worlds\slambot_world.wbt"
            ])
            return jsonify({"message": "✅ Simulation started"})
        except Exception as e:
            print("❌ Failed to start Webots:", e)
            return jsonify({"message": f"❌ Failed: {e}"}), 500
    return jsonify({"message": "❗ Already running"})

@app.route("/reset")
def reset_simulation():
    global webots_process
    if webots_process:
        try:
            parent = psutil.Process(webots_process.pid)
            for child in parent.children(recursive=True):
                child.kill()
            parent.kill()
            webots_process.wait()
            webots_process = None
        except Exception as e:
            print("❌ Failed to reset:", e)
            return jsonify({"message": f"❌ Failed to reset: {e}"}), 500
    return start_simulation()

# === Broadcast to All Rovers ===
def broadcast_socket_command(command):
    results = []
    for port in ROVER_SOCKET_PORTS.values():
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect(("localhost", port))
            s.send(command.encode())
            s.close()
            results.append(f"✅ Command '{command}' sent to port {port}")
        except Exception as e:
            results.append(f"❌ Port {port} failed: {e}")
    return results

@app.route("/forward")
def move_all_forward():
    result = broadcast_socket_command("FORWARD")
    return jsonify({
        "message": "🚀 Forward command sent to all rovers",
        "result": result
    })

@app.route("/backward")
def move_all_backward():
    result = broadcast_socket_command("BACKWARD")
    return jsonify({
        "message": "⬅️ Backward command sent to all rovers",
        "result": result
    })

# === Move Individual Rover with Direction ===
@app.route("/move")
def move_single_rover():
    rover = request.args.get("rover")
    direction = request.args.get("dir")

    if not rover or not direction:
        return jsonify({"message": "❌ Missing 'rover' or 'dir' parameter"}), 400

    port = ROVER_SOCKET_PORTS.get(rover)
    if not port:
        return jsonify({"message": f"❌ Unknown rover name: {rover}"}), 400

    direction_upper = direction.strip().upper()
    if direction_upper not in ["FORWARD", "BACKWARD", "LEFT", "RIGHT"]:
        return jsonify({"message": f"❌ Invalid direction: {direction}"}), 400

    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect(("localhost", port))
        s.send(direction_upper.encode())
        s.close()
        return jsonify({"message": f"✅ Sent '{direction_upper}' to {rover}"})
    except Exception as e:
        return jsonify({"message": f"❌ Socket error: {e}"}), 500

# === OBS Stream ===
def gen():
    cap = cv2.VideoCapture(1)
    if not cap.isOpened():
        raise RuntimeError("❌ OBS virtual camera not found.")
    while True:
        success, frame = cap.read()
        if not success:
            break
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route("/stream")
def video_feed():
    return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route("/")
def home():
    return jsonify({"message": "🌱 Rover API is running with Simulation + OBS!"})

if __name__ == "__main__":
    start_session()
    app.run(host="localhost", port=5050)
