import validator from 'validator'

export const userValidation = (authType = 'signIn', user) => {
    if(authType === 'signUp') {
        const { firstName, lastName, email, password } = user
        let verifiedEmail = validator.isEmail(email)
        if( firstName.length < 3 || lastName.length < 3 || verifiedEmail===false || password.length < 5){
            return false
        }else return true
    }  else if( authType === 'signIn') {
        const { email, password } = user
        let verifiedEmail = validator.isEmail(email)
        if( verifiedEmail===false || password.length < 5){
            return false
        }else return true
    }
}