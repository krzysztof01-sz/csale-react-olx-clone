import React from 'react';

const minDesciptionLength = 10;
const maxDescriptionLength = 500;
let wordCounterClassname = 'invalid';

const WordCounter = ({ amountOfWords }) => {
  const length = amountOfWords;

  length < minDesciptionLength || length > maxDescriptionLength
    ? (wordCounterClassname = 'invalid')
    : (wordCounterClassname = 'valid');

  return (
    <div className={`form__wordCounter form__wordCounter-${wordCounterClassname}`}>Characters: {amountOfWords}/500</div>
  );
};

export default WordCounter;
