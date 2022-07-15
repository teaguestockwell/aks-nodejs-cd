import express, {Application} from 'express'
import compression from 'compression'
import responseTime from 'response-time'

const app: Application = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(responseTime())
app.use(compression())

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT)
export default app