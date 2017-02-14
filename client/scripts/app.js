// YOUR CODE HERE:

class App {

  constructor() {
    this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
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
          var msg = { username: '', text: '', roomname: ''};
          msg.username = data.results[index].username;
          msg.text = data.results[index].text;
          msg.roomname = data.results[index].roomname;
          app.renderMessage(msg);
          app.renderRoom(msg.roomname);
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
    $('#main').append('<div class="username">' + message.username + '</div>');
    $('#main').find('.username').on('click', function(){
      app.handleUsernameClick();
    });
    $('#chats').append("<div class='chat'>" + message.text + '</div>');
  }

  renderRoom(string) {
    var exists = ($('#roomSelect option[value=' + string + ']').length !== 0);
    if (!exists) {
      $('#roomSelect').append('<option value="' + string + '">' + string + '</option>');
      $('#roomSelect').change(function() {
        var room = $(this).val();
        alert(room);
        // call a function that filters the chat by selected room
      });
    }
  }

  handleUsernameClick() {
    console.log('handleUsernameClick called');
  }

  handleSubmit(){
    console.log('handleSubmit called');
  }

};

let app = new App;

//   JQUERY DOCUMENT ------------------
$(document).ready(function() { 

  app.init(); 

  $('#send .submit').on('submit', function(){
    console.log('i am clicked');
    app.handleSubmit();
  });

  $('body').append("<div class='chat'></div>");
  console.log($('#main .username'));
  $('.chat').append($(".username").find('div').text() + " " + $("#chats").text());

});