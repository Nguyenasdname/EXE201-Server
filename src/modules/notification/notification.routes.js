const router = require('express').Router();
const NotificationController = require('./notification.controller');
const { tokenProvider } = require('../../middlewares/authMiddleware');

router.use(tokenProvider);

router.get('/', NotificationController.getUserNotifications);
router.post('/:notificationId/read', NotificationController.markNotificationAsRead);
router.post('/read-all', NotificationController.markAllNotificationsAsRead);

module.exports = router;