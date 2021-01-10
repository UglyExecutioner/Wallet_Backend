
module.exports = (sequelize,extras) =>{
    let DataTypes = extras.DataTypes;
    const personal_wallet = sequelize.define("personal_wallet", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        balance: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: 0
        }
    },{
        tableName: 'personal_wallet',
        timestamps: true
    });
    return personal_wallet;
}
