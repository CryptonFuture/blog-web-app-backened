import User from '../../models/Auth/authModel.js'
import Post from '../../models/Post/postModel.js'

import validator from 'validator'
import bcrypt from 'bcryptjs'

const getActiveUser = async (req, res) => {
    const { page = 1, limit = 10, search = "", sort = "", active, date  } = req.query;

    const pageNumber = parseInt(page, 10)
    const limitNumber = parseInt(limit, 10)

    let searchQuery = {active: true};

    if (search) {
        searchQuery.$expr = {
            $regexMatch: {
            input: { $concat: ["$firstname", " ", "$lastname"] },
            regex: search,
            options: "i"
            }
        };
    }

    if (active) {
        searchQuery.active = active === 'true';
    }

    if (date) {
        const selectedDate = new Date(date);
        const nextDate = new Date(date);
        nextDate.setDate(selectedDate.getDate() + 1);

        searchQuery.createdAt = {
            $gte: selectedDate,
            $lt: nextDate
        };
    }

    const skip = (pageNumber - 1) * limitNumber

    let sortOptions = {};
    if (sort) {
        const [field, order] = sort.split(":");
        sortOptions[field] = order === "desc" ? -1 : 1;
    }

    const user = await User.find(searchQuery)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber)

    const totalRecords = await User.countDocuments(searchQuery)

    if (!user.length > 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
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
    })
}

const getInActiveUser = async (req, res) => {
    const { page = 1, limit = 10, search = "", sort = "", active, date  } = req.query;

    const pageNumber = parseInt(page, 10)
    const limitNumber = parseInt(limit, 10)

    let searchQuery = {active: false};

    if (search) {
        searchQuery.$expr = {
            $regexMatch: {
            input: { $concat: ["$firstname", " ", "$lastname"] },
            regex: search,
            options: "i"
            }
        };
    }

    if (active) {
        searchQuery.active = active === 'true';
    }

    if (date) {
        const selectedDate = new Date(date);
        const nextDate = new Date(date);
        nextDate.setDate(selectedDate.getDate() + 1);

        searchQuery.createdAt = {
            $gte: selectedDate,
            $lt: nextDate
        };
    }

    const skip = (pageNumber - 1) * limitNumber

    let sortOptions = {};
    if (sort) {
        const [field, order] = sort.split(":");
        sortOptions[field] = order === "desc" ? -1 : 1;
    }

    const user = await User.find(searchQuery)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber)

    const totalRecords = await User.countDocuments(searchQuery)

    if (!user.length > 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
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
    })
}

const getInActive = async (req, res) => {
  
    const user = await User.find({active: false})

    if (!user.length > 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
    }

    return res.status(200).json({
        success: true,
        data: user,
    })
}


