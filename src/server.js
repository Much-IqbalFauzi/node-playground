import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded())
app.use(morgan())

const log = (req, res, next) => {
    console.log('Logging')
    next()
}

app.use(log)

app.get('/data', (req, res) => {
    res.send({message: "hello"})
})

app.post('/data', (req, res) => {
    console.log(req.body)
    res.send({...req.body,message: "Ok"})
})

export const start = () => {
    app.listen(3000, () => {
        console.log("server is on port 3000")
    })
}