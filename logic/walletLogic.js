const { validationResult } = require("express-validator");
let models = require('../config/modelAccess');
const walletModel = models.PERSONAL_WALLET;
exports.addUser = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const userData = req.body;
        const createUser = await walletModel.create(userData);
        res.status(200).json({message:"User added",result:createUser});

    }catch(e){
        console.error("Error at addToCart",e);
        res.status(500).json({message:"Server Error",result:false});
    }
}


exports.getBalance = async(req,res,next) => {
    try{
        const user_id = req.query.user_id;
        const getUserBalance = await walletModel.findOne({where:{user_id:user_id},attributes:['balance'],raw:true});
        res.status(200).send(getUserBalance);
    }catch(e){
        console.log("Error at getCartItems",e);
        res.status(500).json({message:"Server Error",result:false});
    }
}


