import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'


const server = express()
const port = process.env.PORT || 3001


// ************************************* IMPORT ROUTERS *************************

import profileRouter from './services/model/profile/index.js'
import postRouter from './services/model/post/index.js'

// ************************************* MIDDLEWARES *****************************

server.use(cors())
server.use(express.json())


//  ****************************************** ROUTES **************************

server.use("/profiles", profileRouter)
server.use("/post", postRouter)

// ******************* MONGO CONNECTION ********************
mongoose.connect(process.env.MONGO_DB)
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!")
  
    server.listen(port, () => {
      console.table(listEndpoints(server))
      console.log(`Server running on port ${port}`)
    })
  })