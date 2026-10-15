import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as c from '../controllers/authController.js'
const r = Router()
r.post('/register', c.register); r.post('/login', c.login); r.post('/refresh', c.refresh); r.post('/logout', c.logout)
r.get('/me', protect, c.me)
export default r
