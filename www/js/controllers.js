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
            let type;
            for (let post in uploads) {
              let filename = post.path;
              type = filename.substring(filename.length - 4).toLowerCase();
              switch (type) {
              case ('.mov'):
              case ('.mp4'):
              case ('.avi'):
                {
                  post.icon = "film-outline";
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
                  post.icon = "image-outline";
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
                {
                  post.icon = "document-outline";
                  break;
                }
              default:
                {
                  post.icon = "nuclear-outline";
                  break;
                }
              }
            }
            vm.data = uploads;
          })
          .error(function (data) {
            alert(`error:${data}`);
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
