import userModel from "../models/userModel.js";


const addToCart = async (req, res) => {
    try {
        const { userId,itemId } = req.body;
        let user = await userModel.findById(userId);
        let cartData = await user.cartData;
        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        }
        else{
            cartData[itemId] += 1;
        }
        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { userId,itemId } = req.body;
        let user = await userModel.findById(userId);
        let cartData = await user.cartData;
        if (cartData[itemId]>0) {
            cartData[itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const getCart = async (req, res) => {
    try {
        const { userId } = req.body;
        let user = await userModel.findById(userId);
        let cartData = await user.cartData;
        res.json({ success: true,cartData});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { addToCart, removeFromCart, getCart };