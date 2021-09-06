const Sequelize = require("sequelize");
const db = require("../db");

const Conversation = db.define("conversation", {
  userId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
  chatroomId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
});

module.exports = Conversation;
