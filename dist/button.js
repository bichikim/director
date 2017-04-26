'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function () {
    function Button() {
        _classCallCheck(this, Button);
    }

    _createClass(Button, null, [{
        key: 'make',
        value: function make(displayObject, buttonLogic, actions) {
            displayObject.interactive = true;
            displayObject.buttonMode = true;
            if (_lodash2.default.isObject(buttonLogic)) {
                if (_lodash2.default.isString(buttonLogic.click)) {
                    var callback = Button.makeCallback(displayObject, buttonLogic.click, actions);
                    displayObject.on('tap', callback);
                    displayObject.on('click', callback);
                }
                if (_lodash2.default.isString(buttonLogic.hover)) {
                    var _callback = Button.makeCallback(displayObject, buttonLogic.hover, actions);
                    displayObject.on('mouseover', _callback);
                }
            }
        }
    }, {
        key: 'makeCallback',
        value: function makeCallback(displayObject, stringLogic, actions) {
            var callbacks = [],
                parts = stringLogic.split('&');
            _lodash2.default.forEach(parts, function (part) {
                var myParts = part.split('=');
                switch (myParts[0]) {
                    case 'effect':
                        callbacks.push(function (myAction, myDisplayObject, myNumber) {
                            return function () {
                                myAction(myDisplayObject, myNumber);
                            };
                        }(actions.effect, displayObject, myParts[1]));
                        break;
                    case 'display':
                        callbacks.push(function (myAction, myData) {
                            return function () {
                                myAction(myData);
                            };
                        }(actions.display, myParts[1]));
                        break;
                    case 'share':
                        callbacks.push(function (myAction, myData) {
                            return function () {
                                myAction(myData);
                            };
                        }(actions.share));
                        break;
                    case 'side':
                        callbacks.push(function (myAction, mySide) {
                            return function () {
                                myAction(mySide);
                            };
                        }(actions.side, myParts[1]));
                    //no default
                }
            });

            return function (myCallbacks) {
                return function () {
                    myCallbacks.forEach(function (value) {
                        value();
                    });
                };
            }(callbacks);
        }
    }]);

    return Button;
}();

exports.default = Button;