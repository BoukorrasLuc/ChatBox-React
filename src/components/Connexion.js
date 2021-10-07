import { useState } from "react";
import { Redirect } from "react-router-dom";

const Connexion = () => {
  const [pseudo, setPseudo] = useState("");
  const [goToChat, setGoToChat] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  // regexp précisant les caractéres autorisés.
  const characterAllowed = /[\w\d\-]+/;
  // regexp pour une chaine de caractère contenant des espaces.
  // Si rien n'est frappé dans l'input pseudo,
  // le required de celui ci prend la releve pour indiquer
  // qu'il faut entré une valeur obligatoirement.
  const emptyString = /\s+/;
  // regexp special character excepté le caractère minus (-).
  const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!]+/;

  // Fonction pour analyser la chaine de caractère entré par l'utilisateur.
  function checkPseudo() {
    if (specialCharacter.test(pseudo) || emptyString.test(pseudo)) {
      setGoToChat(false);
      setErrorMessage("Veuillez rentrer un pseudo correct");
    } else if (characterAllowed.test(pseudo)) {
      setGoToChat(true);
    }
  }

  // Envoie du Formulaire en testant la fonction checkPseudo().
  const handleSubmit = (e) => {
    e.preventDefault();
    checkPseudo();
  };

  if (goToChat) {
    return <Redirect push to={`/pseudo/${pseudo}`} />;
  }

  return (
    <div className="connexionBox">
      <form className="connexion" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Pseudo"
          value={pseudo}
          onChange={(event) => setPseudo(event.target.value)}
        />
        <button>Connexion</button>
      </form>
      <div className="pseudo-error-message">{errorMessage}</div>
    </div>
  );
};

export default Connexion;
