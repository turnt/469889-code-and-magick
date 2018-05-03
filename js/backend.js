'use strict';

(function(){
  var URL = 'https://js.dump.academy/code-and-magick/data';

  var errorCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
  };

  var xhrLoad = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case errorCode.OK:
          onLoad(xhr.response);
          break;
        case errorCode.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case errorCode.NOT_FOUND:
          onError('Запрашиваемый ресурс не найден');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 1; // 10s

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = xhrLoad(onLoad, onError);

    xhr.open('GET', URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = xhrLoad(onLoad, onError);

    xhr.open('GET', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  }
})();
