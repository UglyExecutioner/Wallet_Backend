const DataTypes = require('sequelize');
const sequelize = require('../config/connection');
const Op = DataTypes.Op;
const walletModel = require('./personal_wallet')(sequelize,{DataTypes:DataTypes,Op:Op})

module.exports =  (sequelize,extras) =>{
    let DataTypes = extras.DataTypes;

    const transactions = sequelize.define("transactions", {
        user_id:{
            type: DataTypes.STRING,
            allowNull: false
        },
        transaction_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        trans_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        initial_balance: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        final_balance: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        tableName: 'transactions',
        timestamps: true
    });
    walletModel.hasMany(transactions);

    return transactions;
}
