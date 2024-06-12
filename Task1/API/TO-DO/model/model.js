
const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    id:{type:Number,required:[true,'Path `id` is required.']},
    Title:{ type: String, required: [true, 'Path `title` is required.']},
    content:{type: String, required: [true, 'Path `content` is required.']}
  }
);

const TODO = mongoose.model('todos',todoSchema);

module.exports = TODO;