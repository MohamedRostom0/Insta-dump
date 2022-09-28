import { useCallback, useEffect, useState } from 'react'
import { getRandomPost, voteForPost } from '../lib/api'
import classes from './PostCard.module.css'

export const PostCard = () => {
    const [randomPost, setRandomPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [vote, setVote] = useState(0)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        const post = await getRandomPost();

        setVote(0)
        setRandomPost(post)
        setIsLoading(false)
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const upvoteHandler = () => {
        setVote(1)
    }

    const downvoteHadler = () => {
        setVote(-1)
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        setIsLoading(true)
        await voteForPost(randomPost._id, { votes: randomPost.votes + vote })

        setRandomPost(null)
        setVote(0)

        fetchData()
        setIsLoading(false)
    }

    return (
        <>
            {isLoading && <div className={classes.spinner}></div>}
            {randomPost && <div className={classes.card}>
                <div className={classes.heading}>
                    <h1 style={{ marginBottom: 10 }}>{randomPost.title}</h1>
                    <p style={{ fontSize: 12, color: 'gray', marginTop: 0 }}>Posted on Feburary 15, 2022</p>
                </div>

                <div className={classes.container}>
                    <img className={classes.image} src={randomPost.url} alt=''></img>
                </div>
                <p>{randomPost.description}</p>

                <hr />
                <div className={classes.actions}>
                    <div>
                        <button className={`success-btn ${vote === 1 ? 'success-btn-selected' : ''}`} onClick={upvoteHandler}>Upvote</button>
                        <button className={`del-btn ${vote === -1 ? 'del-btn-selected' : ''}`} onClick={downvoteHadler}>DownVote</button>
                        <p style={{ margin: 10, fontSize: 20 }}>Votes: {randomPost.votes + vote}</p>
                    </div>

                    <form onSubmit={submitHandler}>
                        <button style={{ height: 50 }} className='btn'>Next post</button>
                    </form>
                </div>
            </div>}
        </>
    )
}
