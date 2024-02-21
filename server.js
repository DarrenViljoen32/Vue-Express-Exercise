import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { addUser, checkUser, getFriends } from './models/database.js'
import friendsRouter from '../backend/routes/friends.js'
import userDetails from '../backend/routes/friends.js'
  
config();

const PORT = process.env.PORT

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials:true
})); 

app.use(express.json());
app.use(cookieParser())

app.use(express.static('../frontend/src/views/FriendsView.vue'))
app.use(express.static('../frontend/src/views/SignUpView.vue'))


// app.post('/login', (req,res)=>{

//     const {userName} = req.body

//     const token = jwt.sign(
//         {userName:userName}, 
//         process.env.SECRET_KEY,
//         {expiresIn:'1h'}
//         )

//         res.cookie('jwt', token)

//         res.json({
//             // token: token
//             msg: 'You have loggedin bra!'
//         })
// }) 

const authenticate = (req,res,next)=>{
    let {cookie} = req.headers
    let tokenInHeader = cookie && cookie.split('=')[1]
    if(tokenInHeader===null) res.sendStatus(401)
    jwt.verify(tokenInHeader, process.env.SECRET_KEY, (err,user)=>{
        //if no access
        if(err) return res.sendStatus(403)
        //access
        req.user = user
        next()
    }) 
}

// app.get('/friends', authenticate, async (req,res)=>{
//     res.send(await getFriends())
// })
app.use('/friends', friendsRouter)
// app.use('/users', userDetails)

app.post('/users',(req,res)=>{
    const {userName, password} = req.body
    bcrypt.hash(password, 10, async (err,hash)=>{
        if(err) throw err
            await addUser(userName,hash)
            res.send({
                msg: "You have successfully created an account."
            }
        )
    })
})

const auth = async (req, res, next) => {
    const {userName,password} = req.body
    const hashedPassword = await checkUser(userName) 
    bcrypt.compare(password,hashedPassword, (err,result)=>{
        if(err) throw err
        if(result === true){
            const {userName} = req.body
            const token = jwt.sign(
                {userName:userName}, 
                process.env.SECRET_KEY,
                {expiresIn:'1h'}
            )
            //true only backend user can access not frontend
            //res.cookie('jwt', token, {httpOnly:false})

            res.send({
                token: token,
                msg: 'You have logged in!'
            })
            next()
        }else{
            res.send({
                msg: 'The username or password is incorrect'
            })
        }
    })
}


app.post('/login', auth, (req,res)=>{
    // res.send({
    //     msg: 'You have logged in!'
    // })
})

// app.delete('/logout', (req,res)=>{
//     res.clearCookie('jwt')
//     res.send({
//         msg: 'You have logged out'
//     })
// })

app.listen(PORT, ()=>{  
    console.log('http://localhost:' + PORT);
}) 