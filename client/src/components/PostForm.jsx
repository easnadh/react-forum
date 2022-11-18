import React, {useState} from 'react'
import MyInput from "./UI/input/MyInput"
import MyButton from "./UI/button/MyButton"

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
    create(newPost)
    setPost({title: '', body: '', date: date})
  }

  return <>
    <form>
      <MyInput
          value={post.title}
          onChange={e => setPost({...post, title: e.target.value})}
          placeholder="name"
      />
      <MyInput
          value={post.body}
          onChange={e => setPost({...post, body: e.target.value})}
          placeholder="descr"
      />
      <MyButton onClick={addNewPost}>Create</MyButton>
    </form>
  </>
}

export default PostForm