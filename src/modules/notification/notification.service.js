const Notification = require('./notification.model');

exports.getNotificationsByUser = async (userId, limit = 5, page = 1) => {
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    const total = await Notification.countDocuments({ userId });

    return {
        notifications,
        total,
        page: Number(page),
        limit: Number(limit),
        hasMore: skip + notifications.length < total,
    };
}

exports.markAsRead = async (notificationId) => {
    return await Notification.findByIdAndUpdate(
        notificationId,
        { isRead: true },
        { new: true }
    );
}

exports.markAllAsRead = async (userId) => {
    return await Notification.updateMany(
        { userId, isRead: false },
        { isRead: true }
    );
}

