import React from 'react'
import MyInput from "./UI/input/myInput"
import MyButton from "./UI/button/myButton"
import {useState} from "react"

const PostForm = ({create}) => {
  const [post, setPost] = useState({title: '', body: ''})

  const addNewPost = (e) => {
    e.preventDefault()
    const newPost = {
      ...post, id: Date.now()
    }
    create(newPost)
    setPost({title: '', body: ''})
  }

  return (
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
  )
}

export default PostForm