import Permission from '../../models/Permission/permissionModel.js'

const AddPermission = async (req, res) => {
    const { routeName, paramName, role, action, description } = req.body

    try {
     
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

    
        if(!routeName || !paramName || !role) {
            return res.status(400).json({
                    success: false,
                    error: 'please fill out all fields',
                });
        }

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


export {
    getPermission,
    AddPermission,
    editPermissionById,
    viewPermissionById,
    deletePermission,
    deletePermissions,
    updatePermission,
    permissionCount
}