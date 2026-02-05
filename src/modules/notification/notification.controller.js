const NotificationService = require('./notification.service');

exports.getUserNotifications = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const userId = req.user.id;

        const notifications = await NotificationService.getNotificationsByUser(userId, limit, page);

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const updatedNotification = await NotificationService.markAsRead(notificationId);

        res.json(updatedNotification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.markAllNotificationsAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        await NotificationService.markAllAsRead(userId);

        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
