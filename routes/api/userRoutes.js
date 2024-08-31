const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController.js');

router.use('/').get(getUsers).post(createUser);

router.use('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.use('/:userId/friends').post(addFriend);

router.use('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;