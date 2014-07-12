var socialRankingApp = angular.module('socialRankingApp', []);
socialRankingApp.filter('escape', function() {
  return encodeURIComponent;
});
socialRankingApp.controller('TalkListController', function ($scope, $http) {
  var current_ranking = 'total';
  $http.get('talks.json').success(function(talks){
    $scope.talks = talks;
    $scope.sort_by('total');
  });
  $scope.sort_by = function(service_name) {
    var talks = $scope.talks;
    talks.sort(function(a, b){
      return b[service_name + '_count'] > a[service_name + '_count'];
    });
    $scope.talks = talks;
    $('.active-header').removeClass('active-header');
    $('.' + service_name + '-header').addClass('active-header');
  };
});
