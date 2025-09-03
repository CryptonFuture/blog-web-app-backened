import Post from '../../models/Post/postModel.js'
import Tag from '../../models/Tag/tagModel.js'
import Pages from '../../models/Pages/pageModel.js'
import User from '../../models/Auth/authModel.js'
import Dashboard from '../../models/Dashboard/dashboardModel.js'
import Request from '../../models/Request/requestModel.js'
import UserLogs from '../../models/Logs/LogsModel.js'
import Permission from '../../models/Permission/permissionModel.js'
import Category from '../../models/Category/categoryModel.js'

const countAll = async (req, res) => {
    const [postCount, tagCount, pagesCount, userCount, logsCount, requestCount, permRequest, categoryCount] = await Promise.all([
        Post.countDocuments(),
        Tag.countDocuments(),
        Pages.countDocuments(),
        User.countDocuments(),
        UserLogs.countDocuments(),
        Request.countDocuments(),
        Permission.countDocuments(),
        Category.countDocuments()
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
            borderColor: 'black',
            icon: 'fa-newspaper',
            role: 1
           },

            tag: {
            title: 'No. Of Tag',    
            total: tagCount,
            bgcolor: 'white',
            textColor: 'black',
            borderColor: '#f75815',
            icon: 'fa-tags',
            role: 1
           },

            pages: {
            title: 'No. Of Pages',
            total: pagesCount,
            bgcolor: '#f75815',
            bgcolor2: '#465367',
            textColor: 'white',
            borderColor: 'black',
            icon: 'fa-file-alt',
            role: 1
           },

            user: {
            title: 'No. Of User',
            total: userCount,
            bgcolor: 'white',
            textColor: 'black',
            borderColor: '#f75815',
            icon: 'fa-users',
            role: 1
           },

            logs: {
            title: 'No. Of Logs',
            total: logsCount,
            bgcolor: '#f75815',
            bgcolor2: '#465367',
            textColor: 'white',
            borderColor: 'black',
            icon: 'fa-history',
            role: 1
           },

           request: {
            title: 'No. Of Request',
            total: requestCount,
            bgcolor: 'white',
            textColor: 'black',
            borderColor: '#f75815',
            icon: 'fa-code-pull-request',
            role: [0, 1]
           },

          permission: {
            title: 'No. Of Permission',
            total: permRequest,
            bgcolor: 'white',
            textColor: 'black',
            borderColor: '#f75815',
            icon: 'fa-code-pull-request',
            role: 1
           },

          category: {
            title: 'No. Of Category',
            total: categoryCount,
            bgcolor: 'white',
            textColor: 'black',
            borderColor: '#f75815',
            icon: 'fa-code-pull-request',
            role: 1
           },
        }
    })
}

const getSideBarRoutes = async (req, res) => {
  try {
    const siderBarRoutes = await Dashboard.find();

    const descendingOrder = ['Dashboard', 'Post', 'Tag', 'Pages', 'Category', 'User', 'Settings', 'Profile', 'Permission', 'Request', 'Request Form', 'Post Approved', 'Role', 'Logs'];

    const sortingRoutes = descendingOrder.map(routeName => {
      const item = siderBarRoutes.find(route => route.routeName === routeName);

      if (!item) return null; 

      const normalizedRole = Array.isArray(item.role) ? item.role : [item.role];


      return {
        routeName: item.routeName,
        status: item.status,
        is_deleted: item.is_deleted,
        paramName: item.paramName,
        iconName: item.iconName,
        iconName2: item.iconName2,
        role: normalizedRole
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

const getSideBarRole = async (req, res) => {
  try {
    const siderBarRoutes = await Dashboard.find();

    const filteredRoutes = siderBarRoutes.filter(route => {
      if (Array.isArray(route.role)) {
        return route.role.includes(0);
      }
      return route.role === 0; 
    });

    const descendingOrder = [
      'Dashboard',
      'Post',
      'Tag',
      'Pages',
      'Category',
      'User',
      'Settings',
      'Profile',
      'Permission',
      'Request',
      'RequestForm',
      'Role',
      'Logs'
    ];

    const sortingRoutes = descendingOrder
      .map(routeName => {
        const item = filteredRoutes.find(route => route.routeName === routeName);

        if (!item) return null;

        const normalizedRole = Array.isArray(item.role) ? item.role : [item.role];

        return {
          routeName: item.routeName,
          status: item.status,
          is_deleted: item.is_deleted,
          paramName: item.paramName,
          iconName: item.iconName,
          iconName2: item.iconName2,
          role: normalizedRole
        };
      })
      .filter(Boolean);

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
    getSideBarRoutes,
    getSideBarRole
}