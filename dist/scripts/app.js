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
        
            $scope.tasks=$firebaseArray(ref);
        
            $scope.add = function() {
                $scope.tasks.$add({
                    task: $scope.task ,
                    created_at: true
                });
            $scope.task="";
                
            }
        })
        .config(config);
})();