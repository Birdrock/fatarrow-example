angular.module('app')
.directive('notifications', function ($log, $timeout) {
  return {
    link: function (scope, element, attrs) {
      scope.$on('notify', function (e, event) {
        scope.newNotification = true;
        scope.eventDetails = event;
        
        $timeout(function () {
          scope.newNotification = false
        }, 4000);
      });
    },
    replace: true,
    restrict: 'E',
    templateUrl: '/eventBrite/notifications.html'
  }
});
