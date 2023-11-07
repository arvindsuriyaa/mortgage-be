const ToDoModel = require("../models/todoModel.js");

const throwError = (res, response) => {
  res.status(500).send({ error: `response is ${response}` });
};

// Create Post
const create_post = (req, res) => {
  const newData = new ToDoModel({
    name: req.body.name,
  });
  newData
    .save()
    .then((result) => {
      if (!result) {
        return throwError(res, result);
      }
      res.send({ message: "Data Saved Successfully" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Get All
const get_all_post = (req, res) => {
  ToDoModel.find()
    .then((result) => {
      if (!result) {
        return throwError(res, result);
      }
      res.send(result);
    })
    .catch((err) => res.status(500).send(err));
};

// Get By Id
const get_by_id = (req, res) => {
  ToDoModel.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return throwError(res, result);
      }
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Delete
const delete_by_id = (req, res) => {
  ToDoModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return throwError(res, result);
      }
      res.send({ message: "Record is deleted" });
    })
    .catch((err) => res.status(500).send(err));
};

// Update
const update_by_id = (req, res) => {
  ToDoModel.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      if (!result) {
        return throwError(res, result);
      }
      res.send({ message: "Record is Updated" });
    })
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  create_post,
  get_all_post,
  get_by_id,
  delete_by_id,
  update_by_id,
};
