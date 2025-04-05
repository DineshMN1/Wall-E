# 🚜 Wall-E: Autonomous Fleet-Based Rover System for Smart Agricultural Supervision

## 🌐 Project Overview

**Wall-E** is a smart simulation and monitoring system that manages a **fleet of autonomous agricultural rovers** using **Webots Simulation** and a custom backend with real-time dashboards. It continuously fetches rover data every **2 seconds** and displays metrics like GPS location, battery, soil moisture, and temperature.

Each **rover** is assigned a dynamic session ID to sync individual data streams. This setup is ideal for precision agriculture, research, and scalable field automation projects.

---

## 📊 Dashboard  

![Dashboard](/public/home.jpg)

## 🚁 Simulation

![Simulation](/public/simulation.jpg)

## 📈 Data Analysis

![Data Analysis](/public/analyse.jpg)

## 🚨 Alerts

![Alerts](/public/alert.jpg)

## 🤖 N8N Bot Workflow  

![Bot](/public/n8n.jpg)

---

## ⚙️ Features

- 🌾 Simulate and monitor **multiple rovers** in real-time
- 🏎️ Fetch rover data every **2 seconds** from the backend
- 🧠 Dynamic session-based data handling
- 🔋 Monitor **battery**, **GPS**, **soil moisture**, and **temperature**
- 🗂️ Continuous **logging** for analytics
- 📢 Automated **alerts** via N8N workflows

---

## 💻 Tech Stack

- **Webots** – Robot simulation platform for autonomous fleets  
- **Python** – Backend scripting and data handling  
- **Flask** – API server to serve rover data  
- **Subprocess** – Launch and control multiple simulation processes  
- **REST API** – Fetch rover data in real-time  
- **Next.js** – Frontend framework for live monitoring dashboard  
- **Tailwind CSS** – Modern styling for responsive UI  
- **TypeScript** – Strongly-typed frontend logic  
- **N8N** – Workflow automation for real-time notifications

---

## 📦 Requirements

- Webots: [Download from Cyberbotics](https://cyberbotics.com/)
- Python 3.x

### Python Libraries

Install required Python packages:

```bash
pip install flask requests opencv
```

---

## 🛠️ Installation

Clone the repository and set up your environment:

```bash
git clone https://github.com/DineshMN1/Wall-E.git
cd Wall-E
```

---

## 👨‍💻 Team Details

| Name            | GitHub Profile                                |
|-----------------|------------------------------------------------|
| Dinesh M        | [@DineshMN1](https://github.com/DineshMN1)     |
| Divaesh Nandaa  | [@Divaesh07](https://github.com/Divaesh07)     |
| Hakesh M        | [@Hakesh0](https://github.com/Hakesh0)         |
| Dhanush D       | [@Worldofdhanush](https://github.com/Worldofdhanush) |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

If you have questions or want to contribute, feel free to open an issue or contact us through our GitHub profiles.
