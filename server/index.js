const express = require("express")
const app = express()
const cors = require('./config/cors')
const appRoute = require('./routes/Routes')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(cors)
app.use("/", appRoute)
app.listen(8080,()=>{
    console.log("server connected onm 8080");
})
