const mongoose = require('mongoose');
const Task = require('./models/Task');
require('dotenv').config();

const sampleTasks = [
  { title: 'Complete project proposal', description: 'Write and submit the Q1 project proposal', priority: 'high', category: 'work', tags: ['urgent', 'deadline'], dueDate: new Date('2025-01-15'), estimatedTime: 120 },
  { title: 'Buy groceries', description: 'Milk, bread, eggs, vegetables', priority: 'medium', category: 'shopping', tags: ['weekly'], dueDate: new Date('2025-01-10'), estimatedTime: 45 },
  { title: 'Doctor appointment', description: 'Annual checkup with Dr. Smith', priority: 'high', category: 'health', tags: ['appointment'], dueDate: new Date('2025-01-12'), estimatedTime: 60 },
  { title: 'Learn React Query', description: 'Study TanStack Query documentation', priority: 'medium', category: 'personal', tags: ['learning', 'development'], estimatedTime: 180 },
  { title: 'Team meeting prep', description: 'Prepare slides for weekly standup', priority: 'medium', category: 'work', tags: ['meeting'], dueDate: new Date('2025-01-08'), estimatedTime: 30 },
  { title: 'Gym workout', description: 'Chest and triceps routine', priority: 'low', category: 'health', tags: ['fitness'], estimatedTime: 90 },
  { title: 'Call mom', description: 'Weekly check-in call', priority: 'medium', category: 'personal', tags: ['family'], dueDate: new Date('2025-01-09'), estimatedTime: 30 },
  { title: 'Fix bug #247', description: 'Resolve authentication issue in production', priority: 'urgent', category: 'work', tags: ['bug', 'critical'], dueDate: new Date('2025-01-07'), estimatedTime: 240 },
  { title: 'Plan weekend trip', description: 'Research hotels and activities for weekend getaway', priority: 'low', category: 'personal', tags: ['travel', 'fun'], estimatedTime: 60 },
  { title: 'Update resume', description: 'Add recent projects and skills', priority: 'medium', category: 'work', tags: ['career'], estimatedTime: 90 },
  { title: 'Clean apartment', description: 'Deep clean kitchen and bathroom', priority: 'low', category: 'personal', tags: ['chores'], estimatedTime: 120 },
  { title: 'Code review', description: 'Review pull requests from team members', priority: 'high', category: 'work', tags: ['review'], dueDate: new Date('2025-01-08'), estimatedTime: 45 },
  { title: 'Buy birthday gift', description: 'Find gift for Sarah\'s birthday party', priority: 'medium', category: 'shopping', tags: ['gift'], dueDate: new Date('2025-01-14'), estimatedTime: 60 },
  { title: 'Backup files', description: 'Backup important documents to cloud storage', priority: 'low', category: 'other', tags: ['maintenance'], estimatedTime: 30 },
  { title: 'Meditation practice', description: '20-minute morning meditation', priority: 'low', category: 'health', tags: ['mindfulness'], estimatedTime: 20, completed: true }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Task.deleteMany({});
    console.log('Cleared existing tasks');
    
    await Task.insertMany(sampleTasks);
    console.log(`Inserted ${sampleTasks.length} sample tasks`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();