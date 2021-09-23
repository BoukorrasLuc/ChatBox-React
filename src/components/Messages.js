const Messages = ({ message, pseudo }) => {
  return (
    <p className="user-message">
      <strong>{pseudo} : </strong>
      {message}
    </p>
  );
};
export default Messages;
