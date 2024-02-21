import mysql from 'mysql2'
import {config} from 'dotenv'

config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

const getFriends = async()=>{
    const [result] = await pool.query(`
        SELECT * 
        FROM mates
    `)
    return result  
}

const getFriend = async(id)=>{
    const [result] = await pool.query(`
        SELECT * 
        FROM mates
        WHERE id = ?
    `,[id])
    return result
}
 
const addFriend = async(name,age)=>{
    const [friend] = await pool.query(`
        INSERT INTO mates (name,age) VALUES (?,?)
    `,[name,age])
    return getFriend(friend.insertId)
}   
  
const editFriend = async(name,age,id)=>{
    const [friend] = await pool.query(`
    UPDATE mates SET name=?, age=? 
    WHERE (id=?)
    `,[name,age,id])
    return friend
} 

const deleteFriend = async(name)=>{
    const [result] = await pool.query(`
        DELETE 
        FROM mates
        WHERE name = ?
    `,[name])
    return result
}

 

const addUser = async(userName,password)=>{
    await pool.query(`
        INSERT INTO users (userName,password) VALUES (?,?)
    `,[userName,password])
}
// console.log(await addUser('Shaun','1234'));
 
const  checkUser = async (userName) =>{
    const [[{password}]] = await pool.query(`
        SELECT password FROM users WHERE userName = ?
    `,[userName])
    return password
}
// console.log(await checkUser('Connor'));

export {getFriends, getFriend, addFriend, deleteFriend, editFriend, addUser, checkUser}

