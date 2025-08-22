import User from '../../models/Auth/authModel.js'
import Post from '../../models/Post/postModel.js'

import validator from 'validator'
import bcrypt from 'bcryptjs'

const getUser = async (req, res) => {
    const { page = 1, limit = 10, search = "", sort = "", active, date  } = req.query;

    const pageNumber = parseInt(page, 10)
    const limitNumber = parseInt(limit, 10)

    let searchQuery = {};

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

const countUser = async (req, res) => {
    const { search = "", active, date } = req.query

     let searchQuery = {};

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
            error: "No user Id found"
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
            error: "No user Id found"
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

const updateUser = async (req, res) => {
    const { id } = req.params

    const { firstname, lastname, email, active, is_admin } = req.body;

    if (!firstname || !lastname || !email) {
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
            is_admin
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

        const result = await User.deleteMany({_id: {$in: ids}})

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
    getUser,
    deleteMultipleUsers,
    deleteUser,
    deleteUsers,
    editUserById,
    updateUser,
    countUser,
    viewUserById,
    viewProfileById,
    editProfileById,
    updateUserProfile,
    deleteUserProfile
}