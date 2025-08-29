import Roles from '../../models/Role/roleModel.js'

const getRoles = async (req, res) => {

    const userRole = await Roles.find()

    if (userRole.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        });
    }

    return res.status(200).json({
        success: true,
        data: userRole
    });
};

const getRole = async (req, res) => {

    const userRole = await Roles.find()

    if (userRole.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        });
    }

    return res.status(200).json({
        success: true,
        data: userRole
    });
};


export {
    getRoles,
    getRole
}