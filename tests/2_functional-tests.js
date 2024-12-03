const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const translator = new Translator();

suite('Functional Tests', () => {
    test('Translation with text and locale fields filled in', function(done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({ text:'Mangoes are my favorite fruit.', locale:'american-to-british' })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.property(res.body, 'text')
            assert.equal(res.body.text, 'Mangoes are my favorite fruit.');
            assert.property(res.body, 'translation')
            assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
            done();
        })
    })
    test('Correct error thrown with invalid locale', function(done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({ text:'Mangoes are my favorite fruit.', locale:'american-to-french' })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.property(res.body, 'error')
            assert.equal(res.body.error, 'Invalid value for locale field');
            done();
        })
    })
    test('Correct error thrown with missing text', function(done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({ locale:'american-to-british' })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.property(res.body, 'error')
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
        })
    })
    test('Correct error thrown with missing locale', function(done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({ text:'Mangoes are my favorite fruit.' })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.property(res.body, 'error')
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
        })
    })
    test('Correct error thrown with empty text', function(done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({ text:'',locale:'american-to-british' })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.property(res.body, 'error')
            assert.equal(res.body.error, 'No text to translate');
            done();
        })
    })
    test('Translation with text and locale fields filled in', function(done) {
        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send({ text:'Mangoes are my favourite fruit.', locale:'american-to-british' })
            .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.property(res.body, 'text')
            assert.equal(res.body.text, 'Mangoes are my favourite fruit.');
            assert.property(res.body, 'translation')
            assert.equal(res.body.translation, 'Everything looks good to me!')
            done();
        })
    })
})
