import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { upload } from '../utils/upload.js'
import * as c from '../controllers/storyController.js'
const r = Router()
r.use(protect)
r.route('/').get(c.list).post(upload.single('image'), c.create)
r.delete('/:id', c.remove)
export default r
