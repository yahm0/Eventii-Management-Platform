const Notification = require('../models/Notification');
const User = require('../../users/models/User');

const notificationResolvers = {
    Query: {
        notifications: async (_, __, { user }) => {
            if (!user) throw new Error('Not authenticated');
            return await Notification.find({ recipient: user.id });
        },
        notification: async (_, { id }, { user }) => {
            if (!user) throw new Error('Not authenticated');
            const notification = await Notification.findById(id);
            if (notification.recipient.toString() !== user.id) {
                throw new Error('Not authorized to view this notification');
            }
            return notification;
        },
    },
    Mutation: {
        createNotification: async (_, { notificationInput }, { user }) => {
            if (!user) throw new Error('Not authenticated');
            const recipient = await User.findById(notificationInput.recipientId);
            if (!recipient) throw new Error('Recipient not found');
            const notification = new Notification({
                message: notificationInput.message,
                recipient: recipient.id,
                read: false,
            });
            await notification.save();
            return await notification.populate('recipient');
        },
        markNotificationAsRead: async (_, { id }, { user }) => {
            if (!user) throw new Error('Not authenticated');
            const notification = await Notification.findById(id);
            if (notification.recipient.toString() !== user.id) {
                throw new Error('Not authorized to modify this notification');
            }
            notification.read = true;
            await notification.save();
            return notification;
        },
        // Add additional notification-related mutations here
    },
    Notification: {
        recipient: async (parent) => {
            return await User.findById(parent.recipient);
        },
    },
};

module.exports = notificationResolvers;
