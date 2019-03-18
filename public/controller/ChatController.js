function ChatController($scope) {

  //init socket
  var socket = io.connect();

  //socket array
  $scope.messages = [];
  $scope.roster = [];
  $scope.catalogue = [];
  
  //Input value 
  $scope.username = '';
  $scope.text = '';

  //name input
  $scope.nameValue = "";
  $scope.isDisabled = false;

  socket.on('connect', function () {
    $scope.setUsername();
  });

  socket.on('disconnect', function(){
    console.log('socket disconnected');
  });

  $scope.send = function send() {
    $scope.text = '';
    if ($scope.nameValue !== "") {
      $scope.isDisabled = true;

    }
  };
  $scope.setUsername = function setUsername() {
    $scope.nameValue = $scope.name;
    $scope.roster.push($scope.name);
    $scope.$apply();
    console.log($scope.roster);
  };

}