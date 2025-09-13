const mongoose = require("mongoose");
const { Schema } = mongoose;

// 定義資料庫結構schema
const postSchema = Schema({
    title: { type: String},
    content: { type: String},
    createdAt: { type: Date, default: Date.now }
});
// 建立資料表(collections)，mongoose中稱為 model
const post = mongoose.model("post", postSchema);
module.exports = post;