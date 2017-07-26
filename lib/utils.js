"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coalesce = coalesce;
exports.coalesceProp = coalesceProp;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function coalesce() {
  var newValue = void 0;

  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  values.every(function (value) {
    newValue = value;
    return value == null;
  });
  return newValue;
}

function coalesceProp(prop) {
  for (var _len2 = arguments.length, objects = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    objects[_key2 - 1] = arguments[_key2];
  }

  return coalesce.apply(undefined, _toConsumableArray(objects.map(function (obj) {
    return obj[prop];
  })));
}