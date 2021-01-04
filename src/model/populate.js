const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const Schema = mongoose.Schema;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});




const PersonModel = mongoose.model('Person', personSchema);
const author = new PersonModel({
    _id: new mongoose.Types.ObjectId(),
    name: 'Ian Fleming',
    age: 50,
    
  },{
    _id: new mongoose.Types.ObjectId(),
    name: 'Ian Huy',
    age: 22
  });
  
  author.save(function (err) {
        
  });


//   Story.
//   findOne({ title: 'Casino Royale' }).
//   populate('author').
//   exec(function (err, story) {
//     if (err) return handleError(err);
//     console.log('The author is %s', Story);
//     // prints "The author is Ian Fleming"
//   });