import UserRole from '../../models/Role/userRoleModel.js'
import Roles from '../../models/Role/roleModel.js'


const assignRole = async (req, res) => {
  try {
    const { selectedUsers, selectedRoles } = req.body;

    if (!selectedUsers || !selectedRoles) {
      return res.status(400).json({ message: "Users and roles are required" });
    }

    await UserRole.deleteMany({ userId: { $in: selectedUsers } });

    const mappings = [];

    selectedUsers.forEach(userId => {
      selectedRoles.forEach(roleId => {
        mappings.push({ userId, roleId });
      });
    });

    await UserRole.insertMany(mappings);

    res.json({
      message: "Roles assigned successfully",
      totalAssigned: mappings.length
    });

  } catch (err) {
    console.log(err, 'err');
    
    res.status(500).json({ message: err.message });
  }
}

const assignNewRole = async (req, res) => {
    const { name, role, description } = req.body

    const assignNewRole = new Roles({
        name,
        role,
        description
    })

    const assignData = await assignNewRole.save()

    if (assignData) {
        return res.status(200).json({
            success: true,
            message: "assign new role create successfully",
            data: assignData
        })
    } else {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}


const getUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.find()
      .populate('userId', 'firstname lastname') 
      .populate('roleId', 'name role description') 
      .sort({ createdAt: -1 }); 

    const formattedData = userRoles.map(item => ({
      _id: item._id,
      userId: item.userId?._id,
      userName: `${item.userId?.firstname || ''} ${item.userId?.lastname || ''}`.trim(),
      roleId: item.roleId?._id,
      roleName: item.roleId?.name,
      roleValue: item.roleId?.role,
      Description: item.roleId?.description,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    res.json({ data: formattedData });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export {
    assignRole,
    getUserRoles,
    assignNewRole
}

