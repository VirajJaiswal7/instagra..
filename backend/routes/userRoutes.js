import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { upload } from '../utils/upload.js'
import * as c from '../controllers/userController.js'
const r = Router()
r.use(protect)
r.get('/suggestions', c.suggestions)
r.patch('/me', upload.single('avatar'), c.updateMe)
r.post('/:id/follow', c.follow); r.post('/:id/unfollow', c.unfollow)
r.get('/:username', c.getProfile)
export default r
