import React from "react"
import {Form as FinalForm, Field} from 'react-final-form'
import {isValidLogin, isValidPassword} from "../utils/validators"
import {Link} from "react-router-dom"
import styles from '../styles/Error.module.css'
import MyInput from "../components/UI/input/MyInput"
import MyButton from "../components/UI/button/MyButton"


const isValid = (values) => {
  const errors = {}

  if (!isValidLogin(values?.login) || !isValidPassword(values?.password)) {
    errors.login = "Логин и пароль должны содержать от 6 до 20 символов латинского алфавита и/или цифры.";
  }

  if (!values?.login) {
    errors.login = "Логин не может быть пустым.";
  }


  if (!values?.password) {
    errors.password = "Пароль не может быть пустым.";
  }

  if (values?.password !== values?.passwordCheck) {
    errors.passwordCheck = "Пароли не совпадают.";
  }

  return errors;
};

export default function Registration() {

  const onSubmit = (values) => {
    // отправка данных на сервер
    console.log(values);
  };

  return <>
    <FinalForm
        onSubmit={onSubmit}
        validate={isValid}
        render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <h2>Регистрация</h2>
              <Field name="login">
                {({input, meta}) => (
                    <div>
                      <MyInput type="text" {...input} placeholder="Логин"/>
                      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </div>
                )}
              </Field>
              <Field name="password">
                {({input, meta}) => (
                    <div>
                      <MyInput type="password" {...input} placeholder="Пароль"/>
                      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </div>
                )}
              </Field>
              <Field name="passwordCheck">
                {({input, meta}) => (
                    <div>
                      <MyInput type="password" {...input} placeholder="Повторите пароль"/>
                      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </div>
                )}
              </Field>
              <MyButton type="submit">Зарегистрироваться</MyButton>
            </form>
        )}>
    </FinalForm>
    <Link to="/login">Войти</Link>
  </>;
}