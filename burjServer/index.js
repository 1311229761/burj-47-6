const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;



const uri = "mongodb+srv://sam:131122@cluster0.u89av.mongodb.net/Burj?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookings = client.db("Burj").collection("Book");
 
  app.post('/addBooking', (req, res) => {
   const newBooking =req.body
   console.log(newBooking)

   bookings.insertOne(newBooking)
   .then(result => {
       console.log(result)
   })
  })

  app.get('/bookings', (req, res) => {
      // console.log(req.headers.Authorization)
 bookings.find({email: req.query.email})
//  
 .toArray((err, documents) => {
     res.send(documents)
 })
})

});


app.get('/', (req, res) => {
  res.send('Hello World!') 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})