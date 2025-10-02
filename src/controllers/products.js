import Product from '../models/products.js';

export const getProducts = async (req, res) => {
    try {
        const {_page = 1, _limit = 10, name, minPrice, maxPrice} = req.query;
        let filter = {};
        if(name) {
            filter.name = {$regex: name, $options: 'i'}; 
        }
        //Lọc theo giá
        if(minPrice || maxPrice) {
            filter.price = {};
            if(minPrice) filter.price.$gte = Number(minPrice);
            if(maxPrice) filter.price.$lte = Number(maxPrice);
        }
        //Skip 
        const page = parseInt(_page) || 1;
        const limit = parseInt(_limit) || 10;
        const skip = (page - 1) * limit;
        //Truy vấn dữ liệu
        const [products, total] = await Promise.all([
            Product.find(filter)
            .skip(skip)
            .limit(limit)
            .select("-_id -__v"),
            Product.countDocuments(filter)
        ]);
        return res.json({
            data: products,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
// Thêm sản phẩm
export const addProduct = async (req,res) =>{
    try {
        const newProduct = await Product.create(req.body)
        return res.json({
            message: "Thêm thành công",
            data: newProduct
        })
    } catch (error) {
        return res.json({message: error});
    }
}
// Tìm sản phẩm theo id
export const getProductById = async (req,res) =>{
    try {
        const product = await Product.findOne({ id: parseInt(req.params.id) }).select("-_id -__v");
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
        return res.json(product);
    } catch (error) {
        return res.json({message: error})
    }
}
// Update sản phẩm
export const updateProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            { $set: { name, price, description } },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        return res.json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ id: parseInt(req.params.id) }).select("-_id -__v");
        
        if (!deletedProduct) {
            return res.json("Không tìm thấy sản phẩm để xóa");
        }

        return res.json({
            message: "Xóa sản phẩm thành công"
        });
    } catch (error) {
        return res.json({ message: error });
    }
};