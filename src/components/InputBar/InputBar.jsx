/* eslint-disable react/prop-types */
const InputBar = ({ str, placeholder, value, func }) => {
  return (
    <input
      autoComplete={str}
      id={str}
      type={str}
      placeholder={placeholder}
      value={value}
      onChange={func}
    />
  );
};

export default InputBar;
