'use strict';
angular.module('app.services', [])

  .factory('BlankFactory', [function () {

  }])

  .service('BlankService', [function () {

  }])

  .service('filesService', ['$http', function ($http) {

    // once getFiles has been called, access the files object via filesService.files //

    this.getFiles = getFiles;
    this.parseIcons = parseIcons;

    function getFiles() {
      // TEST DATA FOR OFFLINE USE//
      this.files = {
        test1: {
          path: "/file/new.mp3",
          name: "new.mp3",
          username: "TESTUSER"
        },
        test2: {
          path: "/file/other.mp4",
          name: "other.mp4",
          username: "TESTUSER2"
        },
        test3: {
          path: "/file/test.docx",
          name: "test.docx",
          username: "TESTUSER3"
        },
        test4: {
          path: "/file/newthing.tif",
          name: "newthing.tif",
          username: "TESTUSER4"
        }
      };
      return parseIcons(this.files);
    //   return $http.get("http://eggnogg:8000/uploads/")
    //     .success(function (uploads) {
    //       this.files=parseIcons(uploads);
    //       return this.files;
    //     })
    //     .error(function (data) {
    //       alert(`error: ${data}`);
    //     });
    // }

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
