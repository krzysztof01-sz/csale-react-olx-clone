import React from 'react';

const Button = ({ isDisabled, text }) => {
  if (isDisabled) {
    return (
      <button disabled className="form__button" type="submit">
        {text}
      </button>
    );
  } else {
    return (
      <button className="form__button" type="submit">
        {text}
      </button>
    );
  }
};

export default Button;
