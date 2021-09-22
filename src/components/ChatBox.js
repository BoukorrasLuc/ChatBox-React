import Formulaire from "./Formulaire";
import Messages from "./Messages";

import { Component } from "react";

class ChatBox extends Component {
  state = {
    messages: {},
  };

  addMessage = (message) => {
    const messages = { ...this.state.messages };
    messages[`message-${Date.now()}`] = message;
    this.setState({ messages });
  };

  render() {
    const messages = Object.keys(this.state.messages).map((key) => (
      <Messages key={key} message={this.state.messages[key].message} />
    ));

    return (
      <div className="chatBox">
        <div>
          <div className="messages">
            <div className="message">{messages}</div>
          </div>
        </div>
        <Formulaire addMessage={this.addMessage} />
      </div>
    );
  }
}

// const ChatBox = () => {
//   const { pseudo } = useParams();

//   const [messagesTousLesMessages, setMessagesTousLesMessages] = useState({});

//   const addMessage = (message) => {
//     messagesTousLesMessages[`message-${Date.now()}`] = message;
//     setMessagesTousLesMessages({ messagesTousLesMessages });
//   };

//   return (
//     <div className="chatBox">
//       <div>
//         <div className="messages">
//           <Messages />
//         </div>
//       </div>
//       <Formulaire addMessage={addMessage} pseudo={pseudo} />
//     </div>
//   );
// };

export default ChatBox;
