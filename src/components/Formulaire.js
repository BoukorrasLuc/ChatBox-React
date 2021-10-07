import { useState } from "react";
import { useParams } from "react-router-dom";

const Formulaire = ({ addMessage }) => {
  const { pseudo } = useParams();

  const [message, setMessage] = useState("");
  const [length, setLength] = useState(140);
  const [errorMessage, setErrorMessage] = useState();

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
    checkCharLengthMsg(message);
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

  function checkCharLengthMsg(message) {
    if (message.length > 140) {
      setErrorMessage("Veuillez un message de moins de 140 caractères");
    } else {
      createMessage();
    }
  }

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
      <div className="error-message">{errorMessage}</div>
      <button type="submit">Envoyer !</button>
    </form>
  );
};
export default Formulaire;
