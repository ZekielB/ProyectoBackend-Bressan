import express from "express";
import { errorHandler } from "./middlewares/error-handler.js";
import {Server} from "socket.io"
import { logger } from "./middlewares/logger.js";
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views-router.js"
import productRouter from "./routes/product-router.js"

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views',`${process.cwd()}/src/views`)
app.set('view engine','handlebars')

app.use(express.static(`${process.cwd()}/src/public`))

app.use(logger)

app.use((req, res, next) => {
  console.log("HEADERS:", req.headers["content-type"])
  next()
})

app.use("/api/products", productRouter)
app.use('/', viewsRouter)

app.use(errorHandler)



const serverHttp= app.listen(8080, () => console.log("Server ok en puerto 8080"));

const io = new Server(serverHttp)
app.set("io", io)

io.on("connection", (socket) => {

  console.log("Cliente conectado")


})