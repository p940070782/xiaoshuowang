const mongoose = require("mongoose")
const port = 27017;

const hostname = "0.0.0.0";
const dbName = "1906";

const CONN_DB_STR = `mongodb://${hostname}:${port}/${dbName}`;

// 链接数据库
mongoose.connect(CONN_DB_STR,{useNewUrlParser: true});

const connection = mongoose.connection;

connection.on("connected",()=>{
    console.log("数据库连接成功...");
})

module.exports = connection;