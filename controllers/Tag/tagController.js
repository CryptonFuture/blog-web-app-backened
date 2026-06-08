import Tag from '../../models/Tag/tagModel.js'

const addTag = async (req, res) => {
    const { tagName, description } = req.body

    if (!tagName) {
        return res.status(400).json({
            success: false,
            error: 'name field is required'
        })
    }

    const tag = new Tag({
        tagName,
        description
    })

    const tagData = await tag.save()

    if (tagData) {
        return res.status(200).json({
            success: true,
            message: "tag create successfully",
            data: tagData
        })
    } else {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const getTag = async (req, res) => {
    const { page = 1, limit = 10, search = "", sort = "", status, date  } = req.query;

    const pageNumber = parseInt(page, 10)
    const limitNumber = parseInt(limit, 10)

   let searchQuery = {};

    if (search) {
        searchQuery.$or = [
            { tagName: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    if (status) {
        searchQuery.status = status === 'true';
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

    const tag = await Tag.find(searchQuery)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber)

    const totalRecords = await Tag.countDocuments(searchQuery)

    if (!tag.length > 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
    }

    return res.status(200).json({
        success: true,
        data: tag,
        pagination: {
            totalRecords,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalRecords / limitNumber),
            limit: limitNumber
        }
    })
}

// hard deleted
const deleteTag = async (req, res) => {
    const { id } = req.params

    const tag = await Tag.findByIdAndDelete({ _id: id })

    if (!tag) {
        return res.status(404).json({
            success: false,
            error: "No tag Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete Tag Successfully'
        })
    }
}

// soft deleted
const deleteTags = async (req, res) => {
    const { id } = req.params

    const tag = await Tag.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!tag) {
        return res.status(404).json({
            success: false,
            error: "No tag Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete Tag Successfully'
        })
    }
}

const countTag = async (req, res) => {
    const { search = "", status, date } = req.query

    let searchQuery = {};

    if (search) {
        searchQuery.$or = [
            { tagName: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    if (status) {
        searchQuery.status = status === 'true';
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

    const countTag = await Tag.countDocuments(searchQuery)
    return res.status(200).json({
        success: true,
        count: countTag
    })
}

const editTagById = async (req, res) => {
    const { id } = req.params
    const tag = await Tag.find({ _id: id })

    if (!tag) {
        return res.status(404).json({
            success: false,
            error: "No tag Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: tag
    })
}

const viewTagById = async (req, res) => {
    const { id } = req.params
    const tag = await Tag.find({ _id: id })

    if (!tag) {
        return res.status(404).json({
            success: false,
            error: "No tag Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: tag
    })
}

const updateTag = async (req, res) => {
      const { id } = req.params

        const { tagName, description, status } = req.body;

        if (!tagName) {
            return res.status(400).json({
                success: false,
                error: 'name field is required',
            });
        }

        const updatedTag = await Tag.findByIdAndUpdate(
            { _id: id },
            { tagName, description, status },
            { new: true }
        );

        if (!updatedTag) {
            return res.status(404).json({
                success: false,
                error: 'no record found',
            });
        }


        return res.status(200).json({
            success: true,
            message: "Tag updated successfully",
            data: updatedTag,
        });
}

const deleteMultipleTags = async (req, res) => {
    try {
        const ids = req.query.ids?.split(',') || []

        if(ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No tag IDs provided'
            });
        }

        if (ids.length < 2) {
            return res.status(400).json({
                success: false,
                error: 'Please select at least two tags to delete.'
            });
        }

        const result = await Tag.deleteMany({_id: {$in: ids}})

        return res.status(200).json({
            success: true,
            message: `${result.deletedCount} tag(s) deleted successfully`
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}


export {
    addTag,
    getTag,
    deleteTag,
    deleteTags,
    editTagById,
    updateTag,
    countTag,
    viewTagById,
    deleteMultipleTags
}