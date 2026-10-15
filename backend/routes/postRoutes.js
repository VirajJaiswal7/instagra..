import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { upload } from '../utils/upload.js'
import * as c from '../controllers/postController.js'
import * as cm from '../controllers/commentController.js'
const r = Router()
r.use(protect)
r.get('/feed', c.feed); r.get('/explore', c.explore)
r.post('/', upload.single('image'), c.create)
r.get('/:id', c.getOne); r.delete('/:id', c.remove)
r.post('/:id/like', c.like); r.post('/:id/unlike', c.unlike)
r.post('/:id/save', c.save); r.post('/:id/unsave', c.unsave)
r.route('/:id/comments').get(cm.list).post(cm.add)
export default r
