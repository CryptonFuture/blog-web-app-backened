import Module from '../../models/Module/moduleModel.js'
import Post from '../../models/Post/postModel.js'

const getModule = async (req, res) => {
     const module = await Module.find()
    
        if (module.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            });
        }
    
        return res.status(200).json({
            success: true,
            data: module
        });
}

const getModules = async (req, res) => {
     const modules = await Post.find()
     
     const filtersModule = modules.map(item => {
        return {
            moduleCode: item.moduleCode,
            moduleType: item.moduleType,
            moduleName: item.moduleName
        }
     })
    
        if (filtersModule.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            });
        }
    
        return res.status(200).json({
            success: true,
            data: filtersModule
        });
}

export {
   getModule,
   getModules
}
