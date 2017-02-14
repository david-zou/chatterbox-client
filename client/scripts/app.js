// YOUR CODE HERE:

class App {

  constructor() {
    this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
    this.friendList = {};
    this.roomname = 'lobby';
    this.username = '';
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
    this.fetch();
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
        $('#chats').find('.username')/*.not('.' + app.roomname)*/.hide();
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
    $('#main').append('<div class="username">' + message.username + /*'<br>' + message.text +*/ '</div>');
    $('.username').on('click', function() {
      app.handleUsernameClick();
    });
    $('#main').find('.username').hide();
    $('#chats').append('<div class="username ' + message.username + ' ' + message.roomname +'"><b>' + message.username + ':</b><br>' + message.text + '</div>');
    $('#chats').find('.' + message.username).on('click', function() {
      app.handleUsernameClick();
    });
    // $('#chats').append("<div class='chat " + message.roomname + "'>" + message.text + '</div>');
  }

  renderRoom(string) {
    var exists = ($('#roomSelect option[value=' + string + ']').length !== 0);
    if (!exists) {
      $('#roomSelect').append('<option value="' + string + '">' + string + '</option>');
      // $('#roomSelect').change(function() {
      //   var room = $(this).val();
      //   alert(room);
      //   if (room === 'create') {
      //     var newRoom = prompt('Please enter a room name.');
      //     app.renderRoom(newRoom);
      //   }

      //   this.roomname = room;
      //   // call a function that filters the chat by selected room
      //   // change user's this.room to that room
      // });
    }
  }

  handleUsernameClick() {
    console.log('handleUsernameClick called');
      // add as friend 

  }

  handleSubmit(){
    // create a message object
    // grab current user's name
    // grab current user's room
    // grab current user's message in text input field
    // package that data the object
    // invoke app.send(message object)
    console.log('handleSubmit called');
    var msg = { username: '', text: '', roomname: ''};
    msg.username = app.username;
    msg.text = $('#send').find('input').val();
    msg.roomname = app.roomname;
    app.send(msg);
  }

};

let app = new App;

//   JQUERY DOCUMENT ------------------
$(document).ready(function() { 

  app.init();

  app.username = window.location.search.slice(10);

  $('#send').submit(function(event){
    console.log('i am clicked');
    app.handleSubmit();
    event.preventDefault();
  });

  $('body').append("<div class='chat'></div>");
  console.log($('#main .username'));
  $('.chat').append($(".username").find('div').text() + " " + $("#chats").text());

  $('#roomSelect').change(function() {
    var room = $(this).val();
    if (room === 'create') {
      var newRoom = prompt('Please enter a room name.');
      app.renderRoom(newRoom);
    }
    this.roomname = room;
    // filter out the room
    $('#chats').find('.username')/*.not('.' + room)*/.hide();
    $('#chats').find('.' + room).show();
  });

});