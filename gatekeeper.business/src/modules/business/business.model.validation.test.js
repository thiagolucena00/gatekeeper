const expect = require('chai').expect;
const should = require('chai').should();
const config = require('config');
const mongoose = require('mongoose');
const faker = require('faker');

const Business = require('./business.model')

describe('gatekeeper.business Model Schema Validations', function () {

    let validBusiness = {
        code: faker.random.alphaNumeric(5),
        name: faker.name.findName(),
        location: faker.address.streetAddress(),
        governanceContact: faker.name.findName(),
    };

    before(function (done) {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.get('connectionString'), {
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


    beforeEach(function (done) {
        var clean = function () {
            return new Promise(function (resolve, reject) {
                mongoose.connection.collections.businesses.deleteMany({});
                resolve();
            });
        }
        clean().then(() => done());
    });

    it('When Code is empty should have a validation error', function (done) {
        var business = new Business(validBusiness);
        business.code = '';

        business.validate(function (err) {
            expect(err.errors.code).to.exist;
            done();
        });
    });
    it('When Code is less than 3 chars long should have a validation error', function (done) {
        var business = new Business(validBusiness);
        business.code = '12';
        business.validate(function (err) {
            expect(err.errors.code).to.exist;
            done();
        });
    });
    it('When Name is empty should have a validation error', function (done) {
        var business = new Business(validBusiness);
        business.name = '';

        business.validate(function (err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
    it('When location is empty should have a validation error', function (done) {
        var business = new Business(validBusiness);
        business.location = '';

        business.validate(function (err) {
            expect(err.errors.location).to.exist;
            done();
        });
    });
    it('When governanceContact is empty should have a validation error', function (done) {
        var business = new Business(validBusiness);
        business.governanceContact = '';

        business.validate(function (err) {
            expect(err.errors.governanceContact).to.exist;
            done();
        });
    });
    it('When required fields is not empty should NOT have a validation error', (done) => {
        var business = new Business(validBusiness);

        business.validate(function (err) {
            expect(err).to.be.null;
            done();
        });
    });


    it('Should return a valid model when ask for find by code', async function () {
        let sameCode = validBusiness.code;

        let business001 = new Business(validBusiness);
        let business002 = new Business(validBusiness);
        business002.code = sameCode;

        await business001.save();
        await business002.save();

        Business.findOne({ code: business001.code }, function (err, business) {
            if (err != null) {
                should.fail();
            }
            expect(business).to.exist;
            expect(business).to.be.instanceOf(Business);
        });
    });

    it('Should add assigns createdAt fields to your schema, the type assigned is Date.', function (done) {
        let business001 = new Business(validBusiness);

        business001.save(function (err, savedBusiness) {
            if (err) { expect().fail(); }

            expect(savedBusiness).to.exist;
            expect(savedBusiness).to.be.instanceOf(Business);
            expect(savedBusiness.created_at).to.exist;

            done();
        });
    });
});