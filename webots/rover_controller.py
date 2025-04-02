from controller import Robot, DistanceSensor
import requests
import os
import time
import random

API_BASE = "https://fleetbots-production.up.railway.app/api"
SESSION_FILE = "session_id.txt"
API_INTERVAL = 100
SESSION_REFRESH_STEPS = 50

robot = Robot()
timestep = int(robot.getBasicTimeStep())
rover_name = robot.getName()
is_leader = rover_name == "Rover-1"

# === MOTORS ===
left_motor = robot.getDevice('left wheel motor')
right_motor = robot.getDevice('right wheel motor')
left_motor.setPosition(float('inf'))
right_motor.setPosition(float('inf'))
left_motor.setVelocity(5)
right_motor.setVelocity(1)

# === DISTANCE SENSORS (FOR OBSTACLE DETECTION) ===
ds_names = ['ds_left', 'ds_right', 'ds_front']
ds_sensors = {}

for name in ds_names:
    sensor = robot.getDevice(name)
    if sensor:
        sensor.enable(timestep)
        ds_sensors[name] = sensor
    else:
        print(f"[{rover_name}] ⚠️ Sensor '{name}' not found.")

# === SESSION HANDLING ===
session_id = None
last_session_step = -SESSION_REFRESH_STEPS

def write_session_to_file(session):
    with open(SESSION_FILE, "w") as f:
        f.write(session)
    with open("session_log.txt", "a") as log:
        log.write(f"{session} | {time.ctime()}\n")

def read_session_from_file():
    if os.path.exists(SESSION_FILE):
        with open(SESSION_FILE, "r") as f:
            return f.read().strip()
    return None

def start_new_session():
    try:
        res = requests.post(f"{API_BASE}/session/start", timeout=5)
        res.raise_for_status()
        new_session = res.json().get("session_id")
        print(f"[{rover_name}] 🔄 New session started: {new_session}")
        write_session_to_file(new_session)
        return new_session
    except Exception as e:
        print(f"[{rover_name}] ❌ Failed to start session:", e)
        return None

def get_data(path, retries=1):
    global session_id
    try:
        url = f"{API_BASE}/{path}?session_id={session_id}"
        res = requests.get(url, timeout=5)
        if res.ok:
            return res.json()
        else:
            print(f"[{rover_name}] ❌ API error [{path}]: Status {res.status_code}")
    except Exception as e:
        print(f"[{rover_name}] ❌ API error [{path}]: {e}")
        if retries > 0:
            time.sleep(1)
            return get_data(path, retries - 1)
    return None

# === MOVEMENT LOGIC ===
def avoid_obstacle():
    # Very simple logic: If front blocked, turn right or left randomly
    left = ds_sensors.get("ds_left").getValue() if "ds_left" in ds_sensors else 0
    right = ds_sensors.get("ds_right").getValue() if "ds_right" in ds_sensors else 0
    front = ds_sensors.get("ds_front").getValue() if "ds_front" in ds_sensors else 0

    if front > 80 or left > 80 or right > 80:
        # Turn with 50-50 chance
        turn = random.choice(["left", "right"])
        print(f"[{rover_name}] 🛑 Obstacle detected! Turning {turn}")
        if turn == "left":
            left_motor.setVelocity(2.0)
            right_motor.setVelocity(6.0)
        else:
            left_motor.setVelocity(6.0)
            right_motor.setVelocity(2.0)
        return True
    return False

def move_forward():
    left_motor.setVelocity(5.0)
    right_motor.setVelocity(5.0)

def grid_walk():
    # Simulate walking in a grid
    turn_chance = random.randint(0, 100)
    if turn_chance < 10:
        # Simulate 90° left/right turn occasionally~
        if random.choice(["left", "right"]) == "left":
            left_motor.setVelocity(3.0)
            right_motor.setVelocity(5.0)
        else:
            left_motor.setVelocity(5.0)
            right_motor.setVelocity(3.0)
    else:
        move_forward()

# === MAIN LOOP ===
counter = 0
while robot.step(timestep) != -1:
    counter += 1

    # Session update
    if counter - last_session_step >= SESSION_REFRESH_STEPS:
        last_session_step = counter
        if is_leader:
            session_id = start_new_session()
        else:
            print(f"[{rover_name}] Waiting for session...")
            for _ in range(10):
                sid = read_session_from_file()
                if sid and sid != session_id:
                    session_id = sid
                    break
                time.sleep(0.5)

    # === MOVEMENT HANDLING ===
    if not avoid_obstacle():
        grid_walk()

    # Log API data
    if counter % API_INTERVAL == 0 and session_id:
        print(f"\n--- [{rover_name}] API DATA ---")
        print("Status:", get_data(f"rover/{rover_name}/status"))
        print("Coords:", get_data(f"rover/{rover_name}/coordinates"))
        print("Battery:", get_data(f"rover/{rover_name}/battery"))
        print("Sensors:", get_data(f"rover/{rover_name}/sensor-data"))

        if is_leader:
            print("--- Fleet ---")
            fleet = get_data("fleet/status")
            if fleet:
                for r, info in fleet.items():
                    print(f"{r} => {info}")
