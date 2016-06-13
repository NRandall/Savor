var expect = require('chai').expect;
var io = require('socket.io-client')
var handler = require('../../../server/handlers/handlers.js');

describe('Server Side Unit Test', function() {
  describe('Test for Test', function() {
    it('should pass', function() {
      expect(true).to.equal(true);
    });
  });

  describe('queryRefiner', function() {

  });
});

describe('Socket.io Unit Test', function () {
  var socket;
  var url = 'http://localhost:4000';
  var options = {
    'reconnection': true,
    'reconnectionDelay' : 0,
    'force new connection' : true
  }

  beforeEach(function () {
    socket = io(url, options);
  });

  afterEach(function () {
    socket.disconnect();
  });

  describe('Test for Test', function () {
    it('should pass the test', function (done) {
      expect(true).to.equal(true);
      done();
    });
  });

  describe('message event', function () {
    it('should return message back with "chat msg" event when server listen "chat msg" event', function (done) {
      socket.once('connect', function() {
        socket.once('chat msg', function(msg) {
          expect(msg.username).to.equal('sb');
          expect(msg.msg).to.equal('hello');
          done();
        });

        socket.emit('chat msg', {
          username: 'sb',
          msg: 'hello'
        });
      });
    });
  });

});
