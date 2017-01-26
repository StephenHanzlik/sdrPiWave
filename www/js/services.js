'use strict';
angular.module('app.services', [])

  .factory('BlankFactory', [function () {

  }])

  .factory('LocalStorageFactory', ['$window', function LocalStorageFactory($window) {
    const store = $window.localStorage;

    return {
      setItem,
      getItem,
      removeItem
    };

    function setItem(key, value) {
      store.setItem(key, value);
    }

    function getItem(key) {
      store.getItem(key);
    }

    function removeItem(key) {
      store.removeItem(key);
    }
  }])

  .factory('AuthTokenFactory', ['LocalStorageFactory', function AuthTokenFactory(LocalStorageFactory) {
    const key = 'auth-token';

    return {
      getToken,
      setToken,
      deleteToken
    };

    function getToken() {
      let token=LocalStorageFactory.getItem(key);
      LocalStorageFactory.setItem(key, token);
      return token;
    }

    function setToken(token) {
      LocalStorageFactory.setItem(key, token);
    }

    function deleteToken() {
      LocalStorageFactory.removeItem(key);
    }
  }])

  .factory('UserFactory', ['$q', '$http', 'AuthTokenFactory', 'LocalStorageFactory', function UserFactory($q, $http, AuthTokenFactory, LocalStorageFactory) {
    let userData={};

    return {
      login,
      logout,
      userData
    };

    function login(email, password) {
      return $http.post('http://eggnogg:8000/token', {
        email: email,
        password: password
      }).then(function success(response) {
        const token=response.data.token;
        AuthTokenFactory.setToken(token);
        delete response.data.token;
        userData=response.data;
        LocalStorageFactory.setItem('userId',response.data.id);
        LocalStorageFactory.setItem('username',response.data.username);
        return response;
      }, function failure(error) {
        return $q.reject(error);
      });
    }

    function logout() {
      AuthTokenFactory.deleteToken();
    }
  }])

  .factory('AuthInterceptor', ['AuthTokenFactory', function AuthInterceptor(AuthTokenFactory) {
    return {
      request: addToken
    };

    function addToken(config) {
      var token = AuthTokenFactory.getToken();
      console.log('token state:',token);
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = token;
      }
      return config;
    }
  }])

  .service('BlankService', [function () {

  }])

  .service('tokenService', ['AuthTokenFactory', '$http', function tokenService(AuthTokenFactory, $http) {

    const service = this;

    service.checkToken = checkToken;

    function checkToken() {
      const currentToken = AuthTokenFactory.getToken();
      if (currentToken) {
        $http.get('eggnogg:8000/token')
          .then((tokenValid) => {
            if (tokenValid === true) {
              console.log('token valid! keeping it.');
              return true;
            } else {
              console.log('token invalid! removing it.');
              AuthTokenFactory.deleteToken();
              return false;
            }
          }, (error) => {
            console.log('tokenCheck error:',error);
            return false;
          });
      }
    }

  }])

  .service('networkService', ['$http', function($http) {

    const service = this;

    service.testNetwork = testNetwork;

    function testNetwork () {
      return $http.get("http://eggnogg:8000/")
        .then(() => {
          console.log('NETWORK SUCCESS!');
          return true;
        }, () => {
          console.log('NETWORK ERROR!');
          return false;
        });
    }
  }])

  .service('filesService', ['$http', function ($http) {

    // once getFiles has been called, access the files object via filesService.files //

    const service = this;

    service.getFiles = getFiles;
    service.parseIcons = parseIcons;

    function getFiles() {
      return $http.get("http://eggnogg:8000/uploads/")
        .success(function (uploads) {
          service.files = parseIcons(uploads);
          return service.files;
        })
        .error(function (data) {
          alert(`error: ${data}`);
        });
    }

    function parseIcons(files) {
      let type, filename, post;
      for (let key in files) {
        post = files[key];
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
      return files;
    }
  }]);

// // TEST DATA FOR OFFLINE USE//
// this.files = {
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
// return parseIcons(this.files);
