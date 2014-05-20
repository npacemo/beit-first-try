'use strict';

angular.module('firstTryApp')
  .factory('photos', function() {
    var photos = [
      { src: '../images/photos/DSC_9244.jpg', tags: ["Granpa", "Granma", "Krissy", "Annie", "Vladi"]},
      { src: '../images/photos/DSC_9245.jpg', tags: ["Granpa", "Granma", "Krissy", "Annie", "Vladi"]},
      { src: '../images/photos/DSC_9248.jpg', tags: ["Krissy", "Annie", "Vladi", "Victor", "Volen", "Raya"]},
      { src: '../images/photos/DSC_9249.jpg', tags: ["Annie", "Alek", "Raya"]},
      { src: '../images/photos/DSC_9250.jpg', tags: ["Annie", "Alek", "Dayanka"]},
      { src: '../images/photos/DSC_9251.jpg', tags: ["Annie", "Kalo", "Dayanka"]},
      { src: '../images/photos/DSC_9252.jpg', tags: ["Titi", "Dayanka"]},
      { src: '../images/photos/DSC_9253.jpg', tags: ["Titi", "Dayanka"]},
      { src: '../images/photos/DSC_9254.jpg', tags: ["Titi", "Dayanka"]},
      { src: '../images/photos/DSC_9255.jpg', tags: ["Titi", "Dayanka"]},
      { src: '../images/photos/DSC_9256.jpg', tags: ["Titi", "Dayanka"]},
      { src: '../images/photos/DSC_9257.jpg', tags: ["Titi", "Dayanka"]},
      { src: '../images/photos/DSC_9258.jpg', tags: ["Titi", "Dayanka"]},
      { src: '../images/photos/DSC_9260.jpg', tags: ["Nesi", "Vladi"]},
      { src: '../images/photos/DSC_9261.jpg', tags: ["Granma", "Annie", "Vladi"]},
      { src: '../images/photos/DSC_9262.jpg', tags: ["Annie", "Vladi", "Volen"]}
    ];
    return photos;
  })
  .controller('MainCtrl', function ($scope, photos) {
    $scope.photos = photos;
  });
