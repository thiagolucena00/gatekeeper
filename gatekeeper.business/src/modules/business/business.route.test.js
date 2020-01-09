const expect = require('chai').expect;
const request = require('supertest');
const config = require('config');
const mongoose = require('mongoose');
const Business = require('./business.model')
const faker = require('faker');


describe('gatekeeper.business END To END Tests', function () {
    const app = require('../../../app');
    this.timeout(5000);

    before(function (done) {
        app.listen(3000, function (err) {
            if (err) { return done(err); }
            done();
        });
    });

    beforeEach((done) => {
        var clean = function () {
            return new Promise(function (resolve, reject) {
                mongoose.connection.collections.businesses.deleteMany({});
                resolve();
            });
        };
        clean().then(() => done());
    });

    after((done) => {
        mongoose.models = {};
        mongoose.modelSchemas = {};
        mongoose.connection.close();
        done();
    });

    describe('# GET /health-check', () => {
        it('health-check should return OK', (done) => {
            request(app)
                .get('/api/health-check')
                .expect(200)
                .then((res) => {
                    expect(res.text).to.equal('OK');
                    done();
                })
                .catch(e => done(e));
        });
    });

    describe('# GET api/.id', () => {
        it('When searching for a @id that do not exists should send back a HTTP Code «204» with no content.', function (done) {

            request(app)
                .get('/api/00000d776a326fb40f000001')
                .expect(204)
                .then((res) => { done(); })
                .catch((err) => { done(err) });
        });
        it('When searching for a @id that exists should send back a HTTP Code «200» with a JSON object with business data.', function (done) {
            let id = null;
            let business001 = {
                code: faker.random.alphaNumeric(10),
                name: faker.name.findName(),
                location: faker.address.streetAddress(),
                governanceContact: faker.name.findName(),
            };

            const agent = request(app);

            agent.put('/api/create')
                .send(business001)
                .expect(200)
                .then((res) => {
                    expect(res.body).to.exist;
                    expect(res.body._id).to.exist;
                    id = res.body._id;
                })
                .then(function () {
                    agent.get('/api/' + id)
                        .expect(200)
                        .then(function (res) {
                            expect(res.body).exist;
                            expect(res.body.code).to.equal(business001.code);
                            expect(res.body.name).to.equal(business001.name);
                            expect(res.body.location).to.equal(business001.location);
                            expect(res.body.governanceContact).to.equal(business001.governanceContact);
                            done();
                        })
                        .catch(err => done(err))
                })
                .catch(err => done(err));
        });
    });

    describe('# PUT /', () => {

        it('When Code is empty should send back a HTTP Code «422» and a JSON object with «must contain a Code»', function (done) {

            request(app)
                .put('/api/create')
                .set('Content-Type', 'application/json')
                .send({
                    code: '',
                    name: faker.name.findName(),
                    location: faker.address.streetAddress(),
                    governanceContact: faker.name.findName()
                })
                .expect('Content-Type', /json/)
                .expect(422, function (err, res) {
                    if (err) { return done(err); }
                    expect(res.body.errors.length).to.equal(1);
                    expect(res.body.errors[0].msg).to.equal('must contain a Code');
                    expect(res.body.errors[0].param).to.equal('code');
                    done();
                });
        });
        it('When Code has only white spaces should send back a HTTP Code «422» and a JSON object with «must contain a Code»', function (done) {
            request(app)
                .put('/api/create')
                .set('Content-Type', 'application/json')
                .send({
                    code: '             ',
                    name: faker.name.findName(),
                    location: faker.address.streetAddress(),
                    governanceContact: faker.name.findName()
                })
                .expect('Content-Type', /json/)
                .expect(422, function (err, res) {
                    if (err) { return done(err); }
                    expect(res.body.errors.length).to.equal(1);
                    expect(res.body.errors[0].msg).to.equal('must contain a Code');
                    expect(res.body.errors[0].param).to.equal('code');
                    done();
                });
        });
        it('When Code is less than 3 chars long should send back a HTTP Code «422» and a JSON object with «must be at least 3 chars long»', function (done) {
            request(app)
                .put('/api/create')
                .set('Content-Type', 'application/json')
                .send({
                    code: 'ab',
                    name: faker.name.findName(),
                    location: faker.address.streetAddress(),
                    governanceContact: faker.name.findName()
                })
                .expect('Content-Type', /json/)
                .expect(422, function (err, res) {
                    if (err) { return done(err); }
                    expect(res.body.errors.length).to.equal(1);
                    expect(res.body.errors[0].msg).to.equal('must be at least 3 chars long');
                    expect(res.body.errors[0].param).to.equal('code');
                    done();
                });
        });
        it('When Name is empty should send back a HTTP Code «422» and a JSON object with «must contain a Name', function (done) {
            request(app)
                .put('/api/create')
                .set('Content-Type', 'application/json')
                .send({
                    code: faker.random.alphaNumeric(5),
                    name: '',
                    location: faker.address.streetAddress(),
                    governanceContact: faker.name.findName()
                })
                .expect('Content-Type', /json/)
                .expect(422, function (err, res) {
                    if (err) { return done(err); }
                    expect(res.body.errors.length).to.equal(1);
                    expect(res.body.errors[0].msg).to.equal('must contain a Name');
                    expect(res.body.errors[0].param).to.equal('name');
                    done();
                });
        });
        it('When Name has only white spaces should send back a HTTP Code «422» and a JSON object with «must contain a Name', function (done) {
            request(app)
                .put('/api/create')
                .set('Content-Type', 'application/json')
                .send({
                    code: faker.random.alphaNumeric(5),
                    name: '             ',
                    location: faker.address.streetAddress(),
                    governanceContact: faker.name.findName()
                })
                .expect('Content-Type', /json/)
                .expect(422, function (err, res) {
                    if (err) { return done(err); }
                    expect(res.body.errors.length).to.equal(1);
                    expect(res.body.errors[0].msg).to.equal('must contain a Name');
                    expect(res.body.errors[0].param).to.equal('name');
                    done();
                });
        });
        it('When Location is empty should send back a HTTP Code «422» and a JSON object with «must contain a Location', function (done) {
            request(app)
                .put('/api/create')
                .set('Content-Type', 'application/json')
                .send({
                    code: faker.random.alphaNumeric(5),
                    name: faker.name.findName(),
                    location: '',
                    governanceContact: faker.name.findName()
                })
                .expect('Content-Type', /json/)
                .expect(422, function (err, res) {
                    if (err) { return done(err); }
                    expect(res.body.errors.length).to.equal(1);
                    expect(res.body.errors[0].msg).to.equal('must contain a Location');
                    expect(res.body.errors[0].param).to.equal('location');
                    done();
                });
        });
        it('When Location has only white spaces should send back a HTTP Code «422» and a JSON object with «must contain a Location', function (done) {
            request(app)
                .put('/api/create')
                .set('Content-Type', 'application/json')
                .send({
                    code: faker.random.alphaNumeric(5),
                    name: faker.name.findName(),
                    location: '        ',
                    governanceContact: faker.name.findName()
                })
                .expect('Content-Type', /json/)
                .expect(422, function (err, res) {
                    if (err) { return done(err); }
                    expect(res.body.errors.length).to.equal(1);
                    expect(res.body.errors[0].msg).to.equal('must contain a Location');
                    expect(res.body.errors[0].param).to.equal('location');
                    done();
                });
        });
        it('When GovernanceContact is empty should send back a HTTP Code «422» and a JSON object with «must contain a GovernanceContact', function (done) {
            request(app)
                .put('/api/create')
                .set('Content-Type', 'application/json')
                .send({
                    code: faker.random.alphaNumeric(5),
                    name: faker.name.findName(),
                    location: faker.address.streetAddress(),
                    governanceContact: ''
                })
                .expect('Content-Type', /json/)
                .expect(422, function (err, res) {
                    if (err) { return done(err); }
                    expect(res.body.errors.length).to.equal(1);
                    expect(res.body.errors[0].msg).to.equal('must contain a GovernanceContact');
                    expect(res.body.errors[0].param).to.equal('governanceContact');
                    done();
                });
        });
        it('When GovernanceContact has only white should send back a HTTP Code «422» and a JSON object with «must contain a GovernanceContact', function (done) {
            request(app)
                .put('/api/create')
                .set('Content-Type', 'application/json')
                .send({
                    code: faker.random.alphaNumeric(5),
                    name: faker.name.findName(),
                    location: faker.address.streetAddress(),
                    governanceContact: '             '
                })
                .expect('Content-Type', /json/)
                .expect(422, function (err, res) {
                    if (err) { return done(err); }
                    expect(res.body.errors.length).to.equal(1);
                    expect(res.body.errors[0].msg).to.equal('must contain a GovernanceContact');
                    expect(res.body.errors[0].param).to.equal('governanceContact');
                    done();
                });
        });

        it("With a valid business should send back a HTTP Code «200»", function (done) {
            let business001 = {
                code: faker.random.alphaNumeric(10),
                name: faker.name.findName(),
                location: faker.address.streetAddress(),
                governanceContact: faker.name.findName(),
            };

            request(app)
                .put('/api/create')
                .set('Content-Type', 'application/json')
                .send(business001)
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    if (err) { return done(err); }

                    expect(res.body).to.exist;
                    let business = res.body;

                    expect(business._id).to.be.not.empty;
                    expect(business.code).to.be.equal(business001.code);
                    expect(business.name).to.be.equal(business001.name);
                    expect(business.location).to.be.equal(business001.location);
                    expect(business.governanceContact).to.be.equal(business001.governanceContact);

                    done();
                });
        });
        it("When already exist a business code should send back a HTTP Code «422» and a JSON object with «exist a business with the informed 'code'»", function (done) {

            const agent = request(app);

            const code = faker.random.alphaNumeric(10);
            let business001 = {
                code: code,
                name: faker.name.findName(),
                location: faker.address.streetAddress(),
                governanceContact: faker.name.findName(),
            };
            let business002 = {
                code: code,
                name: faker.name.findName(),
                location: faker.address.streetAddress(),
                governanceContact: faker.name.findName(),
            }
            agent.put('/api/create')
                .type('json')
                .send(business001)
                .end(function () {
                    agent.put('/api/create')
                        .type('json')
                        .send(business002)
                        .expect('Content-Type', /json/)
                        .expect(422)
                        .end(function (err, res) {
                            if (err) { return done(err); }

                            expect(res.body).to.exist;
                            expect(res.body.errors.length).to.equal(1);
                            expect(res.body.errors[0].msg).to.equal('Already exist a business with the informed code');

                            done();
                        });
                });

        });

    });

});