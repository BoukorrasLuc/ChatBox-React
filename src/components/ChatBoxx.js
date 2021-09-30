import Formulaire from "./Formulaire";
import Messages from "./Messages";
import firebase from "firebase/app";
import "firebase/database";

import React, { useState, useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ChatBoxx = () => {
  const [messages, setMessages] = useState({});

  const addMessage = (message) => {
    const mess = { ...messages };
    mess[`message-${Date.now()}`] = message;
    setMessages(mess);
  };

  Object.keys(messages)
    .slice(0, -10)
    .forEach((key) => {
      delete messages[key];
    });

  useEffect(() => {
    firebase
      .database()
      .ref(`/`)
      .on("value", (snapshot) => {
        if (snapshot.val()) setMessages(snapshot.val());
      });
  }, []);

  useEffect(() => {
    firebase.database().ref(`/`).update(messages);
  }, [messages]);

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
      const ref = mounted.current;
      ref.scrollTop = ref.scrollHeight;
    }
  });

  const tousLesMessages = Object.keys(messages).map((key) => (
    <CSSTransition key={key} timeout={200} classNames="fade">
      <Messages
        message={messages[key].message}
        pseudoMessage={messages[key].pseudo}
      />
    </CSSTransition>
  ));

  return (
    <div className="chatBox">
      <div className="messages" ref={mounted}>
        <TransitionGroup className="message">{tousLesMessages}</TransitionGroup>
      </div>

      <Formulaire addMessage={addMessage} />
    </div>
  );
};

export default ChatBoxx;
