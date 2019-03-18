function ChatController($scope) {

  var socket = io.connect();
  $scope.messages = [];
  $scope.roster = [];
  $scope.catalogue = [];
  
  $scope.name = '';
  $scope.text = '';

  //name input
  $scope.nameValue = "";
  $scope.isDisabled = false;

  socket.on('connect', function () {
    $scope.setName();
  });
  socket.on('message', function (msg) {
    $scope.messages.push(msg);
    $scope.$apply();
  });
  socket.on('roster', function (names) {
    $scope.roster = names;
    $scope.$apply();
  });
  socket.on('catalogue', function (rooms) {
    $scope.catalogue = rooms;
    $scope.$apply();
  });
  $scope.send = function send() {
    console.log('Sending message:', $scope.text);
    socket.emit('message', $scope.text);
    $scope.text = '';
    if ($scope.nameValue !== "") {
      $scope.isDisabled = true;

    }
  };
  $scope.setName = function setName() {
    socket.emit('identify', $scope.name);
    $scope.nameValue = $scope.name;
  };

}