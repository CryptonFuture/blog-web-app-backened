import Page from '../../models/Pages/pageModel.js'

const addPages = async (req, res) => {
    const { pageName, description } = req.body

    if (!pageName) {
        return res.status(400).json({
            success: false,
            error: 'name field is required'
        })
    }

    const page = new Page({
        pageName,
        description
    })

    const pageData = await page.save()

    if (pageData) {
        return res.status(200).json({
            success: true,
            message: "page create successfully",
            data: pageData
        })
    } else {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const getPages = async (req, res) => {
    const { page = 1, limit = 10, search = "", sort = "", status, date  } = req.query;

    const pageNumber = parseInt(page, 10)
    const limitNumber = parseInt(limit, 10)

     let searchQuery = {};

    if (search) {
        searchQuery.$or = [
            { pageName: { $regex: search, $options: "i" } },
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

    const pages = await Page.find(searchQuery)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber)

    const totalRecords = await Page.countDocuments(searchQuery)

    if (!pages.length > 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        })
    }

    return res.status(200).json({
        success: true,
        data: pages,
        pagination: {
            totalRecords,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalRecords / limitNumber),
            limit: limitNumber
        }
    })
}

// hard deleted
const deletePage = async (req, res) => {
    const { id } = req.params

    const page = await Page.findByIdAndDelete({ _id: id })

    if (!page) {
        return res.status(404).json({
            success: false,
            error: "No page Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete Page Successfully'
        })
    }
}

// soft deleted
const deletePages = async (req, res) => {
    const { id } = req.params

    const page = await Page.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!page) {
        return res.status(404).json({
            success: false,
            error: "No page Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete Page Successfully'
        })
    }
}

const countPages = async (req, res) => {
    const { search = "", status, date } = req.query

     let searchQuery = {};

    if (search) {
        searchQuery.$or = [
            { pageName: { $regex: search, $options: "i" } },
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

    const countPages = await Page.countDocuments(searchQuery)
    return res.status(200).json({
        success: true,
        count: countPages
    })
}

const editPageById = async (req, res) => {
    const { id } = req.params
    const page = await Page.find({ _id: id })

    if (!page) {
        return res.status(404).json({
            success: false,
            error: "No page Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: page
    })
}

const viewPagesById = async (req, res) => {
    const { id } = req.params
    const page = await Page.find({ _id: id })

    if (!page) {
        return res.status(404).json({
            success: false,
            error: "No page Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: page
    })
}

const updatePages = async (req, res) => {
      const { id } = req.params

        const { pageName, description, status } = req.body;

        if (!pageName) {
            return res.status(400).json({
                success: false,
                error: 'name field is required',
            });
        }

        const updatedPage = await Page.findByIdAndUpdate(
            { _id: id },
            { pageName, description, status },
            { new: true }
        );

        if (!updatedPage) {
            return res.status(404).json({
                success: false,
                error: 'no record found',
            });
        }


        return res.status(200).json({
            success: true,
            message: "Pages updated successfully",
            data: updatedPage,
        });
}

const deleteMultiplePages = async (req, res) => {
    try {
        const ids = req.query.ids?.split(',') || []

        if(ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No page IDs provided'
            });
        }

        if (ids.length < 2) {
            return res.status(400).json({
                success: false,
                error: 'Please select at least two pages to delete.'
            });
        }

        const result = await Page.deleteMany({_id: {$in: ids}})

        return res.status(200).json({
            success: true,
            message: `${result.deletedCount} page(s) deleted successfully`
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
    addPages,
    getPages,
    deletePage,
    deletePages,
    editPageById,
    updatePages,
    countPages,
    viewPagesById,
    deleteMultiplePages
}