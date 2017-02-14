// YOUR CODE HERE:


 class App {
    constructor() {
      this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
      // this.roomname = room;
      // this.data = [];
      
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
          for (var index = 0; index < data.results.length; index++) {
            $('#chats').append(data.results[index].text + '<br>');
          }
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to fetch message', data);
        }
      });
    }
    clearMessages() {
      $('#chats').text('');

    }
    renderMessage(message) {
      // this.fetch();
      // console.log($('#chats').text($('<div>message</div>')));
      // $mes = $('<div><</div>');
      $('#chats').append($('<div>' + message.text + '</div>'));
      $('#main').append('<div class="username">' + message.username + '</div>');
    }
    renderRoom(string) {
        // $.ajax({
        // // This is the url you should use to communicate with the parse API server.
        // url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
        // type: 'PUT',
        // data: string,
        // contentType: 'application/json',
        // success: function (data) {
        //   console.log('ROOM CREATED', data);
        $('#roomSelect').append('<li><div>' + string + '</li></div>');
      //   },
      //   error: function (data) {
      //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      //     console.error('chatterbox: Failed to put room', data);
      //   }
      // });

    }
    handleUsernameClick() {
      console.log('handleUsernameClick called')

    }
    handleSubmit(){
      // console.log('handleSubmit called');
    }
  };

let app = new App;
// console.log(app.fetch());


//   JQUERY DOCUMENT ------------------
$(document).ready(function() { 

  app.init(); 

  $('#send .submit').on('submit', function(){
    app.handleSubmit();
    // console.log('i am clicked');
  });

  $('#main').find('.username').click(function(){
    app.handleUsernameClick();
    console.log('i am clicked');
  });

  console.log($('#main').find('.username'));

});