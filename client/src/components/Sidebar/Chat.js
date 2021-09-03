import React, { useState, useEffect } from "react";
import { Box, Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { setActiveConversation } from "../../store/conversations";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { user, conversation, activeConversation } = props;
  const { messages, otherUser } = conversation;

  const [unreadCount, setUnreadCount] = useState(0);

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    await props.setActiveConversation(conversation.id);
  };

  useEffect(() => {
    const unreadCount = messages.filter(
      (message) => message.senderId !== user.id && message.unread
    ).length;

    setUnreadCount(unreadCount);
  }, [conversation]);

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />

      {unreadCount > 0 &&
        activeConversation !== conversation.otherUser.username && (
          <Badge badgeContent={unreadCount} color="primary"></Badge>
        )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    activeConversation: state.activeConversation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    setActiveConversation: (conversationId) => {
      dispatch(setActiveConversation(conversationId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
