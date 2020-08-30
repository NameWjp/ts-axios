// 详见 https://github.com/jasmine/jasmine-ajax/issues/178

const JasmineCore = require('jasmine-core')
// @ts-ignore
global.getJasmineRequireObj = function() {
  return JasmineCore
}
require('jasmine-ajax')
