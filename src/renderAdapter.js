import adapter_config from './config/adapter';
import StageAdapter from './stageAdapter';
export default class RenderAdapter {
    constructor(width, height, options) {
        this._make(width, height, options);
        this._stage = new StageAdapter(this._app.stage);
    }

    _make(width, height, options) {
        this._app = new adapter_config.Renderer(width, height, RenderAdapter._decodeOption(options));
    }

    static _decodeOption(options) {
        return options;
    }

    get view() {
        return this._app.view;
    }

    get stage() {
        return this._stage;
    }

    get dataURL() {
        return this._app.extract.base64();
    }
}