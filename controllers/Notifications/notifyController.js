import Notification from '../../models/Notifications/notifyModule.js'


const createNotification = async (req, res) => {
    const { userId, title, message, type } = req.body

    const notification = new Notification({
        userId,
        title,
        message,
        type
    })

    const io = req.app.get('io')
    io.to(userId.toString()).emit('newNotification', notifyData)

    const notifyData = await notification.save()

    if (notifyData) {
        return res.status(201).json({
            success: true,
            mesasge: 'notification successfully created',
            data: notification
        })
    } else {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })
    } 
}

const getNotifyById = async (req, res) => {
    const { userId } = req.params
    

    const notification = await Notification.find({userId})
    .sort({createdAt: -1})
    
     if (!notification) {
        return res.status(404).json({
            success: false,
            error: "No Notify Id found"
        })
    }

    return res.status(201).json({
        success: true,
        data: notification
    })

}

const getNotify = async (req, res) => {
    const notify = await Notification.find()

     if (notify.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        });
    }

    return res.status(200).json({
        success: true,
        data: notify,
    });
}

const markAsRead = async (req, res) => {
    const { id } = req.params

    const notification = await Notification.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true }
    )

     const io = req.app.get('io')
    io.to(notification.userId.toString()).emit('notificationRead', {
      id: notification._id
    })

    return res.status(201).json({
        success: true,
        mesasge: 'notification successfully updated',
        data: notification
    })

}

const deleteNotification = async (req, res) => {
    const { id } = req.params

    const notification = await Notification.findByIdAndDelete(id)

    if (!notification) {
        return res.status(404).json({
            success: false,
            error: "Notification not found"
        })
    }

    const io = req.app.get('io')
    io.to(notification.userId.toString()).emit('notificationDeleted', {
        id: notification._id
    })


    return res.status(201).json({
        success: true,
        mesasge: 'notification successfully deleted',
    })

}

export {
  createNotification,
  getNotifyById,
  markAsRead,
  deleteNotification,
  getNotify
}