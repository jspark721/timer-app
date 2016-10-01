(function(){
    function Tasks($firebaseArray) {
        var ref = firebase.database().ref().child('tasks');
        
        // download tasks into a synchronized array
        var tasks = $firebaseArray(ref);
        
        return {
            all: tasks
        };
    }
    
    angular
        .module('timerApp')
        .factory('Tasks', ['$firebaseArray', Tasks]);
    
})();