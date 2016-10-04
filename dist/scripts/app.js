(function(){
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });
        
        $stateProvider
            .state('home', {
                url:'/',
                controller:'TimerCtrl',
                templateUrl: '/templates/home.html'
            })
    }
    
    angular
        .module('timerApp', ['ui.router','firebase'])
        .controller('TaskCtrl', function($scope, $firebaseArray){
            var ref = firebase.database().ref(); 
        
            $scope.names=$firebaseArray(ref);
        
            $scope.add = function() {
                $scope.names.$add($scope.task);
            }
        })
        .config(config);
})();