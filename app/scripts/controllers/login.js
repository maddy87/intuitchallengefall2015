'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location) {

    $scope.submit = function() {

      if($scope.currage < 18){
        $scope.error = " You need to be at least 18 years old to start investing "
      }
      else if($scope.currincome < 5000){
        $scope.error = " You annual income needs to be atleast $5000 to start investing "
      }
      else if($scope.currincome == null || $scope.currage == null){
        $scope.error = "Please enter a valid value. "
      }
      else{
        var newPath = "/dashboard/reports/"+$scope.currage+"/"+$scope.currincome;
        $location.path(newPath);
      }
      return false;
    }

  });
