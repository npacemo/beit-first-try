'use strict';

angular.module('firstTryApp')
  .controller('RootCtrl', function ($scope) {
    $scope.menuSidebarShown = false;

    $scope.showSidebarMenu = function(visible) {
      $scope.menuSidebarShown = visible;
    };

    $scope.hideSidebarMenu = function() {
      $scope.menuSidebarShown = false;
    };

    $scope.$watch("menuSidebarShown", function() {
      $scope.updateContainerWrapperTransform();
    });

    $scope.updateContainerWrapperTransform = function() {
      var containerWrapper = $(".container-wrapper");
      if ($scope.menuSidebarShown) {
        containerWrapper.css("transform", "translate3d(80%, 0, 0)");
      } else {
        containerWrapper.css("transform", "");
      }
    };

    $scope.preventDefaultEvent = function(event) {
      event.preventDefault();
    };
  });
