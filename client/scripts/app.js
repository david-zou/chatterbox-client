// YOUR CODE HERE:

class App {

  constructor() {
    this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
    this.friendList = {};
    this.roomname = 'lobby';
    this.username = '';
    this.messages = [];
    this.lastMessage = 0;
    this.alphanumHTML = new RegExp('^[a-zA-Z0-9]+$');
    this.alphanumText = new RegExp('^[a-zA-Z0-9 ]+$');
  }

  init() {
    
    app.username = window.location.search.slice(10);
    this.$chats = $('#chats');
    this.$message = $('#message');
    this.$roomSelect = $('#roomSelect');
    this.$send = $('#send');

    $('#send').submit(function(event) {
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

    this.fetch();
    // setInterval(function() {
    //   app.fetch();
    // }, 3000);
  }

  send(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
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
      url: app.server,
      type: 'GET',
      data: {
        'order': '-createdAt'
      },
      contentType: 'application/json',
      success: function (data) {
        if (!data.results || !data.results.length) {
          return;
        }

        app.messages = data.results;

        var newestMessage = app.messages[app.messages.length-1];

        if (lastMessage.objectId !== newestMessage.objectId) {
          renderMessages(app.messages);
        }

        // var msg;
        
        // for (var index = 0; index < data.results.length; index++) {
        //   msg = { username: '', text: '', roomname: ''};
        //   msg.username = data.results[index].username;
        //   msg.text = data.results[index].text;
        //   msg.roomname = data.results[index].roomname;
        //   app.renderMessage(msg);
        //   app.renderRoom(msg.roomname);
        //   if (app.friendList[msg.username]) {
        //     $('.' + msg.username).addClass('friend');
        //   }
        // }

        $('#chats').find('.username').hide();
        $('#chats').find('.' + app.roomname).show();
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message', data);
      }
    });
  }

  clearMessages() {
    $('#chats').html('');
  }

  renderMessages(message) {
    
    app.clearMessages();

    for (message of app.messages) {
      renderMessage(message);
    }

  }

  renderMessage(message) {

    // var parsedNameHTML = this.parseEscapeCharacterHTML(message.username);
    // var parsedNameText = this.parseEscapeCharacterText(message.username);
    // var parsedText = this.parseEscapeCharacterText(message.text);
    // var parsedRoom = this.parseEscapeCharacterHTML(message.roomname);
    // $('#main').append('<div class="username">' + parsedNameText + '</div>');
    // $('#main').find('.username').on('click', function() {
    //   app.handleUsernameClick(parsedNameHTML);
    // });
    // $('#main').find('.username').hide();
    // $('#chats').append('<div class="username ' + parsedNameHTML + ' ' + parsedRoom + '"><b>' + parsedNameText + ':</b><br>' + parsedText + '</div>');
    // $('.username.' + parsedNameHTML).on('click', function() {
    //   app.handleUsernameClick(parsedNameHTML);
    // });

    var $chat = $('<div class="chat"/>');

    var $username = $('<span class="username">' + message.username + '</span>');
    $username.appendTo($chat);

    var $message = $('<br><span>' + message.text + '</span>');
    $message.appendTo($chat);

    app.$chats.append($chat);
  }

  renderRoom(string) {
    string = this.parseEscapeCharacterHTML(string);
    if (string.length === 0) {
      return;
    }
    var exists = ($('#roomSelect option[value="' + string + '"]').length !== 0);
    if (!exists) {
      $('#roomSelect').prepend('<option value="' + string + '">' + string + '</option>');
    }
  }

  handleUsernameClick(friend) {
    console.log('handleUsernameClick called', friend);
    if (!this.friendList[friend]) {
      this.friendList[friend] = true;
      $('.' + friend).addClass('friend');     
    }
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

  parseEscapeCharacterHTML(string) {
    var stringified;
    if (string === undefined) {
      stringified = 'undefined';
    } else if (string === null) {
      stringified = 'null';
    } else if (string === 'username' || string === '.username') {
      return 'username123';
    } else {
      stringified = string;
    }
    var stringifiedNoSpace = stringified.replace(/%20/g, '_');
    var stringToBeProcessed = stringifiedNoSpace.replace(/\./g, '');
    var stringArray = stringToBeProcessed.split('');
    var escaped = '';
    var result = '';
    for (var character = 0; character < stringArray.length; character++) {
      if (!this.alphanumHTML.test(stringArray[character])) {
        result += escaped;
      } else {
        result += stringArray[character];
      }
    }
    return result;
  }

  parseEscapeCharacterText(string) {
    var stringified;
    if (string === undefined) {
      stringified = 'undefined';
    } else if (string === null) {
      stringified = 'null';
    } else {
      stringified = JSON.stringify(string);
    }
    stringified = stringified.replace(/%20/g, ' ');
    // console.log(stringified);
    var stringArray = stringified.split('');
    var escaped = '';
    var result = '';
    for (var character = 0; character < stringArray.length; character++) {
      if (!this.alphanumText.test(stringArray[character])) {
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

});