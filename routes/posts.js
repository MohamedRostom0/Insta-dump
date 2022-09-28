const express = require('express')
const Post = require('../models/post')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('../common/s3')

const router = express.Router()

router.post('/', upload.single('file'), async (req, res, next) => {
    const file = req.file

    const result = await uploadFile(file)
    unlinkFile(file.path)

    const { title, description, category } = req.body

    const post = await Post.create({
        title,
        description,
        category,
        url: result.Location,
        key: result.key
    })

    res.status(200).json({ success: true, post })
})


router.get('/random', async (req, res, next) => {
    const posts = await Post.find().lean()

    const randomIdx = Math.floor(Math.random() * posts.length)
    const post = posts[randomIdx]

    res.status(200).json({ success: true, post })
})


router.get('/:key', (req, res, next) => {
    const { key } = req.params
    const readStream = getFileStream(key)

    readStream.pipe(res)
})

router.patch('/:id', async (req, res, next) => {
    const { id } = req.params
    await Post.updateOne({ _id: id }, req.body)

    return res.status(200).end()
})

module.exports = router