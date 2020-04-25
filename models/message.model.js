const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Message = new mongoose.model("messages", messageSchema);
module.exports = Message;
