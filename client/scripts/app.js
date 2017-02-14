// YOUR CODE HERE:

 class App {
    constructor() {
      // this.server = '';
      // console.log('this is server', this.server);

    }
    init() {
      this.fetch();
      // console.log(fetched);
      // this.server = fetched.url;

    }
    send(message) {
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
        url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
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
// console.log(new App());

let app = new App;


//   JQUERY DOCUMENT ------------------
$(document).ready(function() { 

  app.init(); 

  // app.fetch();





});