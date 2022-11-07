import React from 'react';
import classes from './myInput.module.css'

const MyInput = (props) => {
  return (
      <input className={classes.Inp} {...props} />
  );
};

export default MyInput;