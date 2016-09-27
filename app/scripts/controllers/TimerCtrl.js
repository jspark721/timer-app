(function(){
    function TimerCtrl($scope, $interval, MY_TIMERS){
        $scope.startTime = MY_TIMERS.WORK_SESSION;
        $scope.format= 'mm:ss'; //minutes and seconds
        $scope.workSession = true;
        $scope.onBreak = false;
        $scope.onLongBreak = false;
        $scope.breakTime = MY_TIMERS.BREAK_TIME;
        $scope.longBreak = MY_TIMERS.LONG_BREAK_TIME;
        $scope.completedWorkSessions= 0;
        
        
        var timer;
        var breakTimer;
        
        $scope.startTimer= function(){
            timer = $interval(function(){
                $scope.startTime -=1000;
                
                // when timer hits 0:00, timer stops and break timer starts
                if($scope.startTime == 0) {
                    $scope.stop();
                    $scope.onBreak = true;
                    
                    if($scope.onBreak) {
                        $scope.setBreakTime();
                        
                        if($scope.breakTime == 0 ){
                            $scope.onBreak = false;
                        }
                    } 
                }
            }, 1000);
        };
        
        $scope.resetTimer = function(){
            $scope.startTime= MY_TIMERS.WORK_SESSION;
        }
        
        $scope.stop = function() {
            $interval.cancel($scope.timer);
        }
        
        $scope.setBreakTime = function(){
             breakTimer = $interval(function() {
                 $scope.breakTime -=1000;
                 
                 if($scope.breakTime == 0){
                     $interval.cancel(breakTimer);
                 }
             }, 1000);
        }
        
        $scope.setLongBreak = function(){
            longBreakTimer= $interval(function() {
                $scope.longBreak -=1000;
                
                if($scope.longBreak == 0) {
                    $interval.cancel(longBreakTimer);
                }
            }, 1000);
        }
        
    };
    
    angular
        .module('timerApp')
        .constant('MY_TIMERS', {
            WORK_SESSION: 5000,
            BREAK_TIME: 3000,
            LONG_BREAK_TIME: 18000
        })
        .controller('TimerCtrl', ['$scope','$interval', 'MY_TIMERS', TimerCtrl]);
})();


