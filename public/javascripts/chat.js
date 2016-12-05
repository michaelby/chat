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

MESSAGES = [{
    author: 'Alice',
    text: 'Whats up?',
    date: new Date()
}, {
    author: 'Bob',
    text: 'Nothing much',
    date: new Date()
}, {
    author: 'Alice',
    text: 'That\'s great!\n\nI\'m sending a multiline message.',
    date: new Date()
}];

angular
    .module('message')
    .controller('messageController', function($scope) {
        $scope.messages = MESSAGES;
    });
