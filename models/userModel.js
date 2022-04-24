module.exports=(sequelize,DataTypes)=>{

    const Users = sequelize.define('users',{
        id: {
            type: DataTypes.STRING,
            // autoIncrement: true,-
            primaryKey: true,
            allowNull:false 
        },
        email:{
            type:DataTypes.STRING,
            allowNull:true
        },
        country_code:{
            type:DataTypes.STRING(3),
            allowNull:false
        },
        active:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        },
        last_login:{
            type:DataTypes.DATE,
            allowNull:true

        },
        last_login_device:{
            type:DataTypes.STRING,
            allowNull:true
        }
    },{
        timestamps: false
      }
    )

    Users.LastLogin =async (start,end)=>{
        try{
            let [result,meta] = await sequelize.query(`select last_login_device as device,Count(*) as size from users where last_login BETWEEN '${start}' AND '${end}' group by last_login_device `);

            // console.log('here',result);
            return [result,meta];
        }
        catch(e){
            console.log(e);
        }
    }

    return Users
}
