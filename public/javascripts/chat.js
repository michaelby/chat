angular.module('chat', []);

// Some dummy data to check the look:
DUMMY_CHATS = [
    {
        topic: 'Bathroom breaks',
        startedBy: 'John',
        lastMessage: '12 minutes ago',
        unread: 3,
        url: '/chats/1'
    },
    {
        topic: 'Donald Trump?????',
        startedBy: 'Mary',
        lastMessage: '3 hours ago',
        unread: 1,
        url: '/chats/2'
    },
    {
        topic: 'Did anyone else get food poisoning at the office party?',
        startedBy: 'Andrew',
        lastMessage: '30 November',
        unread: 0,
        url: '/chats/3'
    }
];
        

angular
    .module('chat')
    .controller('chatController', function($scope, $interval) {
        $scope.chats = DUMMY_CHATS;
        $scope.containingText = "";

        $interval(function () {
            if ($scope.searchInput) {
                $scope.containingText = ' containing "'
                    + $scope.searchInput + '"';
            } else {
                $scope.containingText = '';
            }
        }, 1000);
    });

