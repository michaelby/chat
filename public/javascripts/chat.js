angular.module('chat', []);
        
var POLLING_INTERVAL = 2000;

var getChats = function($scope, $http) {
    uri = '/chats';
    if ($scope.searchInput) {
        $scope.containingText = ' containing "'
            + $scope.searchInput + '"';
        uri = encodeURI(uri + '?search=' + $scope.searchInput);
    } else {
        $scope.containingText = '';
    }
    $http.get(uri).then(function success(res) {
        $scope.chats = res.data;
    }, function failure(error) {
        // Just ignore errors for now.
    });
};

angular
    .module('chat')
    .controller('chatController', function($scope, $interval, $http) {
        $scope.containingText = '';
        getChats($scope, $http);

        $interval(function () {
            getChats($scope, $http);
        }, POLLING_INTERVAL);
    });

