'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _videoRenderer = require('../renderer/videoRenderer');

var _videoRenderer2 = _interopRequireDefault(_videoRenderer);

var _imageRenderer = require('../renderer/imageRenderer');

var _imageRenderer2 = _interopRequireDefault(_imageRenderer);

var _animationRenderer = require('../renderer/animationRenderer');

var _animationRenderer2 = _interopRequireDefault(_animationRenderer);

var _rectangleRenderer = require('../renderer/rectangleRenderer');

var _rectangleRenderer2 = _interopRequireDefault(_rectangleRenderer);

var _textRenderer = require('../renderer/textRenderer');

var _textRenderer2 = _interopRequireDefault(_textRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    video: _videoRenderer2.default,
    image: _imageRenderer2.default,
    animation: _animationRenderer2.default,
    rectangle: _rectangleRenderer2.default,
    text: _textRenderer2.default
};