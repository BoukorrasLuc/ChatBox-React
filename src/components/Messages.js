import { useParams } from "react-router";

const Messages = ({ message, pseudoMessage }) => {
  const { pseudo } = useParams();

  const isUser = pseudoMessage === pseudo;

  if (isUser) {
    return <p className="user-message">{message}</p>;
  } else {
    return (
      <p className="not-user-message">
        <strong>{pseudoMessage}</strong>: {message}
      </p>
    );
  }
};
export default Messages;
