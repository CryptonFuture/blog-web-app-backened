import Post from '../../models/Post/postModel.js'
import Tag from '../../models/Tag/tagModel.js'
import Pages from '../../models/Pages/pageModel.js'
import User from '../../models/Auth/authModel.js'
import Dashboard from '../../models/Dashboard/dashboardModel.js'

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
            bgcolor2: '#465367',
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
            bgcolor2: '#465367',
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

const getSideBarRoutes = async (req, res) => {
  try {
    const siderBarRoutes = await Dashboard.find();

    const descendingOrder = ['Dashboard', 'Post', 'Tag', 'Pages', 'Category', 'User', 'Settings', 'Profile'];

    const sortingRoutes = descendingOrder.map(routeName => {
      const item = siderBarRoutes.find(route => route.routeName === routeName);

      if (!item) return null; 

      return {
        routeName: item.routeName,
        status: item.status,
        is_deleted: item.is_deleted,
        paramName: item.paramName,
        iconName: item.iconName
      };
    });

    return res.status(200).json({
      success: true,
      data: sortingRoutes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
};

 
export {
    countAll,
    getSideBarRoutes
}