angular.module('app')
.directive('myform', function () {
  return {
    restrict: 'E',
    scope: {
      submit: '&',
    },
    templateUrl: '/eventBrite/myform.html',
    transclude: true
  }
});
