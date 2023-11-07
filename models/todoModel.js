const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema;

const toDoSchema = new TodoSchema({
  name: {
    type: String,
    required: true,
  },
});

const ToDoModel = mongoose.model("todo", toDoSchema);

module.exports = ToDoModel;
