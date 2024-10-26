const express = require('express')
const app = express()

const userModel = require('./models/user')
const postModel = require('./models/post')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/create', async (req, res) => {
    let user = await userModel.create({
        username : 'mosshead',
        age : 17 ,
        email: 'shivangbhaiisgreat@gmail.com'
    })
    res.send(user)
})

app.get('/post/create', async (req, res) => {
    let post = await postModel.create({
        postdata : "hello , how are y'all",
        user : '671cb7943f766f7e835fe0c1',
    })

    let user = await userModel.findOne({_id : '671cb7943f766f7e835fe0c1' })
    user.posts.push(post._id)
    await user.save();

    res.send({post , user})
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})