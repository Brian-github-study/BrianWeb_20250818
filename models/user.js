    const mongoose = require("mongoose");
    const { Schema } = mongoose;

    // 定義資料庫結構schema
    const userSchema = Schema({
        name:{}, 
        password:{},
        note:{}
    });
    // 建立資料表(collections)，mongoose中稱為 model
    const user = mongoose.model("user", userSchema);
    module.exports = user;