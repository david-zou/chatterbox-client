// YOUR CODE HERE:

class App {

  constructor() {
    this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
    this.friendList = {};
    this.roomname = '';
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
    // this.fetch();
  }

  fetch() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('MESSAGE RECEIVED', data);
        // for (var index = 0; index < data.results.length; index++) {
        for (var index = data.results.length-1; index >= 0; index--) {
          var msg = { username: '', text: '', roomname: ''};
          msg.username = data.results[index].username;
          msg.text = data.results[index].text;
          msg.roomname = data.results[index].roomname;
          app.renderMessage(msg);
          app.renderRoom(msg.roomname);
          app.roomname = msg.roomname;
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
    $('#main').append('<div class="username">' + message.username + /*'<br>' + message.text +*/ '</div>');
    $/*('#main').find('.username')*/('.username').on('click', function() {
      // this should only run once per click
      app.handleUsernameClick();
    });
    $('#main').find('.username').hide();
    $('#chats').append('<div class="username ' + message.username + '">' + message.username + '<br>' + message.text + '</div>');
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
    return;
  });

  $('body').append("<div class='chat'></div>");
  console.log($('#main .username'));
  $('.chat').append($(".username").find('div').text() + " " + $("#chats").text());

  $('#roomSelect').change(function() {
    var room = $(this).val();
    alert(room);
    if (room === 'create') {
      var newRoom = prompt('Please enter a room name.');
      app.renderRoom(newRoom);
    }

    this.roomname = room;
    // call a function that filters the chat by selected room
    // change user's this.room to that room
  });

});