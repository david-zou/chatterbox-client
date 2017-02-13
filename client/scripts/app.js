// YOUR CODE HERE:
$(document).ready(function() { 

    let message = {
    username: 'Tom',
    text: 'trololo',
    roomname: 'lobby'
  };

  class App {
    constructor() {

    }
    init() {

    }
    send() {
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });

    }
    fetch() {
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.sfs.hackreactor.com/chatterbox/Tom/messages',
        type: 'GET',
        // data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('MESSAGE RECEIVED', data); //chatterbox: Message sent');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });

    }
    clearMessages() {

    }
    renderMessage() {

    }
    renderRoom() {

    }
    handleUsernameClick() {

    }
    handleSubmit(){

    }
  };
console.log(typeof new App());

  let app = new App;
  app.fetch();
  app.send();

  // let message = {
  //   username: 'Tom',
  //   text: 'trololo',
  //   roomname: 'lobby'
  // };

  // $.ajax({
  //   // This is the url you should use to communicate with the parse API server.
  //   url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
  //   type: 'POST',
  //   data: JSON.stringify(message),
  //   contentType: 'application/json',
  //   success: function (data) {
  //     console.log('chatterbox: Message sent');
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to send message', data);
  //   }
  // });


  // $.ajax({
  //   // This is the url you should use to communicate with the parse API server.
  //   url: 'http://parse.sfs.hackreactor.com/chatterbox/Tom/messages',
  //   type: 'GET',
  //   // data: JSON.stringify(message),
  //   contentType: 'application/json',
  //   success: function (data) {
  //     console.log('MESSAGE RECEIVED', data); //chatterbox: Message sent');
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to send message', data);
  //   }
  // });





});