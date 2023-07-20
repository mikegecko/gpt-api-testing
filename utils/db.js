const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_CONNECTION_STRING;

async function db_connect() {
  try{
    const res = await mongoose.connect(mongoDB, {
      bufferCommands: false, //Allows larger payloads
    });
    //if res is a success
    console.log('\u001b[' + 32 + 'm' + 'Connected to mongoDB cluster...' + '\u001b[0m');
  } catch(error){
    console.log(error);
    if(error.code === 'ECONNREFUSED'){
      console.log('\u001b[' + 31 + 'm' + 'No connection...' + '\u001b[0m');
    }
  }
}

module.exports = { db_connect }