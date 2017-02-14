// YOUR CODE HERE:

$('.chats')


 class App {
    constructor(server, room) {
      this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
      this.roomname = room;
    }
    init() {
      this.fetch();
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
        contentType: 'application/json',
        success: function (data) {
          console.log('MESSAGE RECEIVED', data);
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to fetch message', data);
        }
      });
    }
    clearMessages() {

    }
    renderMessage() {

    }
    renderRoom(string) {
      console.log('renderRoom called');
      console.log('ROOM STRING', string);
        $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.sfs.hackreactor.com/chatterbox/classes', // /messages
        type: 'PUT',
        data: string,
        contentType: 'application/json',
        success: function (data) {
          console.log('ROOM CREATED', data);
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to put room', data);
        }
      });

    }
    handleUsernameClick() {

    }
    handleSubmit(){

    }
  };

let app = new App;
console.log(app.fetch());


//   JQUERY DOCUMENT ------------------
$(document).ready(function() { 

  app.init(); 

  $('.message').on('click', function(){
    console.log('i am clicked');
  });

});