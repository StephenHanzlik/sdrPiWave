'use strict';

angular.module('app.controllers', ['ionic'])

  .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {

    }
  ])

  .controller('homeCtrl', ['$scope', '$stateParams', 'filesService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName

    function($scope, $stateParams, filesService) {
      const vm = this;
      vm.$onInit = onInit;

      function onInit() {
        filesService.getFiles()
          .then((res) => {
            vm.data = res.data;
          });
      }
    }
  ])
  .controller('searchCtrl', ['$scope', '$stateParams', 'filesService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, filesService) {
      const vm = this;
      vm.search = search;

      function search() {
        alert(filesService.service.files);
        return filesService.service.files;
      }
    }
  ])

  .controller('profileCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {
      const vm = this;
      vm.$onInit = onInit;


      function onInit() {
        return $http.get(`http://eggnogg:8000/users/${user.id}`)
          .success(function(user) {
            vm.userProfile = user;
          })
          .error(function(data) {
            alert(`error: ${data}`);
          });
      }
    }
  ])

  .controller('loginCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http) {
      const vm = this;
      vm.login = login;

      function login() {
        alert("loginForm " + vm.loginForm);
        alert("loginForm.email " + vm.loginForm.email);

        if (!vm.loginForm) {
          window.plugins.toast.showWithOptions({
            message: "Please enter a password or email",
            duration: "long",
            position: "bottom",
            addPixelsY: -40
          });
        } else if (!vm.loginForm.email) {
          window.plugins.toast.showWithOptions({
            message: "Please enter an email",
            duration: "long",
            position: "center",
            addPixelsY: -40
          });
        } else if (!vm.loginForm.password) {
          window.plugins.toast.showWithOptions({
            message: "Please enter an password",
            duration: "long",
            position: "center",
            addPixelsY: -40
          });
        }

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
    function($scope, $stateParams) {

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
