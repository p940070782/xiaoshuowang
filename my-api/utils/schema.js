const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movie_schema = new Schema({
    genres: Array,
    rating: Object,
    title: String,
    casts: Array,
    directors: Array,
    images: Object,
    year: String,
    id: String
});

exports.Movie = mongoose.model("movie", movie_schema);

const user_schema = new Schema({
    username: String,
    nickname: String,
    password: String,
    dbpwd: String,
    mobile: String,
    avatar: String
});

exports.User = mongoose.model('user', user_schema);


const good_schema = new Schema({
    name: String,
    price: Number,
    discount: Number,
    img: String,
    type: Object,
    _id: String
});

exports.Good = mongoose.model('good', good_schema);

const shopcar_schema = new Schema({
    username: String,
    goodId: String,
    goodInfo: Object,
    count: Number,
    time: Date
})

exports.ShopCar = mongoose.model("shopcar",shopcar_schema);

const book_schema = new Schema({
    author:String,
    category:String,
    title:String,
    description:String,
    readCount:String,
    iconUrl:String,
})


exports.Book = mongoose.model("book",book_schema)

const myBook_schema = new Schema({
    username:String,
    bookInfo:Object,
    title:String,
})
exports.Mybook = mongoose.model("mybook",myBook_schema)