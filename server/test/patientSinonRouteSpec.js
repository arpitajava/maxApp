// const should = require('chai').should();
// const supertest = require('supertest');
// const sinon = require('sinon');
// const sinonMongoose = require('sinon-mongoose');
// const expect = require('chai').expect;
// const app = require('../../bin/www');
// const patients = require('../patients/patientEntity').patient;
// const url = supertest('http://localhost:4200/patients');
//
// describe('Patients CRUD Testing using sinon',()=>{
//
//       it('should get a Single Patient',(done)=>{
//             var patientMock = sinon.mock(patients);
//             var expectedResult = {status:true};
//             var a = '5996e6ffe1978f1d6003a390';
//             patients.find({PatientID:"PA3"}, function(err,doc){
//               patientMock.verify();
//                 patientMock.restore();
//                 // expect(doc.status).to.be.true;
//                 doc[0].Gender.should.equal('Female');
//             // done();
//           });
//       });
//       it('should get All the Patients',(done)=>{
//           var patientMock = sinon.mock(patients);
//           var expectedResult = {status:true};
//           patientMock.expects('find').yields(null, expectedResult);
//           patients.find(function(err,result){
//             patientMock.verify();
//             patientMock.restore();
//             expect(result.status).to.be.true;
//             done();
//           });
//     });
//     it('should add the user', (done) => {
//         var patientMock = sinon.mock(new patients({AppointmentRecord:[],ProfilePhoto:"",ContactNumber:"9988776655",Address:"vivekanandhar street, Dubai Cross Road, Near Dubai Bus stand, Dubai",Gender:"Male",DateOfBirth:"10/10/1994",Age:23,LastName:"Priya", FirstName:"Keerthana", PatientID:"PA1000"}));
//         var patientObj = patientMock.object;
//         var expectedResult = {
//             status: true
//         };
//         patientMock.expects('save').yields(null, expectedResult);
//         patientObj.save(function(err, result) {
//             patientMock.verify();
//             patientMock.restore();
//             expect(result.status).to.be.true;
//             done();
//         });
//     });
//
//      // Test will pass if the user is not updated based on an ID
//       it("should update a patient by id", function(done){
//                var patientMock = sinon.mock(patients({Age:22}));
//                var patient = patientMock.object;
//                var expectedResult = { status: true };
//                patientMock.expects('update').yields(null, expectedResult);
//                patient.update({FirstName:'Madhu'},function (err, result) {
//                    patientMock.verify();
//                    patientMock.restore();
//                    console.log(result);
//                    expect(result.status).to.be.true;
//                    done();
//                });
//            });
//
//            it("should delete a patient by id", function(done){
//                       var patientMock = sinon.mock(patients);
//                       var expectedResult = { status: true };
//                       patientMock.expects('remove').withArgs({Gender:'Male'}).yields(null, expectedResult);
//                       patients.remove({Gender:'Male'}, function (err, result) {
//                           patientMock.verify();
//                           patientMock.restore();
//                           expect(result.status).to.be.true;
//                           done();
//                       });
//                   });
//   });
