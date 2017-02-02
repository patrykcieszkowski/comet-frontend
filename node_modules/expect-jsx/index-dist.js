'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _collapseWhiteSpace = require('collapse-white-space');

var _collapseWhiteSpace2 = _interopRequireDefault(_collapseWhiteSpace);

var _reactElementToJsxString = require('react-element-to-jsx-string');

var _reactElementToJsxString2 = _interopRequireDefault(_reactElementToJsxString);

var api = {
  toEqualJSX: function toEqualJSX(ReactElement) {
    return (0, _expect2['default'])((0, _reactElementToJsxString2['default'])(this.actual)).toEqual((0, _reactElementToJsxString2['default'])(ReactElement));
  },
  toNotEqualJSX: function toNotEqualJSX(ReactElement) {
    return (0, _expect2['default'])((0, _reactElementToJsxString2['default'])(this.actual)).toNotEqual((0, _reactElementToJsxString2['default'])(ReactElement));
  },
  toIncludeJSX: function toIncludeJSX(ReactElement) {
    return (0, _expect2['default'])((0, _collapseWhiteSpace2['default'])((0, _reactElementToJsxString2['default'])(this.actual))).toInclude((0, _collapseWhiteSpace2['default'])((0, _reactElementToJsxString2['default'])(ReactElement)));
  },
  toNotIncludeJSX: function toNotIncludeJSX(ReactElement) {
    return (0, _expect2['default'])((0, _collapseWhiteSpace2['default'])((0, _reactElementToJsxString2['default'])(this.actual))).toExclude((0, _collapseWhiteSpace2['default'])((0, _reactElementToJsxString2['default'])(ReactElement)));
  }
};

exports['default'] = api;
module.exports = exports['default'];
