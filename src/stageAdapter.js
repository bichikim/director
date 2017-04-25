import adapter_config from './config/adapter';
import _ from 'lodash';
export default class StageAdapter {
    constructor(name, director, stage) {
        if (_.isNil(stage)) {
            this._app = StageAdapter._make();
        } else {
            this._app = stage;
        }
        this._ditector = director;
        this.z_index = null;
        this._app.name = name;
        //this._children = [];
    }

    static _make() {
        return new adapter_config.Stage();
    }

    load(url, callback) {
        this._director.load(url, callback);
    }

    getChild(name) {
        let stage = null;
        _.forEach(this._app.children, function (child) {
            if (child.name === name) {
                stage = child;
                return false;
            }
        });
        return stage
    }

    addChild(renderObject) {
        //this._children.push(renderObject);
        this._app.addChild(renderObject.app);
        this.updateIndexOrder();
    }

    removeChildren(beginIndex, endIndex) {
        //_.slice(this._children, beginIndex, _.isNil(endIndex)? this._children.length : endIndex);
        this._app.removeChildren(beginIndex, endIndex);
    }

    set z_index(index) {
        const nextIndexStep = 1;
        if (_.isNumber(index)) {
            let isHasIndex = false;
            _.forEach(this._app.parent.children, (child) => {
                if (child.z_index === index) {
                    isHasIndex = true;
                } else if (child.z_index > index && isHasIndex) {
                    child.z_index += 1;
                }
            });
            this._app.z_index = index;
            this.updateIndexOrder();
        } else if (_.isNil(this._app.parent) || this._app.parent.children.length < 1) {
            this._app.z_index = 0;
        } else {
            this._app.z_index = this._app.parent.children[this._app.parent.children.length - 1].z_index + nextIndexStep;
        }
    }

    get z_index() {
        return this._app.z_index;
    }

    get app() {
        return this._app;
    }

    updateIndexOrder() {
        this._app.children.sort(function (a, b) {
            a.z_index = a.z_index || 0;
            b.z_index = b.z_index || 0;
            return a.z_index - b.z_index;
        })
    }
}