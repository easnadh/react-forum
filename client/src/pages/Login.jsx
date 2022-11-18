import React from "react"
import {Form as FinalForm, Field} from 'react-final-form'
import {Link, useNavigate} from "react-router-dom"
import styles from '../styles/Error.module.css'
import MyInput from "../components/UI/input/MyInput"
import MyButton from "../components/UI/button/MyButton"


const required = (value) => (value ? undefined : "Это поле не может быть пустым")

export default function LoginForm() {
  const navigate = useNavigate();
  const onSubmit = (values) => {
    // отправка данных на сервер
    if(values.login === "admin" && values.password === "123") {
      navigate("/");
      // const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      //   e.preventDefault();
      //   navigate("/");
      // };
    }
    console.log(values);
  };



  return <>
    <FinalForm
        onSubmit={onSubmit}
        render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <h2>Авторизация</h2>
              <Field name="login" validate={required}>
                {({input, meta}) => (
                    <div>
                      <MyInput type="text" {...input} placeholder="Логин"/>
                      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </div>
                )}
              </Field>
              <Field name="password" validate={required}>
                {({input, meta}) => (
                    <div>
                      <MyInput type="password" {...input} placeholder="Пароль"/>
                      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </div>
                )}
              </Field>
              <MyButton type="submit" className="btn btn-primary">Войти</MyButton>
            </form>
        )}>
    </FinalForm>
    <Link to="/reg">Зарегистрироваться</Link>
  </>;
}