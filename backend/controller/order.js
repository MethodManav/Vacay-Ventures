const { Order } = require('../model/order')
const { Product } = require('../model/product')
const { PlaceOrder } = require('../model/placeOrder')
const cart = async (req, res) => {
    const userid = req.params.userid
    const proid = req.params.proid
    const priceDetail = await Product.findById(proid)
    const quantity = 1
    const amount = priceDetail.price * quantity

    const order = new Order({
        userid: userid,
        productid: proid,
        quantity: quantity,
        amount: amount
    })
    await order.save().then(res.json({ success: "post" }))
}
/* ---------------------------------- cart ---------------------------------- */
const Getcart=async(req,res)=>{
    const AllCartData = await Order.find({userid:req.params.userid,isCart:true}).populate('productid').populate('userid')
    if(AllCartData[0]){
        res.send(AllCartData)
    }
    else{
        return res.send({error:"Data Not Found"})
    }
}
/* ---------------------------------- order --------------------------------- */
const order = async (req, res) => {
    const orderid = req.body.allOrderId;
    const createOrder = await Order.updateMany({ _id: { $in: orderid }, userid: req.params.userid, isCart: true }, { isOrder: true, isCart: false }).populate('userid')
    console.log(createOrder)
    if (createOrder.modifiedCount > 0) {
        console.log(createOrder.modifiedCount > 0)
        // return res.send({message:"Order Placed"})
        const findPrice = await Order.find({ _id: { $in: orderid }, isOrder: true })
        let amount = 0;
        let price = 0;
        findPrice.map((item) => {
            price = price + item.amount;
            amount = price;
            console.log(amount)
        })

        // res.send({amount:amount})
        const orderConfirm = await PlaceOrder({
            userid: req.params.userid,
            ordersid: orderid,
            amount: amount,
            accept:'pending'
        })
        const confi =    await orderConfirm.save();
        if(confi){
            return res.send({message:"Order SuccessFully"})
        }
        else{
            return res.send({message:"Order not successful"})
        }
    }
    else {
        return res.send({ error: "Order Not Placed Please try Again!!" })
    }
}
/* ------------------------------ update order ------------------------------ */
const updateOrder = async (req, res) => {
    //only qantity update
    const orderid = req.params.orderid
    const quantity = req.body.quantity

    const agoData = await Order.findById({ _id: orderid, isOrder: false })
    const ProPrice = await Product.findById({ _id: agoData.productid })
    const newAmount = ProPrice.price * quantity
    console.log(agoData.amount)
    if (ProPrice) {
        const UpdateQuantity = await Order.findByIdAndUpdate({ _id: orderid, isOrder: false }, { quantity: quantity, amount: newAmount })
        if (UpdateQuantity) {
            return res.send({ message: "Order Updated" })
        }
        else{
            return res.send({ error: "Order not Updated" })
        }
    }
    else{
        return res.send({ error: "Order not Updated" })
    }

}
const PlaceOrderGet = async (req, res) => {
    const userid = req.params.userid
    const findOrder = await PlaceOrder.find({ userid: userid }).populate('ordersid').exec();
    console.log(findOrder)
    res.send(findOrder)

}
const AdminPlaceOrderGet = async (req, res) => {
    const userid = req.params.userid
    const findOrder = await PlaceOrder.find({accept:"pending"}).populate('ordersid').populate('userid').exec();
    console.log(findOrder)
    res.send(findOrder)

}
/* ------------------------ order accept and cacleled ----------------------- */
const GivePermit = async(req,res)=>{
    const Givepermission = await PlaceOrder.findByIdAndUpdate({_id:req.params.orderid},{accept:req.params.accept})
    if(Givepermission){
        return res.send({ message: `Order ${req.params.accept == "true}" ? "Accepted" : "Canceled"}` })
    }
    else{
        return res.send({ message: "please Try Again" })
    }
}
module.exports = {
    cart,
    order,
    PlaceOrderGet,
    AdminPlaceOrderGet,
    updateOrder,
    Getcart,
    GivePermit
}