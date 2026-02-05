const Notification = require('./notification.model');

module.exports = (io) => {
    // 1. Thiết lập Change Stream để tự động phát hiện notification mới
    const changeStream = Notification.watch();

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            const newNotification = change.fullDocument;

            // Gửi realtime đến đúng user (dùng room là userId)
            io.to(newNotification.userId.toString()).emit('newNotification', newNotification);

            console.log(`Realtime: New notification sent to user ${newNotification.userId}`);
        }
    });

    // 2. Xử lý khi client kết nối
    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        // Client gửi userId để join room riêng
        socket.on('joinNotifications', (userId) => {
            if (userId) {
                socket.join(userId.toString());
                console.log(`User ${userId} joined notification room`);
            }
        });

        // Có thể thêm các event khác nếu cần sau này
        // ví dụ: socket.on('markAsRead', ...)

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    // Trả về io để có thể dùng ở nơi khác nếu cần emit manual
    return io;
};