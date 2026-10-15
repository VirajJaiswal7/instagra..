import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as c from '../controllers/notificationController.js'
const r = Router()
r.use(protect)
r.get('/', c.list); r.patch('/read-all', c.readAll)
export default r