// hard deleted
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found with this ID",
      });
    }

    if (user.status === true || user.active === true) {
      return res.status(400).json({
        success: false,
        error: "Active users cannot be deleted",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Deleted user successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};


// soft deleted
const deleteUsers = async (req, res) => {
    const { id } = req.params

    const user = await User.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!user) {
        return res.status(404).json({
            success: false,
            error: "No user Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete User Successfully'
        })
    }
}

const countActiveUser = async (req, res) => {
    const { search = "", active, date } = req.query

     let searchQuery = {active: true};

    if (search) {
        searchQuery.$expr = {
            $regexMatch: {
            input: { $concat: ["$firstname", " ", "$lastname"] },
            regex: search,
            options: "i"
            }
        };
    }

    if (active) {
        searchQuery.active = active === 'true';
    }

    if (date) {
        const selectedDate = new Date(date);
        const nextDate = new Date(date);
        nextDate.setDate(selectedDate.getDate() + 1);

        searchQuery.createdAt = {
            $gte: selectedDate,
            $lt: nextDate
        };
    }

    const countUser = await User.countDocuments(searchQuery)
    return res.status(200).json({
        success: true,
        count: countUser
    })
}

const countInActiveUser = async (req, res) => {
    const { search = "", active, date } = req.query

     let searchQuery = {active: false};

    if (search) {
        searchQuery.$expr = {
            $regexMatch: {
            input: { $concat: ["$firstname", " ", "$lastname"] },
            regex: search,
            options: "i"
            }
        };
    }

    if (active) {
        searchQuery.active = active === 'true';
    }

    if (date) {
        const selectedDate = new Date(date);
        const nextDate = new Date(date);
        nextDate.setDate(selectedDate.getDate() + 1);

        searchQuery.createdAt = {
            $gte: selectedDate,
            $lt: nextDate
        };
    }

    const countUser = await User.countDocuments(searchQuery)
    return res.status(200).json({
        success: true,
        count: countUser
    })
}

const editUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.find({ _id: id })

    if (!user) {
        return res.status(404).json({
            success: false,
            error: "No user Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: user
    })
}

const viewProfileById = async (req, res) => {
    const { id } = req.params
    const userProfile = await User.find({ _id: id })

    if (!userProfile) {
        return res.status(404).json({
            success: false,
            error: "No user profile Id found"
        })
    }

    if (!userProfile.length > 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
    }

    return res.status(200).json({
        success: true,
        data: userProfile
    })
}

const editProfileById = async (req, res) => {
    const { id } = req.params
    const editProfile = await User.find({ _id: id })

    if (!editProfile) {
        return res.status(404).json({
            success: false,
            error: "No user profile Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: editProfile
    })
}

const viewUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.find({ _id: id })

    if (!user) {
        return res.status(404).json({
            success: false,
            error: "No user Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: user
    })
}

const changePassword = async (req, res) => {
     try {
    const { oldPassword, newPassword, confirmPass } = req.body;
    const userId = req.params.id;

    if (!oldPassword || !newPassword || !confirmPass) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, error: "Old password is incorrect" });

    if (newPassword !== confirmPass) {
      return res.status(400).json({ success: false, error: "New password and confirm password do not match" });
    }

     if (newPassword.length < 10 || confirmPass.length < 10) {
        return res.status(400).json({
            success: false,
            error: 'Password must be at least 10 characters long'
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const hashedConfirmPassword = await bcrypt.hash(confirmPass, salt);

    user.password = hashedPassword;
    user.confirmPass = hashedConfirmPassword
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({   success: false, error: "Server error" });
  }
}

const updateUser = async (req, res) => {
    const { id } = req.params

    const { firstname, lastname, email, active, is_admin, role } = req.body;

    if (!firstname || !lastname || !email || !role) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields',
        });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid Email'
        })
    }


    const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        {
            firstname,
            lastname,
            email,
            active,
            is_admin,
            role
        },
        { new: true }
    );

    if (!updatedUser) {
        return res.status(404).json({
            success: false,
            error: 'no record found',
        });
    }


    return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
    });
}

const updateUserProfile = async (req, res) => {
    const { id } = req.params

    const { phone, address } = req.body;

    const updatedUserProfile = await User.findByIdAndUpdate(
        { _id: id },
        {
           phone,
           address
        },
        { new: true }
    );

    if (!updatedUserProfile) {
        return res.status(404).json({
            success: false,
            error: 'no record found',
        });
    }

    return res.status(200).json({
        success: true,
        message: "User Profile updated successfully",
        data: updatedUserProfile,
    });
}

const deleteMultipleUsers = async (req, res) => {
    try {
        const ids = req.query.ids?.split(',') || []

        if(ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No user IDs provided'
            });
        }

        if (ids.length < 2) {
            return res.status(400).json({
                success: false,
                error: 'Please select at least two users to delete.'
            });
        }
        

        const result = await User.deleteMany({
            _id: {$in: ids},
            active: false
        })

          if (result.deletedCount === 0) {
            return res.status(400).json({
                success: false,
                message: "No inactive users found to delete"
            });
        }

        return res.status(200).json({
            success: true,
            message: `${result.deletedCount} user(s) deleted successfully`
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const deleteUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user profile found with this ID",
      });
    }


    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Deleted User Profile successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

export {
    getActiveUser,
    getInActiveUser,
    getInActive,
    deleteMultipleUsers,
    deleteUser,
    deleteUsers,
    editUserById,
    updateUser,
    countActiveUser,
    countInActiveUser,
    viewUserById,
    viewProfileById,
    editProfileById,
    updateUserProfile,
    deleteUserProfile,
    changePassword
}