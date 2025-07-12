import Post from '../../models/Post/postModel.js'

const addPost = async (req, res) => {
    const { title, description } = req.body

    if (!title) {
        return res.status(400).json({
            success: false,
            error: 'title field is required'
        })
    }

    const post = new Post({
        title,
        description
    })

    const postData = await post.save()

    if (postData) {
        return res.status(200).json({
            success: true,
            message: "post create successfully",
            data: postData
        })
    } else {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })
    }
}

const getPost = async (req, res) => {
    const { page = 1, limit = 10, search = "", sort = "", status, date  } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    let searchQuery = {};

    if (search) {
        searchQuery.$or = [
            { title: { $regex: search, $options: "i" } },
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

    const skip = (pageNumber - 1) * limitNumber;

    let sortOptions = {};
    if (sort) {
        const [field, order] = sort.split(":");
        sortOptions[field] = order === "desc" ? -1 : 1;
    }

    const post = await Post.find(searchQuery)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber);

    const totalRecords = await Post.countDocuments(searchQuery);

    if (post.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        });
    }

    return res.status(200).json({
        success: true,
        data: post,
        pagination: {
            totalRecords,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalRecords / limitNumber),
            limit: limitNumber
        }
    });
};


// hard deleted
const deletePost = async (req, res) => {
    const { id } = req.params

    const post = await Post.findByIdAndDelete({ _id: id })

    if (!post) {
        return res.status(404).json({
            success: false,
            error: "No post Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete Post Successfully'
        })
    }
}

// soft deleted
const deletePosts = async (req, res) => {
    const { id } = req.params

    const post = await Post.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!post) {
        return res.status(404).json({
            success: false,
            error: "No post Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete Post Successfully'
        })
    }
}

const countPost = async (req, res) => {
    const { search = "" } = req.query

    const searchQuery = search
        ? { $or: [{ title: { $regex: search, $options: "i" } }] }
        : {};

    const countPost = await Post.countDocuments(searchQuery)
    return res.status(200).json({
        success: true,
        count: countPost
    })
}

const editPostById = async (req, res) => {
    const { id } = req.params
    const post = await Post.find({ _id: id })

    if (!post) {
        return res.status(404).json({
            success: false,
            error: "No post Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: post
    })
}

const viewPostById = async (req, res) => {
    const { id } = req.params
    const post = await Post.find({ _id: id })

    if (!post) {
        return res.status(404).json({
            success: false,
            error: "No post Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: post
    })
}

const updatePost = async (req, res) => {
      const { id } = req.params

        const { title, description, status } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                error: 'title field is required',
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            { _id: id },
            { title, description, status },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                error: 'no record found',
            });
        }


        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost,
        });
}

export {
    addPost,
    getPost,
    deletePost,
    deletePosts,
    editPostById,
    updatePost,
    countPost,
    viewPostById
}