const createNotification = (userId, templateName, data = {}) => {
    const base = {
        userId,
        title: '',
        message: '',
        link: '',
        isRead: false,
    }

    const templates = {

        projectLiked: {
            title: 'Có lượt thích mới!',
            message: `${data.senderName || 'Ai đó'} đã thích project "${data.projectTitle}" của bạn`,
            link: `/project-details/${data.projectId || ''}`,
        },

        newComment: {
            title: 'Bình luận mới!',
            message: `${data.senderName || 'Ai đó'} đã bình luận về project "${data.projectTitle}" của bạn`,
            link: `/project-details/${data.projectId || ''}`,
        },

        projectStatusUpdated: {
            title: data.status === 'approved' ? 'Project đã được duyệt!' : 'Project cần chỉnh sửa',
            message:
                data.status === 'approved'
                    ? `Project "${data.projectTitle}" của bạn đã được duyệt.`
                    : `Project "${data.projectTitle}" bị từ chối. Lý do: ${data.reason || 'không rõ'}`,
            link: `/project/${data.projectId}`,
        },

        createNewProject: {
            title: 'Tạo project thành công!',
            message: `Project "${data.projectTitle}" của bạn đã được tạo thành công và đang chờ duyệt.`,
            link: `/project-manager`,
        }
    }

    const template = templates[templateName];

    if (!template) {
        throw new Error(`Notification template "${templateName}" not found.`);
    }

    return {
        ...base,
        ...template
    };
}

module.exports = {
    createNotification,
};