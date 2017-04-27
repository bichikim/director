'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    video: {
        callback: function callback(displayLogic) {
            if (_lodash2.default.isArray(displayLogic.videos)) {
                this._renderers.video.render(displayLogic.videos);
            }
        }
    },
    image: {
        callback: function callback(displayLogic) {
            if (_lodash2.default.isArray(displayLogic.images)) {
                this._renderers.image.render(displayLogic.images);
            }
        }
    },
    animation: {
        callback: function callback(displayLogic) {
            if (_lodash2.default.isArray(displayLogic.animations)) {
                this._renderers.animation.render(displayLogic.animations);
            }
        }
    },
    button: {
        callback: function callback(displayLogic) {
            if (_lodash2.default.isArray(displayLogic.buttons)) {
                this._renderers.rectangle.render(displayLogic.buttons);
            }
        }
    },
    text: {
        callback: function callback(displayLogic) {
            if (_lodash2.default.isArray(displayLogic.texts)) {
                this._renderers.text.render(displayLogic.texts);
            }
        }
    }
};