// YOUR CODE HERE:

class App {

  constructor() {
    this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
    this.friendList = {};
    this.roomname = 'lobby';
    this.username = '';
    this.alphanum = new RegExp('^[a-zA-Z0-9 ]+$');
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
    app.clearMessages();
    // setInterval(function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: {
        'order': '-createdAt'
      },
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
        $('#chats').find('.username').hide();
        $('#chats').find('.' + app.roomname).show();
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message', data);
      }
    });
  // }, 5000);
  }

  clearMessages() {
    $('#chats').text('');
  }

  renderMessage(message) {
    message.username = this.parseEscapeCharacter(message.username);
    message.text = this.parseEscapeCharacter(message.text);
    message.roomname = this.parseEscapeCharacter(message.roomname);
    $('#main').append('<div class="username">' + message.username + '</div>');
    $('.username').on('click', function() {
      app.handleUsernameClick();
    });
    $('#main').find('.username').hide();
    $('#chats').append('<div class="username ' + message.username + ' ' + message.roomname + '"><b>' + message.username + ':</b><br>' + message.text + '</div>');
    $('#chats').find('.' + message.username).on('click', function() {
      app.handleUsernameClick();
    });
  }

  renderRoom(string) {
    string = this.parseEscapeCharacter(string);
    if (string.length === 0) {
      return;
    }
    var exists = ($('#roomSelect option[value=' + string + ']').length !== 0);
    if (!exists) {
      $('#roomSelect').append('<option value="' + string + '">' + string + '</option>');
    }
  }

  handleUsernameClick() {
    console.log('handleUsernameClick called');
      // add as friend 

  }

  handleSubmit() {
    console.log('handleSubmit called');
    var msg = { username: '', text: '', roomname: ''};
    msg.username = this.username;
    msg.text = $('#send').find('input').val();
    msg.roomname = this.roomname;
    this.send(msg);
    $('#send').find('.textfield').val('');
    this.fetch();
  }

  parseEscapeCharacter(string) {
    var stringArray = string.split('');
    var escaped = '';
    var result = '';
    for (var character = 0; character < stringArray.length; character++) {
      if (!this.alphanum.test(stringArray[character])) {
        result += escaped;
      } else {
        result += stringArray[character];
      }
    }
    return result;
  }

}

let app = new App;

//   JQUERY DOCUMENT ------------------
$(document).ready(function() { 

  app.init();

  app.username = window.location.search.slice(10);

  $('#send').submit(function(event) {
    console.log('i am clicked');
    app.handleSubmit();
    event.preventDefault();
  });

  $('#roomSelect').change(function() {
    var room = $(this).val();
    if (room === 'create') {
      var newRoom = prompt('Please enter a room name.');
      if (newRoom === null) {
        return;
      }
      app.renderRoom(newRoom);
      app.roomname = newRoom;
    } else {
      app.roomname = room;
    }
    // filter out the room
    $('#chats').find('.username').hide();
    $('#chats').find('.' + room).show();
  });

});