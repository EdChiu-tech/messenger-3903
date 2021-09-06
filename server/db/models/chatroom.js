const { Op, Sequelize } = require("sequelize");
const db = require("../db");
const Chatroom = require("./chatroom1");

const Chatroom = db.define("chatroom", {
  roomname: {
    type: Sequelize.toString,
    unique: true,
    allowNull: false,
  },
});

// findRoom function is not reflected at the messages API

Chatroom.findRoom = async function () {
  const Chatroom = await Chatroom.findAll({
    order: [[chatroom, "id", "DESC"]],
  });

  // return Chatroom or null if it doesn't exist
  return Chatroom;
};

module.exports = Chatroom;
