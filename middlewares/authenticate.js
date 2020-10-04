const { verify } = require('jsonwebtoken');
const Users = require("../models/Users");
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const privatekey = process.env.privatekey

module.exports = {
    verifyToken : catchAsync( async (req, res, next) => {
        const token = req.headers.authorization
        if(!token) return next(new AppError('Invalid credentials', 400))
        const foundUser = await Users.findOne({accessToken : token})
        if(!foundUser) return next(new AppError('Invalid credentials', 400))
        verify(token, privatekey, (err, _)=>{
            if(err && err.name == 'JsonWebTokenError') return next(new AppError('Invalid credentials', 400))
            else if(err && err.name == 'TokenExpiredError') return next(new AppError('token expired', 400))
            next()
        })    
    }),

    verifyAdmin : catchAsync ( async (req, res, next) => {
        const foundUser = await Users.findOne({email : req.body.email})
        if(!foundUser) return next(new AppError('email not found', 400))
        else if(foundUser.type == 'admin' && !foundUser.isAdmin){
            return next(new AppError('you are yet to be verified as an admin', 400))
        }else{
            next()
        }
    })
}