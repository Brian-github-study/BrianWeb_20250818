const mongoose = require("mongoose");
const { Schema } = mongoose;

// 定義資料庫結構schema
const projectSchema = Schema({
    name: { type: String},
    description: { type: String},
    link: { type: String}
});
// 建立資料表(collections)，mongoose中稱為 model
const project = mongoose.model("project", projectSchema);
module.exports = project;