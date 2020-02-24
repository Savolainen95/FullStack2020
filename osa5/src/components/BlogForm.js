import React from 'react'
import '../App.css'



const BlogForm = ({
    handleBlog,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl
}) => {

    return (
        <>
            <div className= 'formDiv'>
                <form onSubmit={handleBlog}>
                    <div>
                        title
                        <input
                            id='title'
                            value={title}
                            name="Title"
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        author
                        <input
                            id='author'
                            value={author}
                            name="Author"
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        url
                        <input
                            id='url'
                            type='text'
                            value={url}
                            name="Url"
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                    <button id= 'create-blog' type="submit">create</button>
                </form>
            </div>
        </>
    )
}

export default BlogForm