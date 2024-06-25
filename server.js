// starting point we have taken this code from express .js
// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost: ${port}`)
// })
// end point
const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const {mergepdfs} = require('./merge')
const upload = multer({ dest: 'uploads/' })
app.use('/static',express.static('public'))
const port = 3000

app.get('/', (req, res) => {
res.sendfile(path.join(__dirname,"temp/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), function (req, res, next) {
    console.log(req.files)
    mergepdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    req.redirect("http://localhost:3000/static/merged.pdf"  )
    // res.send({data:req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })
  
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost: ${port}`)
})
