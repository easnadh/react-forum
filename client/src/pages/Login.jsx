import React, {useState} from "react"
import {Form as FinalForm, Field} from 'react-final-form'
import {Link, useNavigate} from "react-router-dom"
import styles from '../styles/Error.module.css'
import MyInput from "../components/UI/input/MyInput"
import MyButton from "../components/UI/button/MyButton"
import {API} from "../API/PostService";

const required = (value) => (value ? undefined : "Это поле не может быть пустым")

export default function LoginForm() {
  const navigate = useNavigate();
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const onSubmit = (data) => {
    const authRequest = async () => {
      setResult("")
      setError("")
      try {
        await API.auth.login(data);
        setResult("'пользователь вошел', - подумал штирлиц")
        setTimeout(() => {
           navigate("/")
        }, 1000)
      } catch (e) {
        if(e instanceof Error) {
          setError(e.message)
        }
      }
    }
    authRequest()
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
    {result && <>{result}</>}
    {error && <>{error}</>}
    <Link to="/reg">Зарегистрироваться</Link>
  </>;
}