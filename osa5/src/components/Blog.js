import React, {useState} from 'react'
import './component.css'


const Toggle = ({ blog, handleLike, handleDelete, user }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    return (
        <div className='blog'>
            <div className = 'unformal' style={hideWhenVisible} >
                {blog.title}, {blog.author} <button id= 'view-blog' onClick={toggleVisibility}> view </button>
            </div>
            <div className = 'formal' style={showWhenVisible} >
                {blog.title}, {blog.author} <button id='hide-blog' onClick={toggleVisibility}> hide </button>
                <p>{blog.url}</p>
                <p>
                    {blog.likes}:likes
                    <button id='like-blog' onClick={({ target }) => handleLike(blog)}>like</button>
                </p>
                <p> {blog.user.name}</p>
                {blog.user.username === user.username && 
                <p><button id='delete-blog' onClick={({ target }) => handleDelete(blog)}>Delete blog</button></p>
                }
            </div>
        </div>

    )

}
const Blog = ({ blog, handleLike, handleDelete, user }) => {
    // TOGGLABLE EI OLE SOPIVA RATKAISU VAIN PLACEHOLDER
    return (
        <>
            <Toggle blog = {blog} user={user} handleLike={handleLike} handleDelete={handleDelete}/>
        </>
    )
}


export default Blog