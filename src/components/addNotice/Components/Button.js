import React from 'react';

const Button = ({ isDisabled, text }) => {
  return isDisabled ? (
    <button disabled className="form__button" type="submit">
      {text}
    </button>
  ) : (
    <button className="form__button" type="submit">
      {text}
    </button>
  );
};

export default Button;
