import Permission from '../../models/Permission/permissionModel.js'
import OnBoardingUser from '../../models/User/User.js';
import OnBoarding from '../../models/OnBoarding/OnBoarding.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AddPermission = async (req, res) => {
    const { routeName, paramName, role, action, description } = req.body

    try {

        const existingPermission = await Permission.findOne({
            routeName
        });

        if (existingPermission) {
            return res.status(409).json({
                success: false,
                error: "Permission already exists. Cannot create a duplicate.",
            });
        }

    const permission = new Permission({
        routeName, 
        paramName, 
        role, 
        action,
        description
    })

    const permissionDate = await permission.save()

    if (permissionDate) {
        return res.status(200).json({
            success: true,
            message: "permission create successfully",
            data: permissionDate
        })
    }
    } catch (error) {
        console.log(error, 'error');
        
         return res.status(500).json({
            success: false,
            error: "Internal server error",
        })

        
    }

     
}

const getPermission = async (req, res) => {
      
    try {
        const permission = await Permission.find()

        if (!permission || permission.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: permission,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const editPermissionById = async (req, res) => {
    const { id } = req.params
    const permission = await Permission.find({ _id: id })

    if (!permission) {
        return res.status(404).json({
            success: false,
            error: "No permission Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: permission
    })
}

const viewPermissionById = async (req, res) => {
    const { id } = req.params
    const permission = await Permission.find({ _id: id })

    if (!permission) {
        return res.status(404).json({
            success: false,
            error: "No permission Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: permission
    })
}

// hard deleted
const deletePermission = async (req, res) => {
  const { id } = req.params;
  
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing user ID',
      });
    }

    const permission = await Permission.findById(id);

    if (!permission) {
      return res.status(404).json({
        success: false,
        error: 'No permission found with this ID',
      });
    }

    await Permission.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Deleted Permission successfully',
    });

  

};

// soft deleted
const deletePermissions = async (req, res) => {
    const { id } = req.params

    const permission = await Permission.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!permission) {
        return res.status(404).json({
            success: false,
            error: "No permission Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete Permission Successfully'
        })
    }
}

const updatePermission = async (req, res) => {
    const { id } = req.params
      const { routeName, paramName, role, action, description } = req.body

        const updatePermission = await Permission.findByIdAndUpdate(
            id,
            { routeName, paramName, role, action, description },
            {new: true}
        )

      if (!updatePermission) {
            return res.status(404).json({
                success: false,
                error: 'no record found',
            });
        }


        return res.status(200).json({
            success: true,
            message: "Permission updated successfully",
            data: updatePermission,
        });

}

const permissionCount = async (req, res)  => {
    
    const permcount = await Permission.countDocuments()

    return res.status(200).json({
        success: true,
        count: permcount
    })
}

const createOnBoarding = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { user, permissions } = req.body;

     if (!user?.password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (!user?.confirmPassword) {
      return res.status(400).json({ error: "Confirm Password is required" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const hashedConfirmPassword = await bcrypt.hash(user.confirmPassword, 10);

    const createdUser = await OnBoardingUser.create([{
      ...user,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword
    }], { session });

    const permissionDocs = permissions.map(p => ({
      ...p,
      userId: createdUser[0]._id
    }));

    await OnBoarding.insertMany(permissionDocs, { session });

    await session.commitTransaction();

    res.status(201).json({
      message: 'User & permissions created successfully',
      userId: createdUser[0]._id
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ error: error.message });
    
  } finally {
    session.endSession();
  }
}

const createOnBoardings = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { user } = req.body;
    const { role } = user;

    if (!user?.password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (!user?.confirmPassword) {
      return res.status(400).json({ error: "Confirm Password is required" });
    }

    if (!ROLE_PERMISSIONS[role]) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const hashedConfirmPassword = await bcrypt.hash(user.confirmPassword, 10);

    const createdUser = await OnBoardingUser.create(
      [{
        ...user,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword
      }],
      { session }
    );

    const permissionDocs = ROLE_PERMISSIONS[role].map(p => ({
      ...p,
      role,
      userId: createdUser[0]._id
    }));

    await OnBoarding.insertMany(permissionDocs, { session });

    await session.commitTransaction();

    res.status(201).json({
      message: "User & role based permissions created successfully",
      userId: createdUser[0]._id,
      role
    });

  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ error: error.message });
  } finally {
    session.endSession();
  }
};


const getOnBoardingUser = async (req, res) => {
      
    try {
        const onBoardingUser = await OnBoardingUser.find()

        if (!onBoardingUser || onBoardingUser.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: onBoardingUser,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}



// /create-with-permissions
export {
    getPermission,
    AddPermission,
    editPermissionById,
    viewPermissionById,
    deletePermission,
    deletePermissions,
    updatePermission,
    permissionCount,
    createOnBoarding,
    getOnBoardingUser,
    createOnBoardings
}