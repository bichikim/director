import adapter_config from './config/adapter';
import _ from 'lodash';

export default class ResourceLoader {
    constructor() {
        this._make();
        this._resources = [];
        this._resources_callback = {};
    }

    _make() {
        this._app = new adapter_config.Loader();
    }

    add(name, url) {
        return this._app.add(name, url);
    }

    getResource(name, callback) {

    }

    _endLoad(loader, resources) {

    }

    load() {
        this._app.load(this._endLoad.bind(this));
    }

    addMany(resources) {
        if (_.isArray(resources)) {
            _.forEach(resources, (value) => {
                this.add(value, value);
            })
        }
    }
}