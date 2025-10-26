# TaskZilla Lite

TaskZilla Lite is a premium task management application that allows users to create, organize, update, and remove tasks with ease. It supports task assignments, customizable priority levels, completion tracking, editing, deletion, and sorting. The app works both online using a hosted backend and locally on a developer's machine.

## Live Demo
You can use TaskZilla Lite immediately without any setup:  
https://mohamedsalimagil.github.io/TaskZilla/

Tasks created on the live site are saved online using the Render backend.

## Real-World Use Case
TaskZilla Lite helps individuals and small teams manage daily tasks more effectively by centralizing responsibilities, deadlines, and progress. Instead of relying on scattered notes or memory, users can assign tasks, prioritize their work, set due dates, and track completion in one place. It removes guesswork around responsibility, reduces forgetfulness, and improves task visibility.

## Features
- Create tasks with a description  
- Assign a task to any user by name  
- Set a due date for each task  
- Choose priority levels: low, medium, or high  
- Mark tasks as complete by checking the box (tasks get underlined to indicate completion)  
- Edit existing tasks directly  
- Delete tasks you no longer need  
- Sort tasks by priority  
- Sort tasks by due date  
- Dynamic motivational quotes displayed in the footer — fetched securely through the Render backend  
- Premium sidebar with real-time task statistics, quick actions, due soon tracker, and productivity tips  
- Floating action button for modern task creation experience  
- Export functionality to CSV format for Excel compatibility  
- Responsive design optimized for both desktop and mobile devices  
- All-in-one interface for efficient task control  

## Technologies Used
- HTML, CSS, JavaScript for the frontend  
- JSON Server and Render backend for data handling  
- Node.js with Express-style JSON Server extensions  
- GitHub Pages for live deployment  

## Dynamic Quote Integration
The app now features an inspirational quote strip at the bottom of the page.  
Quotes are fetched dynamically from [Quotable API](https://quotable.io/) through a custom backend endpoint hosted on Render to ensure smooth loading without CORS issues.  

If the external API is unavailable, the system automatically displays one of several **fallback motivational quotes** curated by the TaskZilla Team — ensuring a seamless experience every time.  

## Backend Endpoint Example
`GET https://taskzilla-vz2d.onrender.com/api/quote`

This endpoint returns a random quote in JSON format:
```json
{
  "content": "Stay hungry, stay foolish.",
  "author": "Steve Jobs"
}
```

## Premium Sidebar Features
The application now includes an advanced sidebar with:  
- **Task Statistics:** Real-time counters for total, completed, and pending tasks  
- **Quick Actions:** One-click buttons to clear completed tasks, mark all as done, and export to Excel  
- **Due Soon Tracker:** Automatic detection of tasks due within 3 days  
- **Productivity Tips:** Rotating tips to help improve workflow efficiency  

## How to Use the App

### Option 1: Use the Live Hosted Version (No Installation)
Visit the hosted site:  
https://mohamedsalimagil.github.io/TaskZilla/  

All tasks created will be stored on the live Render backend.

### Option 2: Run Locally on Your Machine
Clone the repository:
```bash
git clone https://github.com/mohamedsalimagil/TaskZilla.git
cd TaskZilla
```

Make sure you have Node.js and npm installed.

Install dependencies:
```bash
npm install
npm install node-fetch
```
Create a local database file:
```bash
echo '{"tasks": []}' > db.json

Start a local JSON server (or run your full backend with quotes):
```bash
node server.js
```
or
```bash
npx json-server --watch db.json --port 3000
```

Open `index.html` in your browser (e.g., right-click and select **Open with Live Server** in VS Code or open the file directly).

The app will interact with:
```bash
http://localhost:3000/tasks
```
and will fetch quotes locally from:
```bash
http://localhost:3000/api/quote
```

## User Interface
- **Floating Action Button:** Click the `+` button in the top-right corner to add new tasks  
- **Sidebar Navigation:** Access statistics, quick actions, and productivity features from the left sidebar  
- **Task Management:** Use the checkboxes to mark tasks complete, and the menu buttons to edit or delete tasks  
- **Sorting Options:** Use the sort toolbar to organize tasks by due date or priority  

## Author
**Mohamed Salim Agil**

## License
This project is licensed under the **MIT License**.  

