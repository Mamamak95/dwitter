import express from 'express'
import router from './router/dwitter.js'

const app =express()

app.use('/dwitter',router)

app.listen(8080,()=>{
  console.log('server start')
})