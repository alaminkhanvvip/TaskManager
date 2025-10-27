# Task Manager 2025 🚀

A modern, feature-rich MERN stack task management application built for 2025 with cutting-edge technologies and user experience.

## ✨ Features

### Core Functionality
- ✅ **CRUD Operations** - Create, read, update, delete tasks
- 🔍 **Advanced Search** - Search by title, description, and tags
- 🎨 **Smart Filtering** - Filter by priority, category, completion status
- 📈 **Real-time Analytics** - Task statistics and insights
- 📅 **Due Date Management** - Set and track task deadlines
- ⏱️ **Time Estimation** - Estimate task completion time
- 🏷️ **Tag System** - Organize tasks with custom tags
- 📋 **Categories** - Work, Personal, Shopping, Health, Other

### Modern UX/UI
- 🌌 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Clean, intuitive interface with DaisyUI
- 🔥 **Real-time Updates** - Instant feedback with React Query
- 🔔 **Toast Notifications** - User-friendly success/error messages
- ⚡ **Bulk Operations** - Select and manage multiple tasks
- 📊 **Visual Priority** - Color-coded priority levels
- 🔄 **Smart Sorting** - Multiple sorting options

### Advanced Features
- 🚨 **Overdue Detection** - Automatic overdue task highlighting
- 📊 **Progress Tracking** - Visual completion statistics
- 🔍 **Intelligent Search** - Search across multiple fields
- 📋 **Category Icons** - Visual category identification
- ⏰ **Time Tracking** - Estimated vs actual time
- 🏆 **Priority Levels** - Low, Medium, High, Urgent

## 🛠️ Tech Stack

### Frontend (2025 Modern Stack)
- **React 19** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool
- **TanStack Query** - Powerful data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library
- **Lucide React** - Modern icon library
- **React Hot Toast** - Elegant notifications
- **date-fns** - Modern date utility library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository>
cd TaskManager
npm install
cd backend && npm install
```

2. **Start MongoDB** (if using local):
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

3. **Start the backend:**
```bash
cd backend
npm run dev
```

4. **Start the frontend:**
```bash
npm run dev
```

5. **Open your browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (with filtering)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/bulk` - Bulk update tasks
- `GET /api/tasks/analytics` - Get task analytics

### Query Parameters
- `search` - Search in title, description, tags
- `priority` - Filter by priority (low, medium, high, urgent)
- `category` - Filter by category
- `completed` - Filter by completion status
- `sortBy` - Sort field (createdAt, dueDate, priority, title)
- `order` - Sort order (asc, desc)

## 🌐 Environment Variables

Create `.env` in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/taskmanager
PORT=5000
```

## 📱 Screenshots

*Modern dashboard with analytics, search, and filtering*
*Responsive design that works on all devices*
*Bulk operations for managing multiple tasks*

## 🔮 Future Enhancements

- 🤖 AI-powered task suggestions
- 📅 Calendar integration
- 🔔 Push notifications
- 📊 Advanced analytics dashboard
- 👥 Team collaboration features
- 📱 Mobile app (React Native)
- 🌍 Offline support with PWA

## 📝 License

MIT License - feel free to use this project for learning and development!

---

**Built with ❤️ for 2025** - Showcasing modern web development practices and user experience design.
