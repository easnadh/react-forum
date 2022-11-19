import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {
  const navigate = useNavigate()
  return <>
    <div className="post">
      <div className="post__content">
        <strong>{props.post.title}</strong>
        <div>
          {props.post.body}
        </div>
        <div style={{color: "grey", fontSize: 14}}>
          {props.post.date}
        </div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => navigate(`/${props.post.id}`)}>
          Open
        </MyButton>
        <MyButton onClick={() => props.remove(props.post)}>
          Delete
        </MyButton>
      </div>
    </div>
  </>
};

export default PostItem;