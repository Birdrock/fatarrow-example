angular.module('app')
.filter('truncate', function () {
  return function (text, characters, includeEllipsis) {
    return text.substr(0, characters) + (includeEllipsis ? '...' : '');
  };
})

angular.module('app')
.service('eventBriteService', function ($http) {
  // var Guid = function() {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  //   var r, v;
  //   r = Math.random() * 16 | 0;
  //   v = (c === 'x' ? r : r & 0x3 | 0x8);
  //   return v.toString(16);
  // })};

  // get all events
  this.list = function () {
    return $http.get('http://workshop-api-1.herokuapp.com/events.json')
    .then(function (result) {
      return result.data
    });
  };
    // return [
    //   {id: Guid(), what: 'Ruby Conf', where: 'San Diego', when: 'Oct'},
    //   {id: Guid(), what: 'ngConf', where: 'San Francisco', when: 'Jan'}
    // ];

  this.get = function (id) {
    return $http.get('http://workshop-api-1.herokuapp.com/events/' + id +'.json')
    .then(function (result) {
      return result.data
    });
  };

  this.delete = function (id) {
    return $http.delete('http://workshop-api-1.herokuapp.com/events/' + id +'.json')
    .then(function (result) {
      return result.data
    });
  };
});

angular.module('app')
.controller('eventBriteController', function($scope, $log, eventBriteService, $q, $timeout) {
  $scope.greeting = "Hello Angularians";

  var Guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r, v;
    r = Math.random() * 16 | 0;
    v = (c === 'x' ? r : r & 0x3 | 0x8);
    return v.toString(16);
  })};

  // var myPromise = function () {
  //   var deferred = $q.defer();
  //
  //   $timeout(function () {
  //     deferred.resolve('DONE');
  //   }, 2000);
  //
  //   return deferred.promise
  // };
  //
  // var myPromise2 = function () {
  //   return $timeout(function () {
  //     return 'My PROMISE';
  //   }, 3000);
  //
  // };
  //
  // $q.all([myPromise(), myPromise2()])
  // .then(function (myPromise1Response, myPromise2Response) {
  //   $log.info(myPromise1Response, myPromise2Response);
  // });
  //
  // myPromise().then(function (result) {
  //   $log.debug('myPromise', result);
  // })
  // .then(myPromise2)
  // .then(function (result) {
  //   $log.debug('myPromise2', result);
  // });

  // $scope.events = [
  //   {id: Guid(), what: 'Ruby Conf', where: 'San Diego', when: 'Oct'},
  //   {id: Guid(), what: 'ngConf', where: 'San Francisco', when: 'Jan'}
  // ];

  // $scope.events = eventBriteService.list() // doesn't work because of $promise
  var list = eventBriteService.list().then(function (result) {
    $scope.events = result

    return result;
  });

  // list.then(function(result) {
  //   $log.debug(result);
  // });

  $scope.addEvent = function (what, where, when) {
    var event = {event_id: Guid(), what: what, where: where, when: when};

    $scope.$broadcast('notify', event);

    $scope.events.push(event);
    // $log.debug($scope.events);
  };
});

angular.module('app')
.config(function ($routeProvider) {
  $routeProvider
  .when('/event-brite', {
    caption: 'Event Brite',
    controller: 'eventBriteController',
    templateUrl: '/eventBrite/eventBrite.html'
  })
  .when('/event-brite/:id', {
    controller: 'eventBriteEventController',
    templateUrl: '/eventBrite/eventBriteEvent.html'
  })
});
