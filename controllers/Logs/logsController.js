import UserLogs from '../../models/Logs/LogsModel.js'

const getLogs = async (req, res) => {
    const { page = 1, limit = 10, sort = "", date, loginTime, logoutTime  } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    let searchQuery = {};

      if (date) {
        const selectedDate = new Date(date);
        const nextDate = new Date(date);
        nextDate.setDate(selectedDate.getDate() + 1);

        searchQuery.createdAt = {
            $gte: selectedDate,
            $lt: nextDate
        };
    }

    if (loginTime) {
        const loginDate = new Date(loginTime);
        searchQuery.login_time = { $gte: loginDate };
    }

    if (logoutTime) {
        const logoutDate = new Date(logoutTime);
        searchQuery.logout_time = { $lte: logoutDate };
    }

    const skip = (pageNumber - 1) * limitNumber;

    let sortOptions = {};
    if (sort) {
        const [field, order] = sort.split(":");
        sortOptions[field] = order === "desc" ? -1 : 1;
    }

    const user = await UserLogs.find(searchQuery)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber)
        .populate('user_id')

    const totalRecords = await UserLogs.countDocuments(searchQuery);

    if (user.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        });
    }

    return res.status(200).json({
        success: true,
        data: user,
        pagination: {
            totalRecords,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalRecords / limitNumber),
            limit: limitNumber
        }
    });
};

const countLogs = async (req, res) => {
    const { date, loginTime, logoutTime } = req.query

     if (date) {
        const selectedDate = new Date(date);
        const nextDate = new Date(date);
        nextDate.setDate(selectedDate.getDate() + 1);

        searchQuery.createdAt = {
            $gte: selectedDate,
            $lt: nextDate
        };
    }

    if (loginTime) {
        const loginDate = new Date(loginTime);
        searchQuery.login_time = { $gte: loginDate };
    }

    if (logoutTime) {
        const logoutDate = new Date(logoutTime);
        searchQuery.logout_time = { $lte: logoutDate };
    }

    const countLogs = await UserLogs.countDocuments()
    
    return res.status(200).json({
        success: true,
        count: countLogs
    })
}


export {
    getLogs,
    countLogs
}