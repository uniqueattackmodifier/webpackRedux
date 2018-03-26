const express = require('express')
const path = require('path')
const app = express()

//middleware to define folder for static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})



const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
  console.log(`running server on port ${PORT}`)
})