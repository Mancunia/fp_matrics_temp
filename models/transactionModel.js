module.exports=(sequelize,DataTypes)=>{

    const Transactions = sequelize.define('transactions',{
        id: {
            type: DataTypes.STRING,
            // autoIncrement: true,
            primaryKey: true,
            allowNull:false 

          },
          transaction_code:{
            type:DataTypes.STRING,
            allowNull:false 
          },
          type:{
            type:DataTypes.ENUM('individual','business'),
            allowNull:false
          },
          sending_amount:{
            type:DataTypes.DECIMAL(10, 2),
            allowNull:false
          },
          sending_currency:{
            type:DataTypes.STRING,
            allowNull:false
          },
          receiving_currency:{
            type:DataTypes.STRING,
            allowNull:false

          },
          receiving_amount:{
            type:DataTypes.DECIMAL(15, 2),
            allowNull:false
          },
          processor_reference:{
            type:DataTypes.STRING,
            allowNull:true
          },
          status:{
            type:DataTypes.ENUM('processing','canceled','failed','processed'),
            allowNull:false
          },
          sending_device_details:{
            type:DataTypes.TEXT,
            allowNull:false
          },
          source_of_funds:{
            type:DataTypes.STRING,
            allowNull:false
          },
          accept_conditions:{
            type:DataTypes.BOOLEAN,
            allowNull:false
          },
          processed:{
            type:DataTypes.DATE,
            allowNull:true
          },
          deleted_at:{
            type:DataTypes.DATE,
            allowNull:true
          },
          created_at:{
            type:DataTypes.DATE,
            allowNull:true
          },
          updated_at:{
            type:DataTypes.DATE,
            allowNull:true
          }
       
    },{
      timestamps: false
    });

    Transactions.Range=async function(start,end,status='processing'){
      
        try{
            let [byRange,meta] = await sequelize.query(`SELECT t.sending_currency,t.receiving_currency,t.sending_amount, cn.name as sent_from,t.created_at as date 
            from transactions t join customers c on t.customer_id=c.id join users u on c.user_id=u.id join countries cn on u.country_code=cn.code 
            where t.created_at BETWEEN '${start}' AND '${end}' AND status='${status}'  ORDER BY t.created_at DESC`);
            console.log(meta.length);
            return byRange;
        }
        catch(error){
            console.log(error);
        }
    }

    Transactions.CountTranss = async function(start,end,status='processed'){
      try{
        let [allCountries,meta] = await sequelize.query(`
        select sending_currency, receiving_currency, Count(sending_currency) as sent,Count(receiving_currency) as received
        from transactions
        where created_at BETWEEN '${start}' AND '${end}' AND status ='${status}'
        group by sending_currency,receiving_currency`)

        return allCountries;

      }
      catch(error){
        const newError={status:500,error:error.message};
        throw newError;

      }
    }


    return Transactions;
}