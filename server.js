const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv');

//routes
const userRoutes = require('./routes/user_routes')
const adminRoutes = require('./routes/admin_routes')
const constantRoutes = require('./routes/constant_routes')

const app = express();
dotenv.config()
app.use(express.json())

mongoose.connect(process.env.DB).then(() => {
    console.log('Db connection open')
}).catch(err => {
    console.log(err.message, 'oops err');
});

app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/constants', constantRoutes)


app.get('/', (req, res) => {
    res.send("Covid Backend");
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`)
}
)
