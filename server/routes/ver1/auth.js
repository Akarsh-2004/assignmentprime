const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const User = require('../../models/User');

const router = express.Router();

const registerSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

function signAccessToken(user) {
  return jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' });
}
function signRefreshToken(user) {
  return jwt.sign({ sub: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' });
}

// REGISTER
router.post('/register', async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: true, message: error.message });

    const exists = await User.findOne({ email: value.email });
    if (exists) return res.status(409).json({ error: true, message: 'Email already registered' });

    const hashed = await bcrypt.hash(value.password, 10);
    const user = await User.create({ email: value.email, password: hashed, name: value.name });
    res.status(201).json({ data: { id: user._id, email: user.email, name: user.name, role: user.role }});
  } catch (err) { next(err); }
});

// LOGIN
router.post('/login', async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: true, message: error.message });

    const user = await User.findOne({ email: value.email });
    if (!user) return res.status(401).json({ error: true, message: 'Invalid credentials' });

    const match = await bcrypt.compare(value.password, user.password);
    if (!match) return res.status(401).json({ error: true, message: 'Invalid credentials' });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7*24*60*60*1000
    });

    res.json({ accessToken, user: { id: user._id, email: user.email, role: user.role }});
  } catch (err) { next(err); }
});

// REFRESH
router.post('/refresh', async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: true, message: 'No refresh token' });

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: true, message: 'Invalid session' });

    const accessToken = signAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ error: true, message: 'Invalid or expired refresh token' });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ ok: true });
});

module.exports = router;
