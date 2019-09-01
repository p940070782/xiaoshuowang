const express = require("express");
const router = express.Router();

const {
    User,
    Book,
    Mybook
} = require("./utils/schema");

const {
    keys,
    aesEncrypt,
    aesDecrypt
} = require("./utils")
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
router.post("/changePassword", (req, res) => {
    const {
        password,
        newpassword,
        newdbpwd,
    } = req.body;
    let username = req.session.username;
    User.findOne({
        username,
        password
    }).then(result => {
        if (result) {
            if (newpassword == result.password) {
                res.json({
                    code: 200,
                    msg: '不能使用相同的密码，请重新输入新密码',
                    type: 2
                })
            } else {
                User.update({
                    username
                }, {
                    $set: {
                        password: newpassword,
                        dbpwd: newdbpwd
                    }
                }).then(result => {
                    res.json({
                        code: 200,
                        msg: "修改密码成功",
                        result,
                        type: 1
                    })
                })
            }
        } else {
            res.json({
                code: 200,
                msg: "密码错误，请输入正确的密码后进行操作",
                type: 0
            })
        }
    })
})
router.post("/findMyBook", (req, res) => {
    const username = req.session.username;
    Mybook.find({
        username
    }).then(result => {
        res.json({
            code: 200,
            msg: '获取书架数据成功',
            result
        })
    })
})
router.post('/joinMybook', (req, res) => {
    const {
        bookInfo,
        title,
    } = req.body
    // console.log(req.body)
    const username = req.session.username;
    Mybook.findOne({
        username,
        title,
    }).then(result => {
        // console.log(result)
        if (!result) {
            Mybook.insertMany({
                username,
                bookInfo,
                title
            }).then(result => {
                // console.log(result)
                res.json({
                    code: 200,
                    msg: '添加成功',
                    result,
                    type: 1,
                })
            })
        } else {
            res.json({
                code: 200,
                msg: '已添加至书架',
                type: 0
            })
        }
    })
});
router.post('/dltBook',(req,res)=>{
    console.log(req.body);
    console.log(req.session.username)
    const {
        bookInfo,
        title
    } = req.body;
    const username = req.session.username;
    Mybook.deleteOne({
        username,
        title
    }).then(result=>{
        res.json({
            code:200,
            msg:'删除成功',
            result
        })
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
    console.log(username)
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
// router.post("/getOneAvatar", (req, res) => {
//     const {
//         keys
//     } = req.body;
//     User.findOne({
//         $or: [{
//             username: keys
//         }, {
//             mobile: keys
//         }]
//     }).then(result => {
//         // console.log(result)
//         if (result.avatar) {
//             res.json({
//                 code: 200,
//                 msg: "获取个人头像成功",
//                 type: 1,
//                 avatar: result.avatar
//             })
//         } else {
//             res.json({
//                 code: 200,
//                 msg: "个人头像尚未上传",
//                 type: 0,
//                 avatar: null
//             })
//         }
//     })
// })

router.post("/typeList", (req, res) => {
    let {
        limit,
        category
    } = req.body
    var obj = {};
    limit = limit * 1 || 0;
    obj = req.body
    if (category == "男生") {
        obj = {
            $or: [{
                category: "都市"
            }, {
                category: "玄幻"
            }, {
                category: "历史"
            }, {
                category: "军事"
            }, {
                category: "科幻"
            }, {
                category: "同人"
            }, {
                category: "短篇"
            }]
        }
    } else if (category == "女生") {
        obj = {
            $or: [{
                category: "现言"
            }, {
                category: "穿越"
            }, {
                category: "宫斗"
            }, {
                category: "古言"
            }, {
                category: "短篇"
            }, {
                category: "校园"
            }, {
                category: "仙侠"
            }, {
                category: "种田"
            }, {
                category: "同人"
            }]
        }
    }
    Book.find(obj).sort({
        readCount: -1
    }).limit(limit).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: "获取数据成功",
            result
        })
    })
})
router.get('/getSearch', (req, res) => {
    // console.log(req.query);
    let {
        keyword,
        limit
    } = req.query;
    limit = limit * 1 || 0
    var obj = {};
    if (keyword) {
        obj = {
            $or: [{
                category: new RegExp(keyword)
            }, {
                title: new RegExp(keyword)
            }, {
                author: new RegExp(keyword)
            }]
        }
    }
    Book.find(obj, {}).sort({
        readCount: -1
    }).limit(limit).then(result => {
        // console.log(result)
        res.json({
            code: 200,
            msg: "获取数据成功",
            result
        })
    })
})
router.get('/getHome', (req, res) => {
    var homeList = [];
    Book.find({
        category: "都市"
    }).limit(6).then(result => {
        homeList.push(...result)
    });
    Book.find({
        category: "玄幻"
    }).limit(6).then(result => {
        homeList.push(...result)
    })
    Book.find({
        category: "现言"
    }).limit(6).then(result => {
        homeList.push(...result)
    })
    Book.find({
        category: "校园"
    }).limit(6).then(result => {
        homeList.push(...result);
        res.json({
            code: 200,
            msg: '查询数据成功',
            homeList
        })
    })
})

router.post('/getBookinfo', (req, res) => {
    const body = req.body;
    Book.findOne(body).then(result => {
        res.json({
            code: 200,
            msg: "获取图书详情成功",
            result
        })
    })
})

router.post('/getSameBooks', (req, res) => {
    const body = req.body;
    Book.find(body).then(result => {
        res.json({
            code: 200,
            mag: "查询成功",
            result
        })
    })

})

router.get('/manyFound', (req, res) => {
    Book.find().then(result => {
        res.json({
            code: 200,
            msg: "获取数据成功",
            result
        })
    })
})
module.exports = router;