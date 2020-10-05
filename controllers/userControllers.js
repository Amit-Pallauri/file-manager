const User = require('../models/Users')
const Files = require('../models/Files')
const bufferToString = require('../utils/bufferToString')
const cloudinary = require('../utils/cloudinary')
const { createToken } = require('../utils/createToken')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { verify } = require('jsonwebtoken')

module.exports = {
    signUp : catchAsync( async ( req, res, next )=>{
        const newUser = await User.create({...req.body})
        const token = createToken(newUser)
        newUser.accessToken = token
        await newUser.save()
        return newUser.type == 'user' 
            ?
                res.status(201).json({
                    status : 'success',
                    message : "user registered successfully.",
                    userType : 'user',
                    token : token,
                    data : newUser
                })    
            :
                res.status(201).json({
                    status : 'success',
                    userType : 'admin',
                    message : "registered successfully. Sign In after admin verifies you."
                })    
    }),

    signIn : catchAsync( async (req, res, next)=>{
            const { email, password } = req.body
            const foundUser = await User.findByEmailAndPassword(email, password)
            if(!foundUser) return next(new AppError('invalid credentials'))
            const token = createToken(foundUser)
            foundUser.accessToken = token
            await foundUser.save()
            return res.status(200).json({
                userType : foundUser.type,
                status : 'success',
                message : "logged in successfully",
                data : foundUser,
                token : token,
            })
        }),

    signOut: catchAsync( async (req, res, next)=>{
            const token = req.headers.authorization 
            const foundUser = await User.findOneAndUpdate({ accessToken: token }, { accessToken : null })
            if(!foundUser) return next(new AppError('invalid credentials', 400))
            return res.json({
                status : 'success',
                'message' : 'loggedOut successfully'
            })
    }),

    unVerifiedAdmins : catchAsync( async (req, res, next)=>{
        const foundUsers =  await User.find({type : 'admin', isAdmin : false})
        res.status(200).json({
            status : 'success',
            message : 'found requested Admins',
            data : foundUsers
        })
    }),

    adminVerification : catchAsync ( async (req, res, next) => {
        const adminReqId = req.params.userId
        const foundUser = await User.findById(adminReqId)
        if(!foundUser) return next(new AppError('invalid credentials', 400))
        const verificationStatus = JSON.parse(req.headers.verify)
        if(verificationStatus === true){
            foundUser.isAdmin = true
            await foundUser.save()
            const acceptedAdmins =  await User.find({type : 'admin', isAdmin : false})
            res.status(200).json({
                status : 'success',
                message : 'Admin accepted',
                data : acceptedAdmins
            })
        }else if(verificationStatus  === false){
            await User.deleteOne({_id : adminReqId})
            const deniedAdmins =  await User.find({type : 'admin', isAdmin : false})
            res.status(200).json({
                status: 'success',
                message : 'Admin request rejected',
                data : deniedAdmins
            })
        }
    }),
    
    getAllUserData : catchAsync( async (req, res, next)=> {
        const foundUsers = await User.find({ type : 'user', files : { $exists: true, $ne: [] }}).populate('files')
        res.status(200).json({
            status : 'success',
            message : 'found users with files',
            data : foundUsers
        })
    }),

    getUploadedFiles : catchAsync( async (req, res, next)=>{
        const userId = await verify( req.headers.authorization, process.env.privatekey )
        if(!userId) return next(new AppError('invalid credentials', 400))
        const foundFiles = await Files.find({ user : userId })
        res.status(200).json({
            status: 'success',
            message : 'found All uploaded files',
            data : foundFiles
        })
    }),
    
    uploadFiles : catchAsync( async (req, res)=>{
        const userId = await verify( req.headers.authorization, process.env.privatekey )
        const uploadedFiles = req.files
        var count = 0
        uploadedFiles.forEach( async el => {
                if(el.originalname !== undefined ){
                    const fileContent = bufferToString( el.originalname, el.buffer)
                    const name = fileContent
                    const response = await cloudinary.v2.uploader.upload(fileContent, {
                        transformation : { flags : `attachment:file`, fetch_format : 'auto'}, format : 'pdf'
                    })
                    Files.create({ fileName : el.originalname, file : response.secure_url }, (err, doc) => {
                        if(err) console.log(err)
                        User.findByIdAndUpdate( userId.id, { $push : { files : doc._id } }).then().catch(err => console.log(err))
                        count +=1
                        if(uploadedFiles.length == count){
                            User.findById(userId.id).populate('files').then( updatedUser => 
                                res.json({
                                    status :'success',
                                    message : 'file uploaded',
                                    data : updatedUser 
                                })
                            )
                        }
                    })           
                }   
        }) 
    }),

    getUser : catchAsync ( async (req, res, next) =>{
        const accessToken = req.headers.authorization
        const { id } = await verify(accessToken, process.env.privatekey)
        const foundUser = await User.findOne({_id : id }).populate('files')
        if(!foundUser) return next('Token expired. Sign In please', 400)
        res.json({
            status : 'success',
            message : 'found user',
            data : foundUser,
            userType : foundUser.type
        })
    }),

    getParticularUser : catchAsync ( async(req, res, next) => {
        const userId = req.params.userId
        const foundUser = await User.findById(userId).populate('files')
        if(!foundUser) return next(new AppError('invalid credentials', 400))
        res.json({
            status : 'success',
            message : 'found User',
            data : foundUser
        })
    })
} 
