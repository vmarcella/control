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
            .catch(err => console.log(err))

        Company
            .findOneAndDelete({ name: 'Google' })
            .then((company) => {
                console.log('deleted google')
            })
            .catch(err => console.log(err))
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
                Company
                    .find()
                    .then((companies) => {
                        res.body.should.have.length(companies.length);
                        done();
                    });
            });
    });

    it('should be able to create a company', (done) => {
        agent
            .post('/api/v1/companies')
            .send({ name: 'Google', description: 'google' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.name.should.equal('Google');
                res.body.description.should.equal('google');
                done();
            });
    });

    it('should be able to update a company', (done) => {
        agent
            .put('/api/v1/companies/Google')
            .send({description: 'Gooogle'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.description.should.equal('Gooogle');
                done();
            })
    });

    it('should delete a company', (done) => {
        agent
            .delete('/api/v1/companies/Google')
            .send({name: 'Google'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.name.should.equal('Google')
                done();
            });
    });
});
