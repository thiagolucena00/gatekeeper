const expect = require('chai').expect;
const config = require('config');
const mongoose = require('mongoose');

const Business = require('./business.model')

describe('gatekeeper.business Model Schema Validations', function () {

    before(function (done) {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost:27017/tests', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection
            .once('open', () => console.log('Connected!'))
            .on('error', (error) => {
                console.warn('Error : ', error);
            });

        done();
    });

    beforeEach(function (done) {
        mongoose.connection.collections.businesses.remove(() => {
            done();
        });
    });

    it('When Code is empty should have a validation error', function (done) {
        var business = new Business();

        business.validate(function (err) {
            expect(err.errors.code).to.exist;
            done();
        });
    });
    it('When Name is empty should have a validation error', function (done) {
        var business = new Business();

        business.validate(function (err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
    it('When location is empty should have a validation error', function (done) {
        var business = new Business();

        business.validate(function (err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
    it('When governanceContact is empty should have a validation error', function (done) {
        var business = new Business();

        business.validate(function (err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('When required fields is not empty should NOT have a validation error', (done) => {
        let business = new Business({ code: 'not empty', name: 'not empty', location: 'not empty', governanceContact: 'not empty' });

        business.validate(function (err) {
            expect(err).to.be.null;
            done();
        });
    });

});