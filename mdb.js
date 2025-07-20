const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://thanubabyrun:7cEyR8Jcj8lxpU6j@cricketdb.qconh5q.mongodb.net/cricketdb?retryWrites=true&w=majority&appName=cricketdb")
.then(() => {
    console.log("connection success !")
})
.catch(() => {
    console.log("mongo connection failed")
})

module.exports = mongoose;