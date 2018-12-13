// import chai and other testing libraries 
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

// Configure chai before tests
chai.should();
chai.use(chaiHttp);

// Import agent and user model
const agent = chai.request.agent(app);
const User = require('../models/user');
const Company = require('../models/company');
describe('Companies', () => {

    after(() => {
        User
            .findOneAndDelete({username: 'tester'})
            .then((user) => {
                console.log('deleted user');
            })
    })
    it('should not be able to get any information about companies', (done) => {
        agent
            .get('/api/v1/companies')
            .end((err, res) => {
                res.should.have.status(403);
                done();
            })
    });

    it('Should be able to authenticate with the api', (done) => {
        agent
            .post('/auth')
            .send({ username: 'tester', password: 'leetcode' })
            .end((err, res) => {
                res.should.have.status(200);
                agent.should.have.cookie('controlAuth');
                done();
            });
    });

    it('Should be able to log out of the api', (done) => {
        agent
            .delete('/auth')
            .end((err, res) => {
                res.should.have.status(200);
                agent.should.not.have.cookie('controlAuth');
                done();
            });
    });

    it('Should be able to log in', (done) => {
        agent
            .put('/auth')
            .send({ username: 'tester', password: 'leetcode' })
            .end((err, res) => {
                res.should.have.status(200);
                agent.should.have.cookie('controlAuth');
                done();
            });
    });

    it('should be able to get companies', (done) => {
        agent
            .get('/api/v1/companies')
            .end((err, res) => {
                res.should.have.status(200);
                agent.should.have.cookie('controlAuth');
                Company
                    .find()
                    .then((companies) => {
                        res.body.should.have.length(companies.length);
                        done();
                    })
            })
    })
});
