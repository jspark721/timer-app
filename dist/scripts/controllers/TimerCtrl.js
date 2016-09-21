(function(){
    function TimerCtrl($scope, $interval){
        $scope.startTime = 1500000;
        $scope.format= 'mm:ss'; //minutes and seconds
        $scope.startTimer= function(){
        
            $interval(function(){
                $scope.startTime -=1000;
            },1000);
        };
        $scope.resetTimer = function(){
            $scope.startTime= 1500000;
        }
    }
    
    angular
        .module('timerApp')
        .controller('TimerCtrl', TimerCtrl);
})();