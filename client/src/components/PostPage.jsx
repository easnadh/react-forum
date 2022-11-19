import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "./UI/loader/Loader";

const PostPage = () => {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [fetchPostsById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getComments(id)
    setComments(response.data)
  })

  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })

  useEffect(() => {
    fetchPostsById(params.id)
    fetchComments(params.id)
  }, [])

  return <>
    {isLoading
      ? <Loader/>
      : <div><h2>{post.title}</h2><br/><h3>{post.body}</h3></div>
    }
    <div style={{marginTop: 15}}>
      comments:
      {isComLoading
        ? <Loader/>
        : <div>{comments.map(comm =>
            <p style={{marginTop: 15}}>
              <h5>{comm.email}</h5>
              {comm.body}
            </p>
          )}</div>
      }
    </div>
  </>

};

export default PostPage;