import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import itemRouter from './resources/item/item.router'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded())
app.use(morgan('dev'))

app.use('/api/item', itemRouter)
// const log = (req, res, next) => {
//     console.log('Logging')
//     next()
// }

// app.use(log)

// app.get('/data', (req, res) => {
//     res.send({message: "hello"})
// })

// app.post('/data', (req, res) => {
//     console.log(req.body)
//     res.send({...req.body,message: "Ok"})
// })

// app.get('^(me)', (req, res) => {
//     res.send({message: "your regex example, other /* :id "})
// })

// const routes = ['get /cat', 'get /cat/:id', 'post /cat', 'put /cat/:id', 'delete /cat/:id']

// router.route('/cat')
//     .get()
//     .post()

// router.route('/cat/:id')
//     .get()
//     .put()
//     .delete()

router.get('me', (req, res) => {
    res.send({me: 'hello'})
})

app.use('/api', router)

export const start = () => {
    app.listen(3000, () => {
        console.log("server is on port 3000")
    })
}