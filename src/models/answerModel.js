
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  question_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  selected_option: { type: Number, required: true },
  is_correct: { type: Boolean, required: true }
});

module.exports = mongoose.model('Answer', answerSchema);
    