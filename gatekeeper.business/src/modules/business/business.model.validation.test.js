const expect = require('chai').expect;
const should = require('chai').should();
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
            .once('open', () => console.log('...'))
            .on('error', (error) => {
                console.warn('Error : ', error);
            });

        done();
    });

    var clean = function(){
        return new Promise(function(resolve, reject){
            mongoose.connection.collections.businesses.deleteMany({});
            resolve();
        });
    }

    beforeEach(function (done) {
        clean().then(() => done());
    });

    it('When Code is empty should have a validation error', function (done) {
        var business = new Business();

        business.validate(function (err) {
            expect(err.errors.code).to.exist;
            done();
        });
    });
    it('When Code is less than 3 chars long should have a validation error', function (done) {
        var business = new Business({ code: '12', name: 'not empty', location: 'not empty', governanceContact: 'not empty' });

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


    it('Should return a valid model when ask for find by code', async function() {
        let business001 = new Business({ code: 'CODE001', name: 'not empty', location: 'not empty', governanceContact: 'not empty' });
        let business002 = new Business({ code: 'CODE002', name: 'not empty', location: 'not empty', governanceContact: 'not empty' });

        await business001.save();
        await business002.save();

        Business.findOne({ code: 'CODE001' }, function (err, business) {
            if (err != null) {
                should.fail();
            }
            expect(business).to.exist;
            expect(business).to.be.instanceOf(Business);
        });
    });
});