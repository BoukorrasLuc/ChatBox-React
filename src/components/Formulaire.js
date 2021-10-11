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

  // Envoie du formulaire en vérifiant la fonction checkCharLengthMsg.
  const handleSubmit = (e) => {
    e.preventDefault();
    checkCharLengthMsg(message);
  };

  // Evenement pour décompter le nombre de caractère dans message et on met à jour le state message.
  const handleChange = (e) => {
    const message = e.target.value;
    setLength(140 - message.length);
    setMessage(message);
  };

  // Envoie du message en appuyant sur Enter
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      createMessage();
    }
  };

  // Fonction pour analyser la chaine de caractère est inférieur à 140, si la condition est bonne,on crée le message.
  function checkCharLengthMsg(message) {
    if (message.length > 140) {
      // window.location.reload();
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
