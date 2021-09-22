import { useParams } from "react-router-dom";

const Messages = ({ message }) => {
  const { pseudo } = useParams();
  return (
    <p className="user-message">
      {pseudo} : {message}
    </p>
  );
};
export default Messages;
