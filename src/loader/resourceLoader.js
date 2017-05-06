import _ from 'lodash';
const PIXI = require('pixi.js');

export default class ResourceLoader {
    constructor() {

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
    static _make() {
        return new PIXI.loaders.Loader();
    }

    /**
     * 로딩중인 상태인지 확인 로딩 중이면 해당로드에 추가로 로드 할 주소를 넣을 수 없다.
     * @param app
     * @return {boolean}
     */
    static _isLoading(app) {
        return app.loading;
    }


    /**
     * 로드 가능한 로더를 가져온다 없을 경우 만든다. TODO 너무 많이 로드를 생성 할 경우 가 생길 수 있음 적당한 해결 책이 필요하다 (예 10개 이상 로더를 만들면 1~2초 정도 기다린 후 시도한다.) 나중에 만들어야 됨
     * @return {*}
     * @private
     */
    _getAbleApp() {
        _.forEach(this._apps, (app) => {
            if (!ResourceLoader._isLoading(app)) {
                return app;
            }
        });
        const newApp = ResourceLoader._make();
        this._apps.push(newApp);
        return newApp;
    }

    /**
     * 콜백 없이 로드 할때 주로 미리 로딩 하고 싶을 때.
     * @param url
     * @return {boolean}
     */
    add(url) {
        if (_.isUndefined(this._resources[url])) {
            this._resources[url] = null;
            this._getAbleApp().add(url, url);
            return true;
        } else if (_.isNull(this._resources[url])) {
            return true;
        }
        return false;
    }

    /**
     * 콜백 없이 로드 할때 주로 미리 로딩 하고 싶을 때.
     * @param URLs
     */
    addMany(URLs) {
        if (_.isArray(URLs)) {
            _.forEach(URLs, (URL) => {
                this.add(URL);
            })
        }
    }

    /**
     * 이벤트 등록 기본으로는 메인인 apps[0]
     * @param eventName
     * @param callback
     * @param app
     * @return {boolean}
     */
    on(eventName, callback, app = this._apps[0]) {
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
    getResource(URL, callback) {
        if (_.isNull(this._resources[URL])) {
            this._addCompleteCallback(URL, callback);
        } else if (_.isUndefined(this._resources[URL])) {
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
    getResourceMany(urlArray) {
        _.forEach(urlArray, (value) => {
            if (_.isString(value.url) && _.isFunction(value.callback)) {
                this.getResource(value.url, value.callback);
            }
        });
    }

    /**
     * 로딩 하고 있지 않는 모든 로더를 실행 한다.
     */
    load() {
        _.forEach(this._apps, (app) => {
            if (!ResourceLoader._isLoading(app)) {
                this.on('progress', this._eachComplete.bind(this), app);
                return app.load();
            }
        });
    }

    _addCompleteCallback(url, callback) {
        if (!_.isArray(this._completeCallbacks[url])) {
            this._completeCallbacks[url] = [];
        }
        this._completeCallbacks[url].push(callback);
    }

    _eachComplete(loader, resource) {
        this._resources[resource.name] = resource;
        if (_.isArray(this._completeCallbacks[resource.name])) {
            _.forEach(this._completeCallbacks[resource.name], (value) => {
                value(this._resources[resource.name]);
            });
        }
        this._completeCallbacks[resource.name] = null;
    }
}