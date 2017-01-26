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
      vm.$onInit = search;

      function search() {
        vm.data = filesService.files;
        // return filesService.service.files;
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

  .controller('loginCtrl', ['$scope', '$stateParams', '$http', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $state) {
      const vm = this;
      vm.login = login;

      function login() {

        if (!vm.loginForm.email) {
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
        } else {
          $http.post("http://eggnogg:8000/token/", vm.loginForm)
            .success(function(response) {
              alert("success post to http://eggnogg:8000/token/");
              //TODO store user id from response if you want to use it to CRUD data
              vm.data = response;
              $state.go('tabsController.home');
            })
            .error(function(response) {
              alert("error post to http://eggnogg:8000/token/");
            });
        }

      }
    }
  ])

  .controller('landingCtrl', ['$scope', '$stateParams', '$ionicModal', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName

    function($scope, $stateParams, $ionicModal, $http) {
      const vm = this;

      vm.$onInit = onInit;
      vm.toggleModal = toggleModal;
      vm.testNetwork = testNetwork;
      vm.buttonMessage = "Try Again";
      vm.wifiName = "EGGNOGG";
      vm.showModal = true;

      function testNetwork() {
        $http.jsonp("http://eggnogg:8000/")
          .then((response) => {
            console.log('Server success:', response);
            vm.message = ["Thank you for connecting to ", ""];
            vm.showModal = false;
            vm.buttonMessage = "Continue";
            toggleModal();
          }, (error) => {
            console.log('Server error:', error);
            console.log('error object:', Object.keys(error));
            console.log('error data:', error.data);
            console.log('error status:', error.status);
            console.log('error text:', error.statusText);
            console.log('error headers:', error.headers);
            console.log('error config:', Object.keys(error.config));
            console.log('error method/url/headers', error.config.method, error.config.url, error.config.headers.Accept);
            vm.message = ["Please ensure your phone is connected to ", " before continuing."];
            vm.showModal = true;
            toggleModal();
          });
      }

      function toggleModal() {
        if (vm.showModal) {
          vm.modal.show();
        } else {
          vm.modal.hide();
        }
      }

      function onInit() {
        $ionicModal.fromTemplateUrl('wifi-modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          vm.modal = modal;
        });
        testNetwork();
      }
    }
  ])

  .controller('signupCtrl', ['$scope', '$stateParams', '$http', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $state) {

      const vm = this;
      vm.signup = signup;

      function signup() {

        if (!vm.signupForm.email) {
          window.plugins.toast.showWithOptions({
            message: "Please enter an email",
            duration: "long",
            position: "center",
            addPixelsY: -40
          });
        } else if (!vm.signupForm.username) {
          window.plugins.toast.showWithOptions({
            message: "Please enter an username",
            duration: "long",
            position: "center",
            addPixelsY: -40
          });
        } else if (!vm.signupForm.password) {
          window.plugins.toast.showWithOptions({
            message: "Please enter an password",
            duration: "long",
            position: "center",
            addPixelsY: -40
          });
        } else {
          $http.post("http://eggnogg:8000/users/", vm.signupForm)
            .success(function(response) {
              alert("Success post to http://eggnogg:8000/token/");
              vm.data = response;
              $state.go('tabsController.profile');
            })
            .error(function(response) {
              alert(response)
              alert("error post to http://eggnogg:8000/token/");
            });
        }
      }
    }
  ])
