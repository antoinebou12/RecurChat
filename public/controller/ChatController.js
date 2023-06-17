function ChatController($scope) {
  var socket = io.connect();

  $scope.messages = [];
  $scope.members_online = [];
  $scope.members = [];
  $scope.name = '';
  $scope.text = '';
  $scope.isDisabled = false;

  function initializeSocket() {
    socket.on('all users', function(names) {
      $scope.members = names;
      $scope.$apply();
    });

    socket.on('members', function(names) {
      $scope.members_online = names;
      $scope.$apply();
    });

    socket.on('messages', function(messages) {
      $scope.messages = messages;
      $scope.$apply();
    });

    socket.on('connect', updateData);
    socket.on('disconnect', updateData);
    socket.on('reconnect', updateData);
    socket.on('reconnect_error', updateData);
  }

  function updateData() {
    socket.emit('update members');
    socket.emit('update messages');
  }

  $scope.send = function send() {
    if($scope.name !== "" && $scope.setName()){
      $scope.isDisabled = true;
      socket.emit('new message', $scope.text);
      $scope.text = '';
      socket.on('new message', updateData);
    }
  };

  $scope.setName = function setName() {
    if(!$scope.members.includes($scope.name)){
      socket.emit('add user', $scope.name);
      return true;
    } else {
      alert('This name is already taken, please choose a different one.');
      return false;
    }
  };

  initializeSocket();
}
