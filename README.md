# Fleet Test Robot Simulation and Backend Monitoring

## Project Overview

This project integrates **Webots Simulation** with a **Backend Monitoring System** for fleet management, simulating multiple rovers, monitoring their data (status, battery, coordinates, sensor data), and dynamically assigning session IDs to ensure proper synchronization. 

The backend system provides real-time data updates for each rover, including environmental and operational metrics. This system is perfect for simulating and monitoring fleets of autonomous rovers or similar robotic systems.

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
