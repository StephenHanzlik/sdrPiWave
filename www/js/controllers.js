'use strict';

angular.module('app.controllers', ['ionic'])

  .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }
  ])

  .controller('homeCtrl', ['$scope', '$stateParams', 'filesService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName

    function ($scope, $stateParams, filesService) {
      const vm = this;
      vm.$onInit = onInit;
      vm.streamMedia = streamMedia;
      vm.downloadMedia = downloadMedia;

      function onInit() {
        filesService.getFiles()
          .then((res) => {
            vm.data = res.data;
          });
      }
      function streamMedia(post){
        alert("streaming some media"+ post.path)
      }
      function downloadMedia(post){
        alert("downloading some media " + post.category)
      }



    }
  ])
  .controller('searchCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }
  ])

  .controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }
  ])

  .controller('loginCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {
      const vm = this;
      vm.login = login;

      function login() {

        $http.post("http://eggnogg:8000/token/", vm.loginForm)
          .success(function(response) {
            alert("success post to http://eggnogg:8000/token/");
            vm.data = response;
          })
          .error(function(response) {
            alert(response)
            alert("error post to http://eggnogg:8000/token/");
          });
      }

    }
  ])

  .controller('landingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }
  ])

  .controller('signupCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {

      const vm = this;
      vm.signup = signup;

      function signup() {

        $http.post("http://eggnogg:8000/users/", vm.signupForm)
          .success(function(response) {
            alert("Success post to http://eggnogg:8000/token/");
            vm.data = response;
          })
          .error(function(response) {
            alert(response)
            alert("error post to http://eggnogg:8000/token/");
          });
      }

    }
  ])
