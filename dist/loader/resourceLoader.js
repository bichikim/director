'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PIXI = require('pixi.js');

var ResourceLoader = function () {
    function ResourceLoader() {
        _classCallCheck(this, ResourceLoader);

        /**
         * 로드된 아이탬들이 저장 된다. 이미 로드 되었다면 로드된 것을 쓴다.
         * @type {{}}
         * @private
         */
        this._resources = {};

        /**
         * 아이탬이 로드 된 후 실행 되야 할 콜백들이 들어 있다. this._resources 와 키값이 매칭 된다.
         * @type {{}}
         * @private
         */
        this._completeCallbacks = {};

        /**
         * 로드 배열 처음 하나가 들어 있다.
         * @type {[*]}
         * @private
         */
        this._apps = [ResourceLoader._make()];
    }

    /**
     * 새로운 로더를 만든다.
     * @return {*}
     * @private
     */


    _createClass(ResourceLoader, [{
        key: '_getAbleApp',


        /**
         * 로드 가능한 로더를 가져온다 없을 경우 만든다. TODO 너무 많이 로드를 생성 할 경우 문제가 생긴다 적당한 해결 책이 필요하다 나중에 만들어야 됨
         * @return {*}
         * @private
         */
        value: function _getAbleApp() {
            _lodash2.default.forEach(this._apps, function (app) {
                if (!ResourceLoader.isLoading(app)) {
                    return app;
                }
            });
            var newApp = ResourceLoader._make();
            this._apps.push(newApp);
            return newApp;
        }

        /**
         * 콜백 없이 로드 할때 주로 미리 로딩 하고 싶을 때.
         * @param url
         * @return {boolean}
         */

    }, {
        key: 'add',
        value: function add(url) {
            if (_lodash2.default.isUndefined(this._resources[url])) {
                this._resources[url] = null;
                this._getAbleApp().add(url, url);
                return true;
            } else if (_lodash2.default.isNull(this._resources[url])) {
                return true;
            }
            return false;
        }

        /**
         * 콜백 없이 로드 할때 주로 미리 로딩 하고 싶을 때.
         * @param URLs
         */

    }, {
        key: 'addMany',
        value: function addMany(URLs) {
            var _this = this;

            if (_lodash2.default.isArray(URLs)) {
                _lodash2.default.forEach(URLs, function (URL) {
                    _this.add(URL);
                });
            }
        }

        /**
         * 이벤트 등록 기본으로는 메인인 apps[0]
         * @param eventName
         * @param callback
         * @param app
         * @return {boolean}
         */

    }, {
        key: 'on',
        value: function on(eventName, callback) {
            var app = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._apps[0];

            switch (eventName) {
                case 'progress':
                    app.onProgress.add(callback);
                    return true;
                case 'error':
                    app.onError.add(callback);
                    return true;
                case 'load':
                    app.onLoad.add(callback);
                    return true;
                case 'complete':
                    app.onComplete.add(callback);
                    return true;
                //no default
            }
            return false;
        }

        /**
         * 로드 하고 싶은 리소스를 요청한다 이미 있으면 바로 콜백으로 넘겨 준다. 주로 당장 사용하고 싶은 리소스를 로드 할때 쓴다.
         * @param URL
         * @param callback
         */

    }, {
        key: 'getResource',
        value: function getResource(URL, callback) {
            if (_lodash2.default.isNull(this._resources[URL])) {
                this._addCompleteCallback(URL, callback);
            } else if (_lodash2.default.isUndefined(this._resources[URL])) {
                this.add(URL);
                this._addCompleteCallback(URL, callback);
            } else {
                callback(this._resources[URL]);
            }
        }

        /**
         * 로드 하고 싶은 리소스를 요청한다 이미 있으면 바로 콜백으로 넘겨 준다. 주로 당장 사용하고 싶은 리소스를 로드 할때 쓴다.
         * @param urlArray
         */

    }, {
        key: 'getResourceMany',
        value: function getResourceMany(urlArray) {
            var _this2 = this;

            _lodash2.default.forEach(urlArray, function (value) {
                if (_lodash2.default.isString(value.url) && _lodash2.default.isFunction(value.callback)) {
                    _this2.getResource(value.url, value.callback);
                }
            });
        }

        /**
         * 로딩 하고 있지 않는 모든 로더를 실행 한다.
         */

    }, {
        key: 'load',
        value: function load() {
            var _this3 = this;

            _lodash2.default.forEach(this._apps, function (app) {
                if (!ResourceLoader.isLoading(app)) {
                    _this3.on('progress', _this3._eachComplete.bind(_this3), app);
                    return app.load();
                }
            });
        }
    }, {
        key: '_addCompleteCallback',
        value: function _addCompleteCallback(url, callback) {
            if (!_lodash2.default.isArray(this._completeCallbacks[url])) {
                this._completeCallbacks[url] = [];
            }
            this._completeCallbacks[url].push(callback);
        }
    }, {
        key: '_eachComplete',
        value: function _eachComplete(loader, resource) {
            var _this4 = this;

            this._resources[resource.name] = resource;
            if (_lodash2.default.isArray(this._completeCallbacks[resource.name])) {
                _lodash2.default.forEach(this._completeCallbacks[resource.name], function (value) {
                    value(_this4._resources[resource.name]);
                });
            }
            this._completeCallbacks[resource.name] = null;
        }
    }], [{
        key: '_make',
        value: function _make() {
            return new PIXI.loaders.Loader();
        }

        /**
         * 로딩중인 상태인지 확인 로딩 중이면 해당로드에 추가로 로드 할 주소를 넣을 수 없다.
         * @param app
         * @return {boolean}
         */

    }, {
        key: 'isLoading',
        value: function isLoading(app) {
            return app.loading;
        }
    }]);

    return ResourceLoader;
}();

exports.default = ResourceLoader;