(function(){
    function TimerCtrl($scope, $interval){
        $scope.startTime = 1500000;
        $scope.format= 'mm:ss'; //minutes and seconds
        $scope.onBreak = false;
        $scope.breakTime = 300000;
        
        var timer;
        $scope.startTimer= function(){
            timer = $interval(function(){
                $scope.startTime -=1000;
                
                // when timer hits 0:00, timer stops and break timer starts
                if($scope.startTime == 0) {
                    $interval.cancel(timer);
                    $scope.onBreak = true;
                    
                    $scope.breakTimer = function() {
                        $interval(function(){
                            $scope.breakTime -=1000;
                            
                            if($scope.breakTime == 0) {
                                $scope.onBreak = false;
                            }
                        },1000);
                    }
                }
            }, 1000);
            
            $scope.stop = function(){
                $interval.cancel(timer);
            }
        };
        
        $scope.resetTimer = function(){
            $scope.startTime= 1500000;
        }
        
    };
    
    angular
        .module('timerApp')
        .controller('TimerCtrl', TimerCtrl);
})();

timerApp.constant('START_TIME', 15000000);
timerApp.constant('')
