(function(){
    function TimerCtrl($scope, $interval, MY_TIMERS){
        $scope.startTime = MY_TIMERS.WORK_SESSION;
        $scope.format= 'mm:ss'; //minutes and seconds
        $scope.buttonName = "START WORK SESSION";
        $scope.workSession = true;
        $scope.onBreak = false;
        $scope.onLongBreak = false;
        $scope.breakTime = MY_TIMERS.BREAK_TIME;
        $scope.longBreakTime = MY_TIMERS.LONG_BREAK_TIME;
        $scope.completedWorkSessions= 0;

        
        $scope.startTimer= function(){
            $scope.startTime -=1000;
            $scope.buttonName = "RESET";
            
            if($scope.startTime == 0) {
                $scope.stop();
                if($scope.onBreak || $scope.onLongBreak) {
                    $scope.setWorkSession();
                } else {
                    $scope.completedWorkSessions++;
                    console.log($scope.completedWorkSessions); //display & count completed sessions
                    if($scope.completedWorkSessions == 4) {
                        $scope.setLongBreak();
                        $scope.completedWorkSessions = 0;
                    } else {
                        $scope.setBreakTime();
                    }
                }
            }
        };
        
        $scope.updateTimer = function(){
            if($scope.buttonName === "RESET") {
                $scope.stop();
                if($scope.onBreak) {
                    $scope.setBreakTime();
                } if($scope.onLongBreak) {
                    $scope.setLongBreak();
                } if($scope.workSession) {
                    $scope.setWorkSession();
                } 
            } else {
                $scope.start();
                $scope.buttonName = "RESET";
            }
        };
        
        $scope.start = function() {
            $scope.timerSet = $interval($scope.startTimer, 1000);
        }
        
        $scope.stop = function() {
            $interval.cancel($scope.timerSet);
        }
        
        $scope.setWorkSession = function() {
            $scope.workSession = true;
            $scope.onBreak = false;
            $scope.onlongBreak = false;
            $scope.startTime = MY_TIMERS.WORK_SESSION;
            $scope.buttonName = "START WORK SESSION";
        }
        
        $scope.setBreakTime = function() {
            $scope.onBreak = true;
            $scope.onlongBreak = false;
            $scope.workSession = false;
            $scope.startTime = MY_TIMERS.BREAK_TIME;
            $scope.buttonName = "5 MIN BREAK";
        }
        
        $scope.setLongBreak = function() {
            $scope.onlongBreak = true;
            $scope.onBreak= false;
            $scope.workSession = false;
            $scope.startTime = MY_TIMERS.LONG_BREAK_TIME;
            $scope.buttonName = "30 MIN BREAK";
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


