import express from 'express'
import router from './router/dwitterRouter.js'

const app =express()

app.use('/dwitter',router)

app.listen(8080,()=>{
  console.log('server start')
})