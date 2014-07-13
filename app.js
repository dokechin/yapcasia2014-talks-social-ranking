var socialRankingApp = angular.module('socialRankingApp', []);
socialRankingApp.filter('escape', function() {
  return encodeURIComponent;
});
socialRankingApp.controller('TalkListController', function ($scope, $http) {
  var talks;
  $http.get('talks.json').success(function(data){
    talks = data;
    $scope.sort_by('total');
  }).error(function(){
    alert('run "./get_talks.pl" first.');
    return;
  });
  $scope.sort_by = function(service_name) {
    console.log(service_name);
    talks.sort(function(a, b){
      var key = service_name + '_count';
      return b[key] - a[key];
    });
    $scope.talks = talks;
    $('.active-header').removeClass('active-header');
    $('.' + service_name + '-header').addClass('active-header');
  };
});
