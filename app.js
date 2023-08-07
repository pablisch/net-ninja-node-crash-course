const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { username, password } = require('./config');
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = `mongodb+srv://${username}:${password}@cluster0.b9ekjnc.mongodb.net/net-ninja-node-course`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // parses url-encoded data
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});


const mongoose = require('mongoose');
const moment = require('moment'); // Assuming you have the moment library for date manipulation

const Children = require('./childrenSchema');
const RegisterEntries = require('./registerEntriesSchema');

// Assuming you have connected to the MongoDB database already

// Get today's date in the format "YYYY-MM-DD"
const todayDate = moment().format('YYYY-MM-DD');

// Find all children registered to 'Sarah Jones'
Children.find({ childminderId: 'Sarah Jones' }, (err, children) => {
  if (err) {
    console.error('Error fetching children:', err);
    return;
  }

  // Create an array of child IDs
  const childIds = children.map(child => child._id);

  // Find the register entries for the childminder 'Sarah Jones' for today
  RegisterEntries.find({
    childminderId: 'Sarah Jones',
    childId: { $in: childIds }, // looks for any and all child IDs in the childIds array
    date: todayDate,
  }, (err, registerEntries) => {
    if (err) {
      console.error('Error fetching register entries:', err);
      return;
    }

    // Create a map of child IDs to register entries for efficient lookup
    const registerMap = registerEntries.reduce((map, entry) => {
      map[entry.childId] = entry;
      return map;
    }, {});

    // Combine the information to create the register
    const register = children.map(child => ({
      name: `${child.firstName} ${child.lastName}`,
      avatar: child.avatar,
      signedInStatus: registerMap[child._id] ? registerMap[child._id].signedInStatus : false,
      signInTime: registerMap[child._id] ? registerMap[child._id].signInTime : null,
    }));

    console.log('Today\'s register for Sarah Jones:', register);
  });
});


