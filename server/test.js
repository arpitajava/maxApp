const should = require('chai').should();
const supertest = require('supertest');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const users = require('./users/userEntity').user;
const phleboUrl = supertest('http://localhost:4200/phlebotomist');
const patientUrl = supertest('http://localhost:4200/patients');
const phlebo = require('./phlebotomist/phlebotomistEntity').phlebo;
const patients = require('./patients/patientEntity').patient;

describe('Testing Maxapp',()=>{
  it('should Login as Patient',(done)=>{
        var userMock = sinon.mock(users);
        var expectedResult = {status:true};
        users.find({Username:"PA3"}, function(err,doc){
          userMock.verify();
            userMock.restore();
            doc[0].Role.should.equal('PA');
        done();
      });
  });
  it("Patient must be able to change his password", function(done){
    let userMock = sinon.mock(users({Password:'Believe'}));
    let user = userMock.object;
    let expectedResult = { status: true };
    userMock.expects('update').yields(null, expectedResult);
    user.update({Username:'PA5'},function (err, result) {
      userMock.verify();
      userMock.restore();
      console.log(result);
      expect(result.status).to.be.true;
      done();
    });
  });
  it('coordinator should Allocate an appointment to phlebo', function(done){
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
    done();
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
    done();
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
    done();
});
it('coordinator must be able to send messages to patient', function(done){
  let pid = 'PA5';
  patientUrl
  .post('/sendMessage')
  .send({pid})
  .expect(200)
  done();
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
  done();
});
it('should fix appointment as Callcenter', function(done){
    let PatientID = 'PA7';
    let AppointmentID = 'AP12';
    let PreferredTime =  '09:00-11-00';
    let PreferredDate = '10/09/2017';
    patientUrl
    .post('/addAppointment')
    .send({PatientID, AppointmentID, PreferredTime, PreferredDate})
    .expect(200)
    .end(function(er, res){
        done();
    });
  });
it('should add Patient as CallCenter', (done) => {
        var patientMock = sinon.mock(new patients({AppointmentRecord:[],ProfilePhoto:"",ContactNumber:"9988776655",Address:"vivekanandhar street, Dubai Cross Road, Near Dubai Bus stand, Dubai",Gender:"Male",DateOfBirth:"10/10/1994",Age:23,LastName:"Priya", FirstName:"Keerthana", PatientID:"PA1000"}));
        var patientObj = patientMock.object;
        var expectedResult = {
            status: true
        };
        patientMock.expects('save').yields(null, expectedResult);
        patientObj.save(function(err, result) {
            patientMock.verify();
            patientMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    it('should Cancel an appointment as Callcenter', function(done){
        let PatientID = 'PA6';
        let AppointmentID = 'AP7';
        let PhleboID = 'PH1'
        patientUrl
        .post('/cancelAppointment')
        .send({PhleboID, PatientID, AppointmentID})
        .expect(200)
        .end(function(er, res){
            done();
        });
      });
    it('should DeAllocate Phlebotomist for a particular appointment as Coordinator', function(done){
      let phleboId = 'PH1';
      let appointmentID = 'AP7';
      let patientID = 'PA6';
      let Date1= '04/09/2017';
          phleboUrl
          .post('/cancelPhlebo')
          .send({patientID, appointmentID, phleboId, Date1})
          .expect(200)
          .end(function(er, res){
              done();
          });
        });
      it('should Reshedule an appointment as Callcenter', function(done){
          let PatientID = 'PA6';
          let AppointmentID = 'AP7';
          let PhleboID = 'PH1';
          let date = '04/09/2017';
          let time = '14:00-16:00';
          patientUrl
          .post('/reScheduleAppointment')
          .send({PhleboID, PatientID, AppointmentID, date, time})
          .expect(200)
          .end(function(er, res){
              done();
          });
        });
      it('should get list appointment as Coordinator', function(done){
          patientUrl
          .get('/viewPatients')
          .expect(200)
          .end(function(er, res){
              done();
          });
        });
      it('should get a Phlebo Location as Coordinator',(done)=>{
                  var phleboMock = sinon.mock(phlebo);
                  var expectedResult = {status:true};
                  var a = '5996e6ffe1978f1d6003a390';
                  phlebo.find({PhleboID:"PH1"}, function(err,doc){
                    phleboMock.verify();
                      phleboMock.restore();
                      expect(doc[0].Location.Latitude).to.be.String;
                      expect(doc[0].Location.Longitude).to.be.String;
                  done();
                });
            });
            it('should view patient Details as CallCenter', function(done){
                patientUrl
                .get('/viewPatients')
                .expect(200)
                .end(function(er, res){
                    done();
                });
              });
            it('should view Phlebotomist Details as Coordinator', function(done){
                phleboUrl
                .get('/viewPhlebo')
                .expect(200)
                .end(function(er, res){
                    done();
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
              done();
              });
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
              it('Phlebo must be able to send messages to patient', function(done){
                let pid = 'PA5';
                patientUrl
                .post('/sendMessage')
                .send({pid})
                .expect(200)
                done();
              });
              it('Phlebo should be able to View his appointments', function(done){
                let PhleboID = 'PH1';
                phleboUrl
                .post('/viewPhleboAppointments')
                .send({PhleboID})
                .expect(200)
                done();
              });
              it('phlebo should be able to allocate an appointment to himself/herself', function(done){
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
                done();
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
                done();
              });
});
