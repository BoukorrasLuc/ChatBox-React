import { useState } from "react";
import { useParams } from "react-router-dom";

const Formulaire = ({ addMessage }) => {
  const { pseudo } = useParams();

  const [message, setMessage] = useState("");
  const [length, setLength] = useState(140);

  const createMessage = () => {
    const messageDansLaBox = {
      pseudo,
      message: message,
    };

    addMessage(messageDansLaBox);

    setMessage("");
    setLength(140);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMessage();
  };

  const handleChange = (e) => {
    const message = e.target.value;
    setLength(140 - message.length);
    setMessage(message);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      createMessage();
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        required
        maxLength={140}
        onChange={handleChange}
        value={message}
        onKeyUp={handleKeyUp}
      />

      <div className="info">{length}</div>
      <button type="submit">Envoyer !</button>
    </form>
  );
};
export default Formulaire;
