const { connect } = require('mongoose')
const { mongoDbUri, mongoDbPassword} = process.env
connect(mongoDbUri.replace('<password>', mongoDbPassword), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify  : false
})
.then(_ => console.log('database connected'))
.catch(err =>console.log(err.message) )