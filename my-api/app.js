const express = require("express");
const port = 1906;
const hostname = "0.0.0.0";
const http = require("http");
const app = express();
const server = http.createServer(app);


const connection = require("./utils/db");

const cors = require("cors");
app.use(cors()); // cors 解决跨域问题   jsonp 代理

app.use(express.json()); //  from-data  表单post提交必须引入的中间件;
app.use(express.urlencoded({
    extends: false
})); // ajax  post请求获取数据;


app.use(express.static("public")) // 设置 public 为静态资源目录


app.get("/demo", (req, res) => {
    res.send("这是一个 后台的接口 服务器地址");
})

const session = require("express-session");
app.use(session({
    secret: "test",
    name: "appTest",
    cookie: {
        maxAge: 60 * 60 * 1000
    }, // session 记录数据的时长 
    resave: false,
    saveUninitialized: true
}))

const {
    checkToken
} = require("./utils");
app.use(checkToken)



const vue = require("./vue");
app.use("/vue", vue); //  路由别名





server.listen(port, hostname, () => {
    console.log(`my api server is running  at http://${hostname}:${port}`)
})