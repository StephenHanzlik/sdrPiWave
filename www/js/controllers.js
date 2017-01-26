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
        var user =localStorage.getItem("user");
        return $http.get(`http://eggnogg:8000/users/${user}`)
          .success(function(userProfile) {
            console.log(userProfile);
            console.log(localStorage.getItem("token"));
            vm.data= userProfile;
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
              vm.data = response;
              console.log("vm.data " ,vm.data.id);
              var userId =vm.data.id;
              var token = vm.data.token;
              window.localStorage.setItem('user',userId);
              window.localStorage.setItem('token', token);
              console.log(localStorage.getItem("user"));
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

    function ($scope, $stateParams, $ionicModal, $http) {
      const vm = this;

      vm.$onInit = onInit;
      vm.toggleModal = toggleModal;
      vm.testNetwork = testNetwork;
      vm.buttonMessage = "Try Again";
      vm.wifiName = "EGGNOGG";
      vm.showModal = true;

      function testNetwork() {
        $http.get("http://eggnogg:8000/")
          .then((response) => {
            console.log("response " + response);
            vm.message = ["Thank you for connecting to ", ""];
            vm.showModal = false;
            vm.buttonMessage = "Continue";
            toggleModal();
          }, (error) => {
            console.log("error " + error);
            vm.message = ["Please ensure your phone is connected to ", " before continuing."];
            vm.showModal = false;
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
        }).then(function (modal) {
          vm.modal = modal;
        });
        testNetwork();
      }
    }
  ])
//   .controller('storageCtrl', ['$scope', '$stateParams', '$http',
//     function($scope, $stateParams, $http, $localStorage, $sessionStorage){
//
//
//     }
//
//
//
// ])
  .controller('signupCtrl', ['$scope', '$stateParams', '$http', '$state',
 // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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
