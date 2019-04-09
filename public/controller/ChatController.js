function ChatController($scope) {

  //init socket
  var socket = io.connect();

  //socket array
  $scope.messages = [];
  $scope.members_online = [];
  $scope.members = [];
  $scope.catalogue = [];
  
  //Input value 
  $scope.name = '';
  $scope.text = '';

  //name input
  $scope.isDisabled = false;

  $scope.send = function send() {
    console.log('Sending message:', $scope.text);
    if ($scope.name !== "") {
      if($scope.setName() === true){
        $scope.isDisabled = true;
        socket.emit('new message', $scope.text);
        $scope.text = '';
      }else{
        $scope.isDisabled = false;
      }

    }else{
      $scope.isDisabled = false;
    }
  };

  socket.on('new message', function (msg) {
    socket.emit('update members');
    socket.emit('update messages');
  });

  $scope.setName = function setName() {
    let validName = false;
    if($scope.members.length === 0) {
      validName = true
    }else{
      for(name of $scope.members){
        if($scope.name !== name){
          validName=true
        }else{
          validName=false
          break;
        }
      }
    }
    console.log(validName)
    if(validName === true){
      socket.emit('add user', $scope.name);
      return true
    }else{
      alert('error name')
      return false;
    }

  };

  socket.on('all users', function (names) {
    $scope.members = names;
    $scope.$apply();
  });

  socket.on('members', function (names) {
    $scope.members_online = names;
    $scope.$apply();
  });

  socket.on('messages', function (messages) {
    $scope.messages = messages;
    $scope.$apply();
  });

  
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
    if($scope.name !== ""){
      $scope.setName();
    }
    console.log("a socket connected")
    socket.emit('update members');
    socket.emit('update messages');
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', (data) => {
    console.log(data.username + ' joined');
    addParticipantsMessage(data);
    socket.emit('update members');
    socket.emit('update messages');
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('you have been disconnected');
    socket.emit('update members');
  });

  // Reconnect
  socket.on('reconnect', () => {
    console.log('you have been reconnected');
    socket.emit('update members');
    socket.emit('update messages');
  });

  // Reconnect error
  socket.on('reconnect_error', () => {
    console.log('attempt to reconnect has failed');
    socket.emit('update members');
  });


}