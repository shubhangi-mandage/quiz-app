
const Quiz = require('../models/quizModel');
const Answer = require('../models/answerModel');

// Create Quiz
const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    if (!title || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'Invalid data' });
    }
    const quiz = new Quiz({ title, questions });
    await quiz.save();
    res.status(201).json({ id: quiz._id, title: quiz.title });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Quiz
const getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    const questions = quiz.questions.map(({ _id, text, options }) => ({
      id: _id,
      text,
      options
    }));
    res.status(200).json({ id: quiz._id, title: quiz.title, questions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Submit Answer
const submitAnswer = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { selected_option } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    const question = quiz.questions.id(questionId);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    const is_correct = selected_option === question.correct_option;
    const answer = new Answer({
      quiz_id: quizId,
      question_id: questionId,
      selected_option,
      is_correct
    });
    await answer.save();
    res.status(200).json({
      question_id: questionId,
      is_correct,
      correct_option: is_correct ? undefined : question.correct_option
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Results
const getResults = async (req, res) => {
  try {
    const { quizId } = req.params;
    const answers = await Answer.find({ quiz_id: quizId });
    if (!answers || answers.length === 0) {
      return res.status(404).json({ error: 'No results found' });
    }
    const score = answers.filter((a) => a.is_correct).length;
    res.status(200).json({
      quiz_id: quizId,
      score,
      answers
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createQuiz, getQuiz, submitAnswer, getResults };
    