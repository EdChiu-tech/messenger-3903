import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";

import { setReadConversation } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user, setReadConversation } = props;
  const conversation = props.conversation || {};

  const [numMessages, setNumMessages] = useState(0);

  useEffect(() => {
    if (conversation.id) setNumMessages(conversation.messages.length);
  }, [conversation]);

  useEffect(() => {
    if (conversation.id)
      setReadConversation(conversation.id, conversation.otherUser.id);
  }, [numMessages]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find((conversation) => conversation.active === true),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setReadConversation: (conversationId, senderId) => {
      dispatch(setReadConversation(conversationId, senderId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
