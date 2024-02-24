const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  question: String,
  answertype: String,
  options: Array,
});

const FormModel = mongoose.model('FormModel', formSchema);

module.exports = FormModel;
