// How often to poll the server for updates
var POLLING_INTERVAL = 2000;

// Module for the chat index page starts here.

angular.module('chat', []);

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


// Module for the messages page starts here.

angular.module('message', []);

var getMessages = function($scope, $http) {
    $http.get($scope.apiURI).then(function success(res) {
        $scope.messages = res.data;
    }, function failure(error) {
        // Just ignore errors for now.
    });
}

angular
    .module('message')
    .controller('messageController', function($scope, $interval, $http) {
        var uri = location.toString();
        if (uri[uri.length-1] !== '/') {
            uri += '/';
        }
        $scope.apiURI = uri + 'messages';
        $scope.text = '';

        getMessages($scope, $http);

        $interval(function () {
            getMessages($scope, $http);
        }, POLLING_INTERVAL);

        $scope.send = function() {
            $http.post($scope.apiURI, { text: $scope.text })
                .then(function success(res) {
                    $scope.text = '';
                }, function failure(error) {
                    // Just ignore errors for now.
                });
        };
    });
