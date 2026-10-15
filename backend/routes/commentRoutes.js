import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { remove } from '../controllers/commentController.js'
const r = Router()
r.delete('/:id', protect, remove)
export default r
