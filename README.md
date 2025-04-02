# Fleet Test Robot Simulation and Backend Monitoring

## Project Overview

This project integrates **Webots Simulation** with a **Backend Monitoring System** for fleet management, simulating multiple rovers, monitoring their data (status, battery, coordinates, sensor data), and dynamically assigning session IDs to ensure proper synchronization. 

The backend system provides real-time data updates for each rover, including environmental and operational metrics. This system is perfect for simulating and monitoring fleets of autonomous rovers or similar robotic systems.

## Dashboard
![image](https://github.com/user-attachments/assets/52806467-0a93-42ee-9f0e-3f5988f52c40)

## Simulation
![simulation-preview](https://github.com/user-attachments/assets/8726b20c-79a0-4661-8f01-8e589667f2b9)

## Data Analysis
![image](https://github.com/user-attachments/assets/2bba81aa-39b7-43c2-a90e-020225b92b19)

## Alerts
![image](https://github.com/user-attachments/assets/23f8c260-860d-48e1-94f2-bde60e3c32e9)

## N8N Workflow (Message Bot)
![Screenshot 2025-04-02 152406](https://github.com/user-attachments/assets/b00a69da-e262-48bf-aaa8-b19880368bc0)

## Features

- **Simulate Multiple Rovers**: Control multiple rovers in Webots, a robot simulation software.
- **Backend Monitoring**: Continuously track rover data such as status, battery level, coordinates, and sensor information.
- **Dynamic Session Management**: Each rover can independently handle session IDs, ensuring each rover’s data is properly synchronized.
- **API Data Fetching**: Real-time fetching of rover data including status, coordinates, soil moisture, temperature, and battery levels.
- **Log Data**: Logs rover data continuously, providing detailed insights for each rover's health and performance.

## Technologies Used

- **Webots**: Open-source robot simulator.
- **Python**: For backend logic and rover data management.
- **REST API**: To fetch and update rover data.
- **Subprocess**: To handle launching multiple rovers and their environments simultaneously.

## Requirements

- **Webots**: A robot simulator (Download from [Cyberbotics](https://cyberbotics.com/)).
- **Python 3.x**: Ensure Python is installed on your system.
- **Libraries**:
  - `requests`: For making HTTP requests.
  - `subprocess`: For launching external processes (Webots).
  - `time`: For handling delays.
  - `logging`: To log rover data and actions.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/fleet-test-robot.git
cd fleet-test-robot
