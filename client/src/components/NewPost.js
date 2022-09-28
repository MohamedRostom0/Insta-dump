import React, { useState } from 'react'
import { createPost } from '../lib/api'
import classes from './NewPost.module.css'

export const NewPost = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)

    const onTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const onDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const onFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault()

        let formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)
        formData.append('description', description)

        await createPost(formData)
    }

    return (
        <>
            <h2 style={{ textAlign: 'center', marginTop: 0 }}>Write your post</h2>
            <hr />
            <form className={classes.form} onSubmit={formSubmitHandler}>
                <div className={classes.col_container}>
                    <div className={classes.item}>
                        <label>Post title</label>
                    </div>
                    <div className={classes.item}>
                        <label>Post description</label>
                    </div>

                    <div className={classes.item} style={{ marginTop: 65 }}>
                        <label>Post banner</label>
                    </div>
                </div>

                <div className={classes.col_container}>
                    <div className={classes.item}>
                        <input type="text" style={{ padding: 3 }} onChange={onTitleChange} />
                    </div>
                    <div className={classes.item}>
                        <textarea rows="4" cols="42" onChange={onDescriptionChange}></textarea>
                    </div>

                    <div className={classes.item}>
                        <input type="file" n onChange={onFileChange} />
                        <input type="submit" value="Post" className='btn' style={{ fontSize: 16, padding: 10 }} />
                    </div>
                </div>
            </form>
        </>
    )
}
