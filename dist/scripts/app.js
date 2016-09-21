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
        .module('timerApp', ['ui.router'])
        .config(config);
})();