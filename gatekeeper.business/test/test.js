var expect = require('chai').expect;
var request = require('supertest');




describe('gatekeeper.business', function () {

    var express = require('express');
    var bodyParser = require('body-parser');
    const pinoInspector = require('pino-inspector')
    const pino = require('express-pino-logger')({
        level: 'error'
      });

    var app, validInput;
    this.timeout(5000);
    function createApp() {
        app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(pino);
        var businessRouter = require('../routes/business');

        app.use(businessRouter);
        return app;
    }

    before(function (done) {
        app = createApp();

        app.listen(3000, function (err) {
            if (err) { return done(err); }
            done();
        });
    });


    //TODO: maybe can return a object id after all put methods.
    it("should send back a HTTP Code «200»", function (done) {
        request(app)
            .put('/')
            .set('Content-Type', 'application/json')
            .send({ 'Code': 'not empty', 'Name': 'not empty', 'Location': 'not empty', 'GovernanceContact': 'not empty' })
            .expect('Content-Type', /json/)
            .expect(200, function (err, res) {
                if (err) { return done(err); }
                done();
            });
    });
    it('When Code is empty should send back a HTTP Code «422» and a JSON object with «must contain a Code»', function (done) {
        //act
        request(app)
            .put('/')
            .set('Content-Type', 'application/json')
            .send({ 'Code': '', 'Name': 'not empty', 'Location': 'not empty', 'GovernanceContact': 'not empty' })
            .expect('Content-Type', /json/)
            .expect(422, function (err, res) {
                if (err) { return done(err); }
                expect(res.body.errors.length).to.equal(1);
                expect(res.body.errors[0].msg).to.equal('must contain a Code');
                expect(res.body.errors[0].param).to.equal('Code');
                done();
            });
    });
    it('When Code has only white spaces should send back a HTTP Code «422» and a JSON object with «must contain a Code»', function (done) {
        //act
        request(app)
            .put('/')
            .set('Content-Type', 'application/json')
            .send({ 'Code': '   ', 'Name': 'not empty', 'Location': 'not empty', 'GovernanceContact': 'not empty' })
            .expect('Content-Type', /json/)
            .expect(422, function (err, res) {
                if (err) { return done(err); }
                expect(res.body.errors.length).to.equal(1);
                expect(res.body.errors[0].msg).to.equal('must contain a Code');
                expect(res.body.errors[0].param).to.equal('Code');
                done();
            });
    });
    it('When Code is less than 3 chars long should send back a HTTP Code «422» and a JSON object with «must be at least 3 chars long»', function (done) {
        //act
        request(app)
            .put('/')
            .set('Content-Type', 'application/json')
            .send({ 'Code': 'ab', 'Name': 'not empty', 'Location': 'not empty', 'GovernanceContact': 'not empty' })
            .expect('Content-Type', /json/)
            .expect(422, function (err, res) {
                if (err) { return done(err); }
                expect(res.body.errors.length).to.equal(1);
                expect(res.body.errors[0].msg).to.equal('must be at least 3 chars long');
                expect(res.body.errors[0].param).to.equal('Code');
                done();
            });
    });
    it('When Name is empty should send back a HTTP Code «422» and a JSON object with «must contain a Name', function (done) {
        //act
        request(app)
            .put('/')
            .set('Content-Type', 'application/json')
            .send({ 'Code': 'not empty', 'Name': '', 'Location': 'not empty', 'GovernanceContact': 'not empty' })
            .expect('Content-Type', /json/)
            .expect(422, function (err, res) {
                if (err) { return done(err); }
                expect(res.body.errors.length).to.equal(1);
                expect(res.body.errors[0].msg).to.equal('must contain a Name');
                expect(res.body.errors[0].param).to.equal('Name');
                done();
            });
    });
    it('When Name has only white spaces should send back a HTTP Code «422» and a JSON object with «must contain a Name', function (done) {
        //act
        request(app)
            .put('/')
            .set('Content-Type', 'application/json')
            .send({ 'Code': 'not empty', 'Name': '   ', 'Location': 'not empty', 'GovernanceContact': 'not empty' })
            .expect('Content-Type', /json/)
            .expect(422, function (err, res) {
                if (err) { return done(err); }
                expect(res.body.errors.length).to.equal(1);
                expect(res.body.errors[0].msg).to.equal('must contain a Name');
                expect(res.body.errors[0].param).to.equal('Name');
                done();
            });
    });
    it('When Location is empty should send back a HTTP Code «422» and a JSON object with «must contain a Location', function (done) {
        //act
        request(app)
            .put('/')
            .set('Content-Type', 'application/json')
            .send({ 'Code': 'not empty', 'Name': 'not empty', 'Location': '', 'GovernanceContact': 'not empty' })
            .expect('Content-Type', /json/)
            .expect(422, function (err, res) {
                if (err) { return done(err); }
                expect(res.body.errors.length).to.equal(1);
                expect(res.body.errors[0].msg).to.equal('must contain a Location');
                expect(res.body.errors[0].param).to.equal('Location');
                done();
            });
    });
    it('When Location has only white spaces should send back a HTTP Code «422» and a JSON object with «must contain a Location', function (done) {
        //act
        request(app)
            .put('/')
            .set('Content-Type', 'application/json')
            .send({ 'Code': 'not empty', 'Name': 'not empty', 'Location': '   ', 'GovernanceContact': 'not empty' })
            .expect('Content-Type', /json/)
            .expect(422, function (err, res) {
                if (err) { return done(err); }
                expect(res.body.errors.length).to.equal(1);
                expect(res.body.errors[0].msg).to.equal('must contain a Location');
                expect(res.body.errors[0].param).to.equal('Location');
                done();
            });
    });
    it('When GovernanceContact is empty should send back a HTTP Code «422» and a JSON object with «must contain a GovernanceContact', function (done) {
        //act
        request(app)
            .put('/')
            .set('Content-Type', 'application/json')
            .send({ 'Code': 'not empty', 'Name': 'not empty', 'Location': 'not empty', 'GovernanceContact': '' })
            .expect('Content-Type', /json/)
            .expect(422, function (err, res) {
                if (err) { return done(err); }
                expect(res.body.errors.length).to.equal(1);
                expect(res.body.errors[0].msg).to.equal('must contain a GovernanceContact');
                expect(res.body.errors[0].param).to.equal('GovernanceContact');
                done();
            });
    });
    it('When GovernanceContact has only white should send back a HTTP Code «422» and a JSON object with «must contain a GovernanceContact', function (done) {
        //act
        request(app)
            .put('/')
            .set('Content-Type', 'application/json')
            .send({ 'Code': 'not empty', 'Name': 'not empty', 'Location': 'not empty', 'GovernanceContact': '   ' })
            .expect('Content-Type', /json/)
            .expect(422, function (err, res) {
                if (err) { return done(err); }
                expect(res.body.errors.length).to.equal(1);
                expect(res.body.errors[0].msg).to.equal('must contain a GovernanceContact');
                expect(res.body.errors[0].param).to.equal('GovernanceContact');
                done();
            });
    });

    
});