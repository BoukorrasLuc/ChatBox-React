import Formulaire from "./Formulaire";
import Messages from "./Messages";
import base from "../Base";

// Pour les animations CSS
import { Component, createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class ChatBox extends Component {
  state = {
    messages: {},
  };

  // Des que le nouveau message est posté, tu te met tout en bas
  messagesRef = createRef();
  componentDidUpdate() {
    const ref = this.messagesRef.current;
    ref.scrollTop = ref.scrollHeight;
  }

  // Sync avec Firebase au moment ou l'app se monte pour vérifier si il y a des données.
  componentDidMount() {
    base.syncState("/", { context: this, state: "messages" });
  }

  addMessage = (message) => {
    // On va copier le state
    /* Le spread operator = va récuperer tout ce que tu trouves dans ce que je te donne */
    const messages = { ...this.state.messages };
    messages[`message-${Date.now()}`] = message;

    // On supprime si plus de 10 messages. On retire de la boucle les messages qui nous interessent avec le slice (les 10 premiers).
    // Ensuite on supprime le 11eme à l'aide de null. En React, null = delete.
    // Tout ce qui n'est pas dans le slice est delete. Le tout, sync avec Firebase.
    Object.keys(messages)
      .slice(0, -10)
      .forEach((key) => {
        messages[key] = null;
      });

    this.setState({ messages });
  };

  render() {
    // On loop à l'intérieur de l'objet messages, qui va regrouper tous nos messages.
    // On va prendre les clés de l'objet passé en paramètre.
    // Au final, on récupère un tableau avec une clé pour chaque message.
    const messages = Object.keys(this.state.messages)
      // Le map va boucler à l'intérieur des tableaux, pour chaque clé elle va nous renvoyer le component message
      .map((key) => (
        <CSSTransition key={key} timeout={200} classNames="fade">
          <Messages
            message={this.state.messages[key].message}
            pseudo={this.state.messages[key].pseudo}
          />
        </CSSTransition>
      ));

    return (
      <div className="chatBox">
        <div className="messages" ref={this.messagesRef}>
          <TransitionGroup className="message">{messages}</TransitionGroup>
        </div>

        <Formulaire addMessage={this.addMessage} />
      </div>
    );
  }
}

export default ChatBox;
