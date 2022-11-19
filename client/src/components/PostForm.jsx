import React, {useState} from 'react'
import {Form as FinalForm, Field} from 'react-final-form'
import MyInput from "./UI/input/MyInput"
import MyButton from "./UI/button/MyButton"
import styles from "../styles/Error.module.css";

const required = (value) => (value ? undefined : "Это поле не может быть пустым")

const PostForm = ({create}) => {

  const newDate = new Date()
  const date = String(newDate.getDate()).padStart(2, '0') + '.' + String(newDate.getMonth() + 1)
      .padStart(2, '0') + '.' + newDate.getFullYear()
  const [post, setPost] = useState({title: '', body: '', date: date})

  const addNewPost = (e) => {
    e.preventDefault()
    const newPost = {
      ...post, id: Date.now()
    }
    if(newPost.title !== '' && newPost.body !== '') {
      create(newPost)
    }
    setPost({title: '', body: '', date: date})
  }

  return <>
    <FinalForm
        onSubmit={addNewPost}
        render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <h2>new post</h2>
              <Field name="title" validate={required}>
                {({input, meta}) => (
                    <div>
                      <MyInput
                          type="text" {...input}
                          value={post.title}
                          onChange={e => setPost({...post, title: e.target.value})}
                          placeholder="title"
                      />
                      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </div>
                )}
              </Field>
              <Field name="description" validate={required}>
                {({input, meta}) => (
                    <div>
                      <MyInput
                          type="text" {...input}
                          value={post.body}
                          onChange={e => setPost({...post, body: e.target.value})}
                          placeholder="description"
                      />
                      {meta.touched && meta.error && <div className={styles.error}>{meta.error}</div>}
                    </div>
                )}
              </Field>
              <MyButton onClick={addNewPost}>Create</MyButton>
            </form>
        )}>
    </FinalForm>

    {/*  <form>*/}
    {/*  <MyInput*/}
    {/*      value={post.title}*/}
    {/*      onChange={e => setPost({...post, title: e.target.value})}*/}
    {/*      placeholder="name"*/}
    {/*  />*/}
    {/*  <MyInput*/}
    {/*      value={post.body}*/}
    {/*      onChange={e => setPost({...post, body: e.target.value})}*/}
    {/*      placeholder="description"*/}
    {/*  />*/}
    {/*  <MyButton onClick={addNewPost}>Create</MyButton>*/}
    {/*</form>*/}
  </>
}

export default PostForm