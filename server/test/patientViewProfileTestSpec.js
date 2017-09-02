const should = require('chai').should();
const supertest = require('supertest');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const app = require('../../bin/www');
const patients = require('../patients/patientEntity').patient;
const url = supertest('http://localhost:8080/users');

describe('Testing Maxapp',()=>{
  it(' patient should be able to view his profile',(done)=>{
    var patientMock = sinon.mock(patients);
    var expectedResult = {status:true};
    patientMock.expects('find').yields(null, expectedResult);
    patients.find(function(err,result){
      patientMock.verify();
      patientMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });
});
