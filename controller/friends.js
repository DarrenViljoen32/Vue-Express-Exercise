import bcrypt from 'bcrypt'
import {getFriends, getFriend, addFriend, editFriend, deleteFriend, addUser} from '../models/database.js'
export default { 
    
    getMany: async (req,res)=>{
        res.send(await getFriends())
        },

    addFriend: async (req,res)=>{
            const {name,age} = req.body
            const post = await addFriend(name,age)
            res.send(await getFriends())
            },

    getFriend: async (req,res)=>{
        res.send(await getFriend(+req.params.id))
        },

    deleteFriend: async (req,res)=>{
        await deleteFriend(req.params.name)
        console.log(req.params.name);
        res.send(await deleteFriend(req.params.name))
        },

    editFriend: async (req,res)=>{
        const [friend] = await getFriend(+req.params.id)
        let {name,age} = req.body
        name ? name = name: {name} = friend
        age ? age = age: {age} = friend
        console.log(friend);
        await editFriend(name,age,+req.params.id) 
        res.json(await getFriends())
        },

    // addUser: async (req,res)=>{
    //     const {userName, password} = req.body
    //     bcrypt.hash(password, 10, async(err,hash)=>{
    //         if(err) throw err
    //         await addUser(userName,hash)
    //         res.send({
    //             msg: "You have created an account."
    //         })  
    //     })
    // }
}  