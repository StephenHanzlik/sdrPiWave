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
      vm.playback = playback;
      vm.returnPath = returnPath;
      function onInit() {
        filesService.getFiles()
          .then((res) => {
            vm.data = res.data;
          });
      }

      function playback(post) {
        if (!post.showMedia) {
          post.showMedia = true;
          console.log(post.file_name);
          vm.watchPost = "http://eggnogg:8000/uploads/" + post.file_name;
        } else {
          post.showMedia = false;
        }
      }

      function returnPath(post) {
        vm.watchPost = "http://eggnogg:8000/uploads/" + post.file_name;
        return vm.watchPost;
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

  .controller('profileCtrl', ['$scope', '$stateParams', '$http', 'filesService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, filesService) {
      const vm = this;
      vm.$onInit = onInit;
      vm.profileFilter = localStorage.getItem("username");

      function onInit() {
        var userId = localStorage.getItem("userId");
        vm.uploadData = filesService.files;
        return $http.get(`http://eggnogg:8000/users/${userId}`)
          .success(function(userProfile) {
            vm.data = userProfile;
          })
          .error(function(data) {
            alert(`error: ${data}`);
          });
      }
    }
  ])

  .controller('loginCtrl', ['$scope', '$stateParams', '$http', '$state', 'userService', 'tokenService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $state, userService, tokenService) {
      const vm = this;
      vm.login = login;
      vm.$onInit = onInit;

      function onInit() {
        if (tokenService.checkToken()) {
          console.log('You are already logged in!');
          $state.go('tabsController.home');
        } else {
          userService.logout();
          console.log('You are not logged in!');
        }
      }

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
          userService.login(vm.loginForm.email, vm.loginForm.password)
            .then((res) => {
              console.log('login successful:', res.data);
              console.log('userService:', userService.userData);
              vm.data = userService.userData;

              $state.go('tabsController.home');
            }, (error) => {
              console.log('login failed:', error.data);
              window.plugins.toast.showWithOptions({
                message: `Login failed: ${error.data}.\n Please try again.`,
                duration: "long",
                position: "center",
                addPixelsY: -40
              });
              // =======
              //           $http.post("http://eggnogg:8000/token/", vm.loginForm)
              //             .success(function(response) {
              //               alert("success post to http://eggnogg:8000/token/");
              //               vm.data = response;
              //               var userId = vm.data.id;
              //               var token = vm.data.token;
              //               var username = vm.data.username;
              //               window.localStorage.setItem('user', userId);
              //               window.localStorage.setItem('token', token);
              //               window.localStorage.setItem('username', username);
              //               $state.go('tabsController.home');
              //             })
              //             .error(function(response) {
              //               alert("error post to http://eggnogg:8000/token/");
              //               alert(response);
              // >>>>>>> d1b5db709d1b4f872ad8256086c5dba91560db13
            });
        }

      }
    }
  ])

  .controller('landingCtrl', ['$scope', '$stateParams', '$ionicModal', '$http', '$timeout', 'networkService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName

    function($scope, $stateParams, $ionicModal, $http, $timeout, networkService) {
      const vm = this;

      vm.$onInit = onInit;
      vm.toggleModal = toggleModal;
      vm.testNetwork = testNetwork;
      vm.buttonMessage = "Try Again";
      vm.wifiName = "EGGNOGG";
      vm.showModal = true;

      function testNetwork() {
        return networkService.testNetwork()
          .then((online) => {
            if (online) {
              vm.showModal = false;
              vm.modal.hide().then(() => {
                vm.message = ["Thank you for connecting to ", ""];
                vm.buttonMessage = "Continue";
                vm.modal.show();
                $timeout(() => {
                  toggleModal();
                }, 1500);
              });
            } else {
              vm.message = ["Please ensure your phone is connected to ", " before continuing."];
              vm.showModal = true;
              vm.modal.hide().then(() => {
                toggleModal();
              });
            }
          });
      }

      function toggleModal() {
        if (vm.showModal) {
          return vm.modal.show();
        } else {
          return vm.modal.remove();
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
  .controller('signupCtrl', ['$scope', '$stateParams', '$http', '$state', 'userService',
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $state, userService) {

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
          vm.password = vm.signupForm.password;
          userService.makeNew(vm.signupForm.email, vm.signupForm.username, vm.signupForm.password)
            .then(function success(userData) {
              vm.data = userData;
              vm.data.password = vm.password;
              userService.login(vm.data.email, vm.data.password)
                .then((res) => {
                  vm.data = res;
                  $state.go('tabsController.profile');
                }, (error) => {
                  $state.go('tabsController.login');
                });
            }, function error(error) {
              window.plugins.toast.showWithOptions({
                message: `Failed to create user: ${error.data}.\nPlease try again.`,
                duration: "long",
                position: "center",
                addPixelsY: -40
              });
              // =======
              //           $http.post("http://eggnogg:8000/users/", vm.signupForm)
              //             .success(function(response) {
              //               alert("Created a profile, please log in");
              //               vm.data = response;
              //               $state.go('login');
              //             })
              //             .error(function(response) {
              //               alert(response)
              //               alert("error post to http://eggnogg:8000/token/");
              // >>>>>>> d1b5db709d1b4f872ad8256086c5dba91560db13
            });
        }
      }
    }
  ]);
