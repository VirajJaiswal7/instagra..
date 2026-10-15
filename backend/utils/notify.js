import Notification from '../models/Notification.js'
export const notify = async (recipient, sender, type, post) => {
  if (String(recipient) === String(sender)) return
  await Notification.create({ recipient, sender, type, post })
}
