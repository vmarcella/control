const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

const agent = chai.request.agent(app);
const Employee = require('../models/employee');
const Company = require('../models/company');


