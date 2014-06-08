angular.module('app')
.directive('myinput', function () {
  return {
    restrict: 'E',
    scope: {
      caption: '@',
      model: '='
    },
    templateUrl: '/eventBrite/myinput.html'
  }
});
