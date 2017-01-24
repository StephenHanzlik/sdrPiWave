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

      function onInit() {
        filesService.getFiles()
          .then((res) => {
            vm.data = res.data;
          });
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
    function ($scope, $stateParams, $http) {
      const vm = this;
      vm.login = login;

      function login() {

        $http.post("http://eggnogg:8000/token/", vm.loginForm)
          .success(function (response) {
            alert("success post to http://eggnogg:8000/token/");
            vm.data = response;
          })
          .error(function (response) {
            alert(response)
            alert("error post to http://eggnogg:8000/token/");
          });
      }

    }
  ])

  .controller('landingCtrl', ['$scope', '$stateParams', '$ionicModal', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $ionicModal, $http) {
      const vm = this;

      vm.$onInit = onInit;
      vm.toggleModal=toggleModal;
      vm.testNetwork=testNetwork;
      vm.buttonMessage="Try Again";
      vm.wifiName = "EGGNOGG";

      function testNetwork() {
        $http.get("http://eggnogg:8000/")
          .then((response) => {
            vm.message = ["Thank you for connecting to ", ""];
            vm.showModal=false;
            vm.buttonMessage="Continue";
            toggleModal();
          }, (error) => {
            vm.message = ["Please ensure your phone is connected to ", " before continuing."];
            vm.showModal=true;
            toggleModal();
          });
      }

      function toggleModal() {
        if (!vm.showModal) {
          vm.modal.hide();
        } else {
          vm.modal.show();
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

  .controller('signupCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http) {

      const vm = this;
      vm.signup = signup;

      function signup() {

        $http.post("http://eggnogg:8000/users/", vm.signupForm)
          .success(function (response) {
            alert("Success post to http://eggnogg:8000/token/");
            vm.data = response;
          })
          .error(function (response) {
            alert(response)
            alert("error post to http://eggnogg:8000/token/");
          });
      }

    }
  ])
