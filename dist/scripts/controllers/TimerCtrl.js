(function(){
    function TimerCtrl($scope, $interval, MY_TIMERS, TIMER_STATES){
        $scope.startTime = MY_TIMERS.WORK_SESSION;
        $scope.format= 'mm:ss'; //minutes and seconds
        $scope.buttonName = 'START TIMER';
        $scope.timerState = TIMER_STATES.WORK; // other options are 'BREAK' or 'LONG_BREAK'
        $scope.breakTime = MY_TIMERS.BREAK_TIME;
        $scope.longBreakTime = MY_TIMERS.LONG_BREAK_TIME;
        $scope.completedWorkSessions= 0;
        $scope.counter = 0;
        
        // Sound file
        var timerSound = new buzz.sound( '/assets/sounds/Long.mp3', {
            preload: true
        });
        
        $scope.startTimer= function(){
            $scope.startTime -=1000;
            $scope.buttonName = 'RESET';
            
            if($scope.startTime == 0) {
                timerSound.play();
                $scope.stop();
                
                if($scope.onBreak()) {
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
            if($scope.buttonName === 'RESET') {
                $scope.stop();
                if($scope.timerState === 'onBreak') {
                    $scope.setBreakTime();
                } 
                if($scope.timerState === 'onLongBreak') {
                    $scope.setLongBreak();
                } 
                if($scope.timerState === 'workSession') {
                    $scope.setWorkSession();
                } 
            } else {
                $scope.start();
                $scope.buttonName = 'RESET';
            }
        };
        
        $scope.start = function() {
            $scope.timerSet = $interval($scope.startTimer, 1000);
        }
        
        $scope.stop = function() {
            $interval.cancel($scope.timerSet);
        }
        
        $scope.pause = function() {
            $interval.cancel($scope.timerSet);
            $scope.counter ++;
            console.log($scope.counter);
        };
        
        $scope.setWorkSession = function() {
            $scope.timerState = TIMER_STATES.WORK;
            $scope.startTime = MY_TIMERS.WORK_SESSION;
            $scope.buttonName = 'START TIMER';
        }
        
        $scope.setBreakTime = function() {
            $scope.timerState = TIMER_STATES.BREAK;
            $scope.startTime = MY_TIMERS.BREAK_TIME;
            $scope.buttonName = '5 MIN BREAK';
        }
        
        $scope.setLongBreak = function() {
            $scope.timerState = TIMER_STATES.LONG_BREAK;
            $scope.startTime = MY_TIMERS.LONG_BREAK_TIME;
            $scope.buttonName = '30 MIN BREAK';
        }
        
        $scope.onBreak = function() {
            if ($scope.timerState === 'workSession') {
                return false;
            } else {
                return true;
            }
        }
    };
    
    angular
        .module('timerApp')
        .constant('MY_TIMERS', {
            WORK_SESSION: 1500000,
            BREAK_TIME: 300000,
            LONG_BREAK_TIME: 180000
        })
        .constant('TIMER_STATES', {
            WORK: 'workSession',
            BREAK: 'onBreak',
            LONG_BREAK: 'onLongBreak'
    })
        .controller('TimerCtrl', ['$scope','$interval', 'MY_TIMERS', 'TIMER_STATES', TimerCtrl]);
})();


