import React, {useEffect} from "react";
import {useState} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService, {API} from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import Loader from "../components/UI/loader/Loader";

function Posts() {

  // получение авторизации
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [isLogged, setLogged] = useState(false);
  useEffect(() =>{
    const userRequest = async () => {
      setLogged(false);
      setResult("")
      setError("")
      try {
        const user = await API.user.getCurrentUser();
        setResult(`welcome home, ${user.login}`)
        setLogged(true);
      } catch (e) {
        if(e instanceof Error) {
          setError(e.message)
        }
      }
    }
    userRequest()
  },[])

  // загрузка постов
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)

  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [])


  const createPost = async (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
    try {
      await API.post.createCurrentPost(newPost);
      console.log("пост создан")
    } catch (e) {
      if(e instanceof Error) {
        setError(e.message)
      }
    }
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  const handleLogout = () => {
    const logoutRequest = async () => {
      try {
        await API.auth.logout();
        setLogged(false);
        setResult("");
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }
    logoutRequest()
  }

  return <>
    {result && <>{result}</>}
    {error && <>{error}</>}
    {isLogged && <MyButton onClick={handleLogout}>Выйти</MyButton>}
      <div className="App">
        <br/>
        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
          Create post
        </MyButton>

        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
        </MyModal>

        <hr style={{margin: '15px 0'}}/>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        {postError && <h2>Error ${postError}</h2>}
        {isPostsLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader /></div>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="forum"/>
        }

        <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
      </div>
    </>
}

export default Posts;