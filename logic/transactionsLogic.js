let models = require('../config/modelAccess');

const walletModel = models.PERSONAL_WALLET;
const transactionModel = models.TRANSACTIONS;

exports.getAllTransactions = async(req,res,next)=>{
    try{
        const user_id = req.query.user_id;
        const getTransaction = await transactionModel.findAll({where:{user_id:user_id},raw:true})
        res.status(200).send(getTransaction);

    }catch(e){
        console.log("Error at createPost",e);
        res.status(500).json({message:'Server Error',result:false});
    }
    
}

exports.addFunds = async(req,res,next) =>{
    try{
        const postData = req.body;
        const userToAdd = await walletModel.findOne({where:{user_id:postData.user_id},raw:true});
        const addFund = await walletModel.increment({balance:postData.amount},{where:{user_id:postData.user_id}});
        if(addFund){
            const updateTransPayload = {
                user_id:postData.user_id,
                transaction_type: 'add_funds',
                trans_date: new Date(),
                initial_balance:userToAdd.balance,
                amount: postData.amount,
                final_balance: addFund.flat(2)[0].balance,
            };
            await transactionModel.upsert(updateTransPayload)
        }
        res.status(200).json({message:"Funds Added",result:{balance:addFund.flat(2)[0].balance}})
    }catch(e){
        console.log("Error at updatePost",e);
        res.status(500).json({message:'Server Error',result:false});
    }
}

exports.spendFunds = async(req,res,next) =>{
    try{
        const postData = req.body;
        const userToSpend = await walletModel.findOne({where:{user_id:postData.user_id},raw:true});
        if(userToSpend.balance < postData.amount){
            return res.status(400).json({message:'Insufficent funds',result:false});
        }
        const spendFund = await walletModel.decrement({balance:postData.amount},{where:{user_id:postData.user_id}});
        if(spendFund){
            const updateTransPayload = {
                user_id:postData.user_id,
                transaction_type: 'spend_funds',
                trans_date: new Date(),
                initial_balance:userToSpend.balance,
                amount: postData.amount,
                final_balance: spendFund.flat(2)[0].balance,
            };
            await transactionModel.upsert(updateTransPayload)
        }
        res.status(200).json({message:"Funds Deducted",result:{balance:spendFund.flat(2)[0].balance}})
    }catch(e){
        console.log("Error at getPosts",e);
        res.status(500).json({message:'Server Error',result:false});
    }
}



