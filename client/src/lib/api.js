import axios from 'axios'

// const DOMAIN = "http://localhost:5000"; // Whatever the API domain is
const DOMAIN = "";

export async function getRandomPost() {
    const response = await axios.get(`${DOMAIN}/api/posts/random`)

    return response.data.post
}

export async function voteForPost(id, newPost) {
    return await axios.patch(`${DOMAIN}/api/posts/${id}`, newPost)
}

export async function createPost(post) {
    return await axios.post(`${DOMAIN}/api/posts`, post)
}