const { Router } = require('express')
const router = Router()
const {
    signUp,
    signIn,
    signOut,
    unVerifiedAdmins,
    adminVerification,
    getAllUserData,
    getUploadedFiles,
    uploadFiles,
    getUser,
    getParticularUser
} = require('../controllers/userControllers')
const {
    verifyToken, verifyAdmin
} = require('../middlewares/authenticate');
const upload = require('../utils/multer');

// user requests
router.post('/signUp', signUp)
router.post('/signIn', verifyAdmin, signIn)
router.delete('/signOut', verifyToken, signOut)
router.get('/getUploadedFiles', verifyToken, getUploadedFiles)
router.post('/uploadFile', verifyToken, upload.array('files', 10), uploadFiles)
router.get('/getUser', verifyToken, getUser)
router.get('/getParticularUser/:userId', verifyToken, getParticularUser)

router.get('/admin/unVerified', verifyToken, unVerifiedAdmins)
router.post('/admin/verifyAdmin/:userId', verifyToken , adminVerification)
router.get('/getAllFiles', verifyToken, getAllUserData)

module.exports = router