import { useState } from "react";
import { Redirect } from "react-router-dom";

const Connexion = () => {
  const [pseudo, setPseudo] = useState("");
  const [goToChat, setGoToChat] = useState(false);

  if (goToChat) {
    return <Redirect push to={`/pseudo/${pseudo}`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setGoToChat(true);
  };

  return (
    <div className="connexionBox">
      <form className="connexion" onSubmit={handleSubmit}>
        <input
          type="text"
          pattern="[a-zA-Z]*[0-9]*"
          placeholder="Pseudo"
          required
          value={pseudo}
          onChange={(event) => setPseudo(event.target.value)}
        />
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
};

export default Connexion;
