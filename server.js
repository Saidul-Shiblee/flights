require('dotenv').config( );
const express = require('express');
const app = express( );
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Flight = require('./models/flight');
const methodOverride = require('method-override')

// Delete const allFlights, if data.js is not needed to store flights data connecting to MongoDB


//Global Configuration for MongoDB 
// (Not using previous fruit/veggie Data Configuration set up)
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

mongoose.connect(mongoURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

// Connection Error/Success
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('open', ( ) => console.log('mongo connected!'));
db.on('close', ( ) => console.log('mongo disconnected'));

// Create jsxViewEngine
const jsxViewEngine = require('jsx-view-engine');

// app.set('view engine and invoke jsxEngine)
app.set('view engine', 'jsx')
app.set('views', './views');
app.engine('jsx', jsxViewEngine( ));


// Middleware
// Interface between code and database calls
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next( );
});

// the urlencoded to access req.body in Post Route
// callback function
app.use(express.urlencoded( { extended: false } ) )

//Middleware for override (edit method to work)
app.use(methodOverride('_method'));

// Index Routes
// Display all Flights Data
// Part2: MongoDB
app.get('/flights', async (req, res) => {
    try {
      const foundFlights = await Flight.find({}).sort({ departs: 'asc' })
       res.status(200).render('flights/Index', {
        flights: foundFlights,
       });
    } catch (err) {
    res.status(400).send(err)
    }   
});


// New Route
// Part2: MongoDB
app.get("/flights/new", (req, res) => {
  const newFlight = new Flight();
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('Flights/new', { departsDate });
})

// Delete Route
// Part2: MongoDB


// Update Route
// Part2: MongoDB
// #5: add a destination for that flight with arrival date/time & one of the established airport codes.
app.put('/flights/:id', async (req, res) => {
    try {
      const destination = req.body
      await Flight.findOneAndUpdate({ _id: req.params.id}, // Search criteria to find the specific flight
        { $push: { destinations: destination } }, // Use $push to add the new destination to the array
        { new: true } )
      // const foundFlight = await Flight.findById(req.params.id)
      // foundFlight.destinations.push(destination)
      // const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, foundFlight, {new: true})
        res.status(201).redirect('/flights');
    }catch(err){
        res.status(400).send(err);
    }
})


// Create Route
// Part2: MongoDB
app.post("/flights", async (req, res) => {

    try {
      if (!req.body.departs) delete req.body.departs
        const createdFlight = await Flight.create(req.body)
        res.status(201).redirect('/flights');
    } catch (err) {
        res.status(400).send(err)
    }
});


// Edit Route
// Part2: MongoDB


// Show Route
// Show selected flight
// Part2: MongoDB
app.get('/flights/:id', async (req, res) => {
    try {
      const foundFlight= await Flight.findById(req.params.id)
      res.render('flights/Show', {
        flight: foundFlight
      });
    }catch(err){
      res.status(400).send(err)
    }
  });

//   REDIRECT from root page to flights route path/CATCH ALL ROUTE
  app.get("*", (req, res) => {
    res.redirect("/flights");
  });



app.listen(PORT, ( ) =>{
    console.log(`Listening on port: ${PORT}`);
})