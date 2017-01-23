'use strict';

angular.module('app.controllers', ['ionic'])

  .controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }
  ])

  .controller('homeCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName

    function ($scope, $stateParams, $http) {
      // alert("hello from controller");
      const vm = this;
      vm.$onInit = onInit;

      function onInit() {

        $http.get("http://eggnogg:8000/uploads/")
          .success(function (uploads) {
            vm.data = uploads;
        let type, filename;
        //TEST DATA FOR OFFLINE USE//
        // vm.data = {
        //   test1: {
        //     path: "/file/new.mp3",
        //     name: "new.mp3",
        //     username: "TESTUSER"
        //   },
        //   test2: {
        //     path: "/file/other.mp4",
        //     name: "other.mp4",
        //     username: "TESTUSER2"
        //   },
        //   test3: {
        //     path: "/file/test.docx",
        //     name: "test.docx",
        //     username: "TESTUSER3"
        //   },
        //   test4: {
        //     path: "/file/newthing.tif",
        //     name: "newthing.tif",
        //     username: "TESTUSER4"
        //   }
        // };
        for (let key in vm.data) {
          let post = vm.data[key];
          filename = post.path;
          type = filename.substring(filename.length - 4).toLowerCase();
          switch (type) {
          case ('.mp3'):
          case ('.ogg'):
          case ('.wav'):
          case ('.aac'):
          case ('.wma'):
            {
              post.icon = "ion-music-note";
              break;
            }
          case ('.mov'):
          case ('.wmv'):
          case ('.mp4'):
          case ('.avi'):
            {
              post.icon = "ion-ios-film-outline";
              break;
            }
          case ('.jpg'):
          case ('jpeg'):
          case ('.gif'):
          case ('.png'):
          case ('.psd'):
          case ('.tif'):
          case ('.bmp'):
            {
              post.icon = "ion-image";
              break;
            }
          case ('.txt'):
          case ('.doc'):
          case ('docx'):
          case ('.htm'):
          case ('html'):
          case ('.pdf'):
          case ('.rtf'):
          case ('.xls'):
          case ('xlsx'):
          case ('.ttf'):
            {
              post.icon = "ion-document";
              break;
            }
          default:
            {
              post.icon = "ion-nuclear";
              break;
            }
          }
        }
        })
        .error(function (data) {
          alert(`error: ${data}`);
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

  .controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }
  ])

  .controller('landingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }
  ])

  .controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }
  ])
