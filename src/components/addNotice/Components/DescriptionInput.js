import React from 'react';
import { useField } from 'formik';
import WordCounter from './WordCounter';

const DescriptionInput = props => {
  const [field] = useField(props.name);
  let validatedField = field.value === undefined ? '' : String(field.value).trim();
  return (
    <>
      <textarea rows="5" className="form__productDescription" {...props}></textarea>
      <WordCounter amountOfWords={validatedField.length} />
    </>
  );
};

export default DescriptionInput;
