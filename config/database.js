const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDatabase=()=>{
    dotenv.config().parsed;
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true}).then((data) => { console.log(`Connected to database :${data.connection.host}`); 
    })
}
module.exports = connectDatabase    