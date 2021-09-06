const Conversation = require("./chatroom");
const User = require("./user");
const Message = require("./message");
const Chatroom = require("./chatroom1");

// associations

User.hasMany(Conversation);
Chatroom.hasMany(Conversation);
Conversation.belongsTo(User);
Conversation.belongsTo(Chatroom);

User.hasMany(Message);
Chatroom.hasMany(Message);
Message.belongsTo(Chatroom);
Message.belongsTo(User);

module.exports = {
  User,
  Conversation,
  Message,
  Chatroom,
};
