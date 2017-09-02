const should = require('chai').should();
const supertest = require('supertest');
const ObjId = require('mongodb').ObjectID;
const app = require('../../bin/www');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const phlebo = require('../phlebotomist/phlebotomistEntity').phlebo;
const patients = require('../patients/patientEntity').patient;
const user = require('../users/userEntity').user;
const phleboUrl = supertest('http://localhost:4200/phlebotomist');
const patientUrl = supertest('http://localhost:4200/patients');

describe('Testing Maxapp', function(err){
  it(' Patient should Be able to provide feedback', function(done){
    let PhleboID = 'PH1';
    let PatientID = 'PA3';
    let date = '25/08/2017';
    let appointmentID = 'AP35'
    let question1 = 'Yes';
    let question2 = 'No';
    let question3 = 'Yes';
    let question4 = 'Yes';
    let question5 = 'No';
    let rating = '3';
    phleboUrl
    .post('/addFeedback')
    .send({PhleboID, date, PatientID, appointmentID, question1, question2, question3, question4, question5, rating})
    .expect(200)
    .end(function(er, res){
      if (err) {
        throw done(err);
        done();
      }
      else{
        done();
      }
    });
  });
  it('should Allocate an appointment to phlebo', function(done){
    let PhleboID = 'PH1';
    let Date = '30/08/2017'
    let PatientID = 'PA2';
    let Time = '9.00-11.00';
    let AppointmentID = 'AP4';
    let PhleboName = 'Sunil';
    phleboUrl
    .post('/addAllocation')
    .send({PhleboID, Date, PatientID, Time, AppointmentID, PhleboName})
    .expect(200)
    .end(function(er, res){
      if (err) {
        throw done(err);
      }
      else{
        done();
      }
    });
  });
  it("should update a phlebo by id", function(done){
    let userMock = sinon.mock(user({Password:'Believe'}));
    let users = userMock.object;
    let expectedResult = { status: true };
    userMock.expects('update').yields(null, expectedResult);
    users.update({Username:'PA5'},function (err, result) {
      userMock.verify();
      userMock.restore();
      console.log(result);
      expect(result.status).to.be.true;
      done();
    });
  });
  it('Phelbo should be able to edit his profile', function(done){
    let PhleboID = 'PH1';
    let Password = 'Sairam';
    let Address = 'Edison lane,US';
    let ContactNumber = '9874563210';
    phleboUrl
    .post('/editPhlebo')
    .send({PhleboID, Password, Address, ContactNumber})
    .expect(200)
    .end(function(er, res){
      if (err) {
        throw done(err);
      }
      else{
        done();
      }
    });
  });
  it('Patient should be able to edit his profile', function(done){
    let PatientID = 'PA5';
    let FirstName = 'Harley';
    let LastName = 'Quin';
    let ContactNumber = '99563210';
    let DateOfBirth = '22/04/1990';
    let Gender = 'Female';
    let Address = 'Heath forever lane,US';
    patientUrl
    .post('/editProfile')
    .send({PatientID, FirstName, LastName, ContactNumber, DateOfBirth, Gender, Address})
    .expect(200)
    .end(function(er, res){
      if (err) {
        throw done(err);
      }
      else{
        done();
      }
    });
  });
  it('Phlebo should be able to Checkin', function(done){
    let phleboId = 'PH1';
    let appointmentID = 'AP4';
    let patientID = 'PA3';
    let Date1 = '25/08/2017';
    let lat = '12.9250';
    let lng = '77.5938';
    phleboUrl
    .post('/CheckInStatus')
    .send({phleboId, appointmentID, patientID, Date1, lat, lng})
    .expect(200)
    .end(function(er, res){
      if (err) {
        throw done(err);
      }
      else{
        done();
      }
    });
  });
  it('Phlebo should be able to Checkout', function(done){
    let phleboId = 'PH1';
    let appointmentID = 'AP4';
    let patientID = 'PA3';
    let Date1 = '25/08/2017';
    phleboUrl
    .post('/CheckOutStatus')
    .send({phleboId, appointmentID, patientID, Date1})
    .expect(200)
    .end(function(er, res){
      if (err) {
        throw done(err);
      }
      else{
        done();
      }
    });
  });
  it('Phlebo should be able to View his appointments', function(done){
    let PhleboID = 'PH1';
    phleboUrl
    .post('/viewPhleboAppointments')
    .send({PhleboID})
    .expect(200)
    .end(function(er, res){
      if (err) {
        throw done(err);
      }
      else{
        done();
      }
    });
  });
  it('Phlebo and coordinator must be able to send messages to patient', function(done){
    let pid = 'PA5';
    patientUrl
    .post('/sendMessage')
    .send({pid})
    .expect(200)
    .end(function(er, res){
      if (err) {
        throw done(err);
      }
      else{
        done();
      }
    });
  });
  it('Patient should be able to download his report',(done)=>{
    var patientMock = sinon.mock(patients);
    var expectedResult = {status:true};
    var a = '5996e6ffe1978f1d6003a390';
    patients.find({PatientID:"PA3"}, function(err,doc){
      patientMock.verify();
      patientMock.restore();
      expect(doc[0].AppointmentRecord[0].Report).to.be.String;
      done();
    });
  });
});
