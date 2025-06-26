import Post from '../../models/Post/postModel.js'
import Tag from '../../models/Tag/tagModel.js'
import Pages from '../../models/Pages/pageModel.js'
import User from '../../models/Auth/authModel.js'

const countAll = async (req, res) => {
    const [postCount, tagCount, pagesCount, userCount] = await Promise.all([
        Post.countDocuments(),
        Tag.countDocuments(),
        Pages.countDocuments(),
        User.countDocuments()
    ])

    return res.status(200).json({
        success: true,
        count: {
           post: {
            title: 'No. Of Post',
            total: postCount,
            bgcolor: '#f75815',
            textColor: 'white',
            borderColor: 'black'
           },

            tag: {
            title: 'No. Of Tag',    
            total: tagCount,
            bgcolor: 'white',
            textColor: 'black',
            borderColor: '#f75815'
           },

            pages: {
            title: 'No. Of Pages',
            total: pagesCount,
            bgcolor: '#f75815',
            textColor: 'white',
            borderColor: 'black'
           },

            user: {
            title: 'No. Of User',
            total: userCount,
            bgcolor: 'white',
            textColor: 'black',
            borderColor: '#f75815'
           },
        }
    })
}

export {
    countAll
}