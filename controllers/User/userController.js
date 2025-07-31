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

export {
    getUser,
    deleteUser,
    deleteUsers,
    editUserById,
    updateUser,
    countUser,
    viewUserById
}