import requests
import time

API_BASE = "https://fleetbots-production.up.railway.app/api"
ROVERS = [f"Rover-{i}" for i in range(1, 6)]
DIRECTIONS = ["forward", "backward", "left", "right"]
TASKS = ["Soil Analysis", "Irrigation", "Weeding", "Crop Monitoring"]

def start_session():
    try:
        res = requests.post(f"{API_BASE}/session/start", timeout=5)
        res.raise_for_status()
        return res.json().get("session_id")
    except Exception as e:
        print(f"[ERROR] Starting session failed: {e}")
        return None

def get(endpoint, session_id):
    try:
        res = requests.get(f"{endpoint}?session_id={session_id}", timeout=5)
        res.raise_for_status()
        return res.json()
    except Exception as e:
        print(f"[ERROR] GET failed: {e}")
        return None

def post(endpoint, session_id, params=None):
    try:
        url = f"{endpoint}?session_id={session_id}"
        if params:
            for key, val in params.items():
                url += f"&{key}={val}"
        res = requests.post(url, timeout=5)
        res.raise_for_status()
        return res.json()
    except Exception as e:
        print(f"[ERROR] POST failed: {e}")
        return None

def monitor_rovers(session_id):
    for rover in ROVERS:
        print(f"\n--- {rover} ---")
        
        # Status
        status = get(f"{API_BASE}/rover/{rover}/status", session_id)
        if status: print("Status:", status)
        
        # Battery
        battery = get(f"{API_BASE}/rover/{rover}/battery", session_id)
        if battery: print("Battery:", battery)
        
        # Coordinates
        coords = get(f"{API_BASE}/rover/{rover}/coordinates", session_id)
        if coords: print("Coordinates:", coords)
        
        # Sensor Data
        sensors = get(f"{API_BASE}/rover/{rover}/sensor-data", session_id)
        if sensors: print("Sensors:", sensors)

def assign_random_task(session_id, rover):
    task = TASKS[rover.__hash__() % len(TASKS)]
    print(f"Assigning {task} to {rover}")
    post(f"{API_BASE}/rover/{rover}/task", session_id, {"task": task})

def move_rover(session_id, rover, direction="forward"):
    print(f"Moving {rover} {direction}")
    post(f"{API_BASE}/rover/{rover}/move", session_id, {"direction": direction})

def main():
    session_id = start_session()
    if not session_id:
        print("[FATAL] Could not get session_id. Exiting.")
        return

    print(f"[INFO] Session started: {session_id}")

    try:
        while True:
            monitor_rovers(session_id)
            time.sleep(15)  # every 15 seconds

            # Uncomment to control rovers:
            # for rover in ROVERS:
            #     assign_random_task(session_id, rover)
            #     move_rover(session_id, rover, direction="right")

    except KeyboardInterrupt:
        print("\n[INFO] Monitoring stopped by user.")

if __name__ == "__main__":
    main()
