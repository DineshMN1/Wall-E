from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Constants
API_BASE = "https://fleetbots-production.up.railway.app/api"
ROVERS = [f"Rover-{i}" for i in range(1, 6)]
TASKS = ["Soil Analysis", "Irrigation", "Weeding", "Crop Monitoring"]
DIRECTIONS = ["forward", "backward", "left", "right"]

# Global session storage
session_id = None

# Start a new session
def start_session():
    global session_id
    try:
        res = requests.post(f"{API_BASE}/session/start", timeout=5)
        res.raise_for_status()
        session_id = res.json().get("session_id")
        print(f"[INFO] Session started: {session_id}")
    except Exception as e:
        print(f"[ERROR] Starting session failed: {e}")
        session_id = None

# Helper to GET data
def get_data(endpoint):
    if not session_id:
        return {"error": "Session ID not available"}
    try:
        res = requests.get(f"{endpoint}?session_id={session_id}", timeout=5)
        res.raise_for_status()
        return res.json()
    except Exception as e:
        return {"error": str(e)}

# Flask route: GET data for specific rover and type
@app.route('/rovers/<rover_id>/<data_type>', methods=['GET'])
def rover_info(rover_id, data_type):
    if rover_id not in ROVERS:
        return jsonify({"error": f"Invalid rover ID: {rover_id}"}), 400

    endpoint_map = {
        "status": f"{API_BASE}/rover/{rover_id}/status",
        "battery": f"{API_BASE}/rover/{rover_id}/battery",
        "coordinates": f"{API_BASE}/rover/{rover_id}/coordinates",
        "sensor-data": f"{API_BASE}/rover/{rover_id}/sensor-data",
        "sensors": f"{API_BASE}/rover/{rover_id}/sensor-data",  # alias
    }

    if data_type not in endpoint_map:
        return jsonify({"error": f"Invalid data type: {data_type}"}), 400

    data = get_data(endpoint_map[data_type])
    return jsonify(data)

# Optional: Assign a task to a rover
@app.route('/rovers/<rover_id>/assign-task', methods=['POST'])
def assign_task(rover_id):
    import random
    if rover_id not in ROVERS:
        return jsonify({"error": "Invalid rover ID"}), 400
    task = random.choice(TASKS)
    res = requests.post(
        f"{API_BASE}/rover/{rover_id}/task?session_id={session_id}&task={task}"
    )
    return jsonify({"assigned": task, "status": res.status_code})

# Optional: Move a rover
@app.route('/rovers/<rover_id>/move/<direction>', methods=['POST'])
def move_rover(rover_id, direction):
    if rover_id not in ROVERS or direction not in DIRECTIONS:
        return jsonify({"error": "Invalid rover or direction"}), 400
    res = requests.post(
        f"{API_BASE}/rover/{rover_id}/move?session_id={session_id}&direction={direction}"
    )
    return jsonify({"direction": direction, "status": res.status_code})

# 🔁 Ensure session is started before server begins
start_session()

if __name__ == "__main__":
    app.run(host="localhost", port=5050)

