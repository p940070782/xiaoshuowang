const express = require("express");
const router = express.Router();

const {
    // Movie,
    User,
    Good,
    ShopCar
} = require("./utils/schema");

const {
    keys,
    aesEncrypt,
    aesDecrypt
} = require("./utils")

// router.get("/movie", (req, res) => {
//     const {
//         limit
//     } = req.query
//     Movie.find({}, {}).limit(parseInt(limit)).then(result => {
//         res.json({
//             code: 200,
//             msg: "获取电影数据成功",
//             result,
//         })
//     })
// });

router.post("/register", (req, res) => {
    const {
        username,
        mobile,
        password,
        dbpwd
    } = req.body;
    // console.log(req.body)
    User.findOne({
        $or: [{
            username
        }, {
            mobile
        }]
    }).then(result => {
        // console.log(result)
        if (result) {
            res.json({
                type: 0,
                msg: "用户名或昵称已存在，请重新注册",
                code: 200
            })
        } else {
            User.insertMany(req.body)
            res.json({
                type: 1,
                msg: "注册成功",
                code: 200
            })
        }
    })
});
router.post("/login", (req, res) => {
    const {
        keys,
        password
    } = req.body;
    User.findOne({
        $or: [{
            username: keys
        }, {
            mobile: keys
        }]
    }).then(result => {
        if (result) {
            if (result.password == password) {
                const token = aesEncrypt(result.username, keys)
                req.session.token = token;
                req.session.username = result.username;
                res.json({
                    type: 1,
                    msg: "登录成功",
                    token,
                    username: result.username,
                    code: 200
                })
            } else {
                res.json({
                    type: 0,
                    msg: "密码不匹配，请重新登录",
                    code: 200
                })
            }
        } else {
            res.json({
                type: 0,
                msg: "用户名或手机号不存在",
                code: 200
            })
        }
    })
})

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/avatar');
    },
    filename: function (req, file, cb) {
        cb(null, 'wh' + Date.now() + file.originalname)
    }
})

// 创建一个上传对象
const upload = multer({
    storage
}).any();

router.post("/uploadAvatar", upload, (req, res) => {
    // console.log("xxxx");
    // console.log(req.files);
    var pic = req.files[0].path;
    // console.log(req.session.token);
    var username = req.session.username;
    // console.log(username);
    User.updateOne({
        username
    }, {
        $set: {
            avatar: pic
        }
    }).then(result => {
        res.json({
            code: 200,
            msg: "上传成功",
            pic,
            result
        })
    })
})

router.post("/getAvatar", (req, res) => {
    const {
        username
    } = req.body;
    User.findOne({
        username,
    }).then(result => {
        // console.log(result)
        if (result.avatar) {
            res.json({
                code: 200,
                msg: "获取个人头像成功",
                type: 1,
                avatar: result.avatar
            })
        } else {
            res.json({
                code: 200,
                msg: "个人头像尚未上传",
                type: 0,
                avatar: null
            })
        }
    })
})


// 获取商品数量
// router.get("/getGoods", (req, res) => {
//     let {
//         limit,
//         keyword
//     } = req.query;
//     limit = limit * 1 || 0;
//     var obj = {};
//     if (keyword) {
//         obj = {
//             $or: [{
//                 name: new RegExp(keyword)
//             }, {
//                 "type.text": new RegExp(keyword)
//             }, {
//                 "type.value": new RegExp(keyword)
//             }]
//         }
//     }
//     Good.find(obj, {}).sort({
//         _id: -1
//     }).limit(limit).then(result => {
//         res.json({
//             code: 200,
//             msg: "获取商品数据成功",
//             result
//         })
//     })
// })

// 获取数据分类的内容;
// router.get("/getGoodType", (req, res) => {
//     Good.distinct("type").then(result => {
//         res.json({
//             code: 200,
//             msg: "获取商品分类成功",
//             result
//         })
//     })
// });
// // 获取详情;
// router.get("/getGoodDetail", (req, res) => {
//     const {
//         goodId
//     } = req.query;
//     // console.log(typeof goodId);
//     Good.findOne({
//         _id: goodId
//     }).then(result => {
//         // console.log(result);
//         res.json({
//             code: 200,
//             msg: "获取商品详情成功",
//             result
//         })
//     })
// })

// 购物车逻辑 shopcar

// 1. 加入购物车
// router.post("/addShopCar", (req, res) => {
//     const {
//         goodId,
//         goodInfo,
//         count
//     } = req.body;
//     const username = req.session.username;
//     // console.log(req.body, username);
//     ShopCar.findOne({
//         username,
//         goodId
//     }).then(result => {
//         if (result) {
//             ShopCar.update({
//                 username,
//                 goodId
//             }, {
//                 $inc: {
//                     count: count * 1
//                 },
//                 $set: {
//                     time: Date.now()
//                 }
//             }).then(result => {
//                 res.json({
//                     code: 200,
//                     msg: "购物车更新完成..",
//                     result
//                 })
//             })
//         } else {
//             // 直接新增 insert
//             ShopCar.insertMany({
//                 username,
//                 goodId,
//                 goodInfo,
//                 count: count * 1,
//                 time: Date.now()
//             }).then(result => {
//                 res.json({
//                     code: 200,
//                     msg: "购物车新增完成",
//                     result
//                 })
//             })
//         }
//     })
// })

// router.post("/getShopcarInfo", (req, res) => {
//     const username = req.session.username;
//     // console.log(username);
//     ShopCar.find({
//         username
//     }, {}).sort({
//         time: -1
//     }).then(result => {
//         if (result) {
//             let total = 0;
//             result.forEach(item => {
//                 total += item.count * 1;
//             })
//             res.json({
//                 code:200,
//                 msg:"获取购物车信息成功",
//                 carList:result,
//                 total
//             })
//         } else {
//             res.json({
//                 code:200,
//                 msg:"您的购物车空空如也..",
//                 carList:null
//             })
//         }
//     })
// })





module.exports = router;