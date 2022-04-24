module.exports=(sequelize,DataTypes)=>{

    const Countries = sequelize.define('country',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        dial_code:{
            type:DataTypes.STRING,
            allowNull:false
        },
        code:{
            type:DataTypes.STRING,
            allowNull:true
        },
        currency:{
            type:DataTypes.STRING,
            allowNull:false
        },
        symbol:{
            type:DataTypes.STRING,
            allowNull:true
        }


    },{
        timestamps: false
      }
    )

    Countries.FindBySign = async(code)=>{
        const [result,meta] = await sequelize.query(`SELECT name,code,currency,symbol,flag_emoji from countries where currency = '${code}'`)
    }

    Countries.Active =async()=>{
        let [result,meta] = await sequelize.query('SELECT name,code,currency,symbol,flag_emoji from countries where active = 1');
    }



    return Countries


}