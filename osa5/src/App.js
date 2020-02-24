import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'




const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const blogFormRef = React.createRef()


  useEffect(() => {
    async function rednderBlogs() {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    rednderBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage([`welcome ${user.name}`, false])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    } catch (exception) {
      setErrorMessage(['wrong username or password', true])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    } catch (exception) {
      setErrorMessage(['wrong credentials', true])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({ title, author, url })
      blogFormRef.current.toggleVisibility()
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
      setTitle('')
      setAuthor('')
      setUrl('')
      setErrorMessage([`a new blog ${title}, by ${author}`, false])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    } catch (exception) {
      setErrorMessage(['wrong credentials', true])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLike = async (blog) => {
    const newLikes = blog.likes + 1
    const updated = {
      likes: newLikes,
    }
    await blogService.updateLikes(updated, blog.id)
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title}, by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
      setErrorMessage([`You deleted ${blog.title}, by ${blog.author}`, true])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);

    } else {
      console.log('ei poistettu')
    }

  }


  return (
    <div>
      <h1 className='head'>Blogs</h1>

      <Notification message={errorMessage} />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        /> :
        <div className= '.blogForm'>
          <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm
              handleBlog={handleBlog}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
              blogs={blogs}
              blogFormVisible={blogFormVisible}
              setBlogFormVisible={setBlogFormVisible}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user} />
          )}
        </div>
      }

    </div>
  )
}

export default App