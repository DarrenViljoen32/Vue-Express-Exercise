import express from "express";
import controller from '../controller/friends.js'

const router = express.Router()



router
    .route('/')
        .get(controller.getMany)
        .post(controller.addFriend)

router
    .route('/:id')
        .get(controller.getFriend)
        .patch(controller.editFriend)
        
router
    .route('/:name')
        .delete(controller.deleteFriend)

// router
//  .route('/users')
//      .post(controller.addUser)
        

export default router