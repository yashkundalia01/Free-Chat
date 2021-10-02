import "./Chat.css";
import { Component } from "react";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  ChatList,
  ChatCard,
  NewChatForm,
  ChatFeed,
  ChatHeader,
  IceBreaker,
  MessageBubble,
  IsTyping,
  ConnectionBar,
  NewMessageForm,
  ChatSettings,
  ChatSettingsTop,
  PeopleSettings,
  PhotosSettings,
  OptionsSettings,
  ChatEngine,
  getOrCreateChat,
} from "react-chat-engine";

class Chat extends Component {
  state = {
    profile: null,
    username: null,
  };

  setUsername(uName) {
    this.setState({ ...this.state, username: uName });
  }

  createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [this.state.username] },
      () => this.setUsername("")
    );
  }

  renderChatForm(creds) {
    return (
      <div className="form123">
        <input
          placeholder='Username'
          value={this.state.username}
          onChange={(e) => this.setUsername(e.target.value)}
        />
        <button onClick={() => this.createDirectChat(creds)} className="btn12 btn12-primary">Create</button>
      </div>
    );
  }

  render() {
    const name = localStorage.getItem("name");
    const pass = localStorage.getItem("password");

    return (
      <div className='chatbox'>
        <ChatEngine
          height='80vh'
          userName={name}
          userSecret={pass}
          projectID='7455826c-4ed5-4f53-95db-5b5bf2e03e48'
          renderNewChatForm={(creds) => this.renderChatForm(creds)}
          renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
          renderChatHeader={(chat) => <ChatHeader />}
          renderIceBreaker={(chat) => <IceBreaker />}
          renderMessageBubble={(
            creds,
            chat,
            lastMessage,
            message,
            nextMessage
          ) => (
            <MessageBubble
              lastMessage={lastMessage}
              message={message}
              nextMessage={nextMessage}
              chat={chat}
            />
          )}
          renderIsTyping={(typers) => <IsTyping />}
          renderConnectionBar={(chat) => <ConnectionBar />}
          renderNewMessageForm={(creds, chatID) => <NewMessageForm />}
          renderChatSettings={(chatAppState) => (
            <ChatSettings {...chatAppState} />
          )}
          renderChatSettingsTop={(creds, chat) => <ChatSettingsTop />}
          renderPhotosSettings={(chat) => <PhotosSettings />}
          renderOptionsSettings={(creds, chat) => <OptionsSettings />}
        />
      </div>
    );
  }
}

export default Chat;
