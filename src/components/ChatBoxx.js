import Formulaire from "./Formulaire";
import Messages from "./Messages";
import firebase from "firebase/app";
import "firebase/database";

import React, { useState, useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

firebase.initializeApp({
  apiKey: "AIzaSyBYFEZC5NF__bHTB7d_jd88N1RziVqEZ78",
  authDomain: "chatbox-react-a439e.firebaseapp.com",
  databaseURL:
    "https://chatbox-react-a439e-default-rtdb.europe-west1.firebasedatabase.app",
});

const ChatBoxx = () => {
  const [messages, setMessages] = useState({});

  const addMessage = (message) => {
    const mess = { ...messages };
    // On ajoute un message à notre copie du state avec une clé Date.now()
    mess[`message-${Date.now()}`] = message;
    setMessages(mess);
  };

  // On supprime si plus de 10 messages. On retire de la boucle les messages qui nous interessent avec le slice (les 10 premiers).
  // Ensuite on supprime le 11eme à l'aide de delet
  Object.keys(messages)
    .slice(0, -10)
    .forEach((key) => {
      delete messages[key];
    });

  // Sync avec Firebase
  useEffect(() => {
    firebase
      .database()
      .ref(`/`)
      .on("value", (snapshot) => {
        if (snapshot.val()) setMessages(snapshot.val());
      });
  }, []);

  // Update avec Firebase
  useEffect(() => {
    firebase.database().ref(`/`).update(messages);
  }, [messages]);

  // Logique pour le srcoll automatique sur le dernier message.
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // Logique componentDidMount
      mounted.current = true;
    } else {
      // Logique componentDidUpdate
      const ref = mounted.current;
      ref.scrollTop = ref.scrollHeight;
    }
  });

  // On loop à l'intérieur de l'objet messages, qui va regrouper tous nos messages.
  // On va prendre les clés de l'objet passé en paramètre.
  // Au final, on récupère un tableau avec une clé pour chaque message.
  const tousLesMessages = Object.keys(messages)
    // Le map va boucler à l'intérieur des tableaux, pour chaque clé elle va nous renvoyer le component message
    .map((key) => (
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
