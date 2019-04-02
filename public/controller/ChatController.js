function ChatController($scope) {

  //init socket
  var socket = io.connect();

  //socket array
  $scope.messages = [];
  $scope.roster = [];
  $scope.catalogue = [];
  
  //Input value 
  $scope.name = '';
  $scope.text = '';

  //name input
  $scope.isDisabled = false;

  $scope.send = function send() {
    console.log('Sending message:', $scope.text);
    if ($scope.name !== "") {
      socket.emit('add user', $scope.name);
      $scope.isDisabled = true;
    }else{
      $scope.isDisabled = false;
    }
    socket.emit('new message', $scope.text);
    $scope.text = '';
    
  };
  
  // $scope.setName = function setName() {
  //   if($scope.name !== "" || $scope.name != null){
  //     socket.emit('add user', $scope.name);
  //   }
  // };

  
  function addParticipantsMessage(data){
    let message = '';
    if (data.numUsers === 1) {
      message += "there's 1 participant";
    } else {
      message += "there are " + data.numUsers + " participants";
    }
    console.log(message);
  }

  //socket
  socket.on('connect', () => {
    // $scope.setName();
    console.log("a socket connected")
  });

  // Whenever the server emits 'login', log the login message
  socket.on('login', (data) => {
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', (data) => {
    console.log(data.username + ' joined');
    addParticipantsMessage(data);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('you have been disconnected');
  });

  // Reconnect
  socket.on('reconnect', () => {
    console.log('you have been reconnected');
    if (username) {
      socket.emit('add user', username);
    }
  });

  // Reconnect error
  socket.on('reconnect_error', () => {
    cosnole.log('attempt to reconnect has failed');
  });


}