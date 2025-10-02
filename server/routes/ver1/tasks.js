const express = require('express');
const Joi = require('joi');
const Task = require('../../models/Task');
const { authenticate, authorize } = require('../../middlewares/auth');

const router = express.Router();

const taskSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().allow('', null),
  completed: Joi.boolean().optional()
});

// GET /api/v1/tasks
router.get('/', authenticate, async (req, res, next) => {
  try {
    if (req.user.role === 'ADMIN') {
      const all = await Task.find().populate('owner', 'email name role');
      return res.json({ data: all });
    }
    const tasks = await Task.find({ owner: req.user.id });
    res.json({ data: tasks });
  } catch (err) { next(err); }
});

// POST create
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { error, value } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ error: true, message: error.message });
    const t = await Task.create({ ...value, owner: req.user.id });
    res.status(201).json({ data: t });
  } catch (err) { next(err); }
});

// PUT update
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: true, message: 'Not found' });
    if (req.user.role !== 'ADMIN' && task.owner.toString() !== req.user.id) return res.status(403).json({ error: true, message: 'Forbidden' });

    const { error, value } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ error: true, message: error.message });

    Object.assign(task, value);
    await task.save();
    res.json({ data: task });
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: true, message: 'Not found' });
    if (req.user.role !== 'ADMIN' && task.owner.toString() !== req.user.id) return res.status(403).json({ error: true, message: 'Forbidden' });

    await task.deleteOne();
    res.json({ ok: true });
  } catch (err) { next(err); }
});

module.exports = router;
