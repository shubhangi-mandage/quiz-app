
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('Quiz API', () => {
  it('should create a new quiz', (done) => {
    chai.request(app)
      .post('/api/quizzes')
      .send({
        title: 'Sample Quiz',
        questions: [
          {
            text: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            correct_option: 1
          }
        ]
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        done();
      });
  });
});
    