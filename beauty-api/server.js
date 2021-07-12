const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { PORT } = require("./config")

//added by Kelsey
// const homePage = require("./routes/home")
// app.use("/", homePage)

const app = express()

//Obehi
app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))

//Sofia - Login and Register
app.use("/auth", authRoutes)

app.get("/", async (req, res, next) => {
  res.status(200).json({ ping: "pong" })
})
//Sofia - added in error handling
app.use((req, res, next)=>{
  return next(new NotFoundError)
})

//Obehi:  Generic error handler; anything unhandled goes here. 
app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: { message, status },
  })
})


//Obehi: Backend Port 3001
app.listen(PORT, ()=> {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})

