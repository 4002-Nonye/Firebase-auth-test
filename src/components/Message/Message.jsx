/* eslint-disable react/prop-types */
const Message = ({ message, className }) => {
  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  );
};

export default Message;
