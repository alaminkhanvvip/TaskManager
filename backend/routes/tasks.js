const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// GET all tasks with filtering and search
router.get('/', async (req, res) => {
  try {
    const { search, priority, category, completed, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (priority) query.priority = priority;
    if (category) query.category = category;
    if (completed !== undefined) query.completed = completed === 'true';
    
    const sortOrder = order === 'desc' ? -1 : 1;
    const tasks = await Task.find(query).sort({ [sortBy]: sortOrder });
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create task
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH bulk update
router.patch('/bulk', async (req, res) => {
  try {
    const { ids, updates } = req.body;
    await Task.updateMany({ _id: { $in: ids } }, updates);
    res.json({ message: 'Tasks updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET analytics
router.get('/analytics', async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const completed = await Task.countDocuments({ completed: true });
    const pending = total - completed;
    const overdue = await Task.countDocuments({ 
      dueDate: { $lt: new Date() }, 
      completed: false 
    });
    
    const byPriority = await Task.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);
    
    const byCategory = await Task.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    res.json({ total, completed, pending, overdue, byPriority, byCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;