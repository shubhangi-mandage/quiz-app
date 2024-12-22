
const express = require('express');
const router = express.Router();
const { createQuiz, getQuiz, submitAnswer, getResults } = require('../controllers/quizController');

router.post('/quizzes', createQuiz);
router.get('/quizzes/:id', getQuiz);
router.post('/quizzes/:quizId/questions/:questionId/answers', submitAnswer);
router.get('/quizzes/:quizId/results', getResults);

module.exports = router;
    