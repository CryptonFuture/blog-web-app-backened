import Category from '../../models/Category/categoryModel.js'

const createCategories = async (req, res) => {
    const {category, subCategory, description} = req.body

    if (!category || category.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: "At least one category required" 
      });
    }

    const savedCategories = []

    for(let i = 0; i < category.length; i++) {
        const newCategory = new Category({
            name: category[i],
            description: description || "",
            subCategories: (subCategory || []).map((s) => ({name: s}))
        })

        const saved = await newCategory.save()
        savedCategories.push(saved)
    }
    return res.status(201).json({ 
        success: true, 
        data: savedCategories,
        message: 'create category successfully'
    });
}

const getCategory = async (req, res) => {
 
    const categories = await Category.find();

     if (categories.length === 0) {
        return res.status(404).json({
            success: false,
            error: "No record found"
        });
    }

    if(categories) {
        res.json({ 
            success: true, 
            data: categories 
        });
    } else {
        res.status(500).json({ 
            success: false, 
            error: err.message 
        });
    }
  
};

const getCategoryById = async (req, res) => {
    const { id } = req.params
       const categories = await Category.find({ _id: id })
   
       if (!categories) {
           return res.status(404).json({
               success: false,
               error: "No categorie Id found"
           })
       }
   
       return res.status(200).json({
           success: true,
           data: categories
       })
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, description, subCategories } = req.body;

        const updateFields = { description };

       if (category) {
            if (typeof category === "object" && category.name) {
                updateFields.category = { name: category.name.trim() };
            } else if (typeof category === "string") {
                updateFields.category = { name: category.trim() };
            }
        }

        if (subCategories && Array.isArray(subCategories)) {
            updateFields.subCategories = subCategories
                .filter((s) => s && (s.name || typeof s === "string"))
                .map((s) =>
                    typeof s === "object" ? { name: s.name.trim() } : { name: s.trim() }
                );
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                error: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedCategory,
            message: "Category update successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};



const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                error: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

const countCategory = async (req, res) => {
   
    const countCategory = await Category.countDocuments()

    return res.status(200).json({
        success: true,
        count: countCategory
    })
}

export {
    createCategories,
    getCategory,
    countCategory,
    getCategoryById,
    deleteCategory,
    updateCategory
}