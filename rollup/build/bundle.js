(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.PromiseOption = factory());
})(this, (function () { 'use strict';

  const fulfilledFirst$1 = new Promise((res, rej) => {
rst");
  });
  const fulfilledSecond$1 = new Promise((res, rej) => {
      setTimeout(res, 300, "fulfilledSecond");
  });
  const fulfilledThird$1 = new Promise((res, rej) => {
      setTimeout(res, 100, "fulfilledThird");
  });
  const refusal$1 = new Promise((res, rej) => {
      rej(new Error("refusal"));
  });
  function PromiseAll(promises) {
      return new Promise((res, rej) => {
          const results = [];
          let count = 0;
          promises.forEach((data, index) => {
              data
                  .then((value) => {
                  results[index] = value;
                  count++;
                  if (count === promises.length) {
                      res(results);
                  }
              })
                  .catch(rej);
          });
      });
  }
  const PromiseAllBundle = PromiseAll([
      fulfilledFirst$1,
      fulfilledSecond$1,
      fulfilledThird$1,
      refusal$1,
  ])
      .then((result) => {
      console.log("result", result);
  })
      .catch((error) => {
      console.log(error.message);
  });
  var PromiseAllBundle$1 = { PromiseAllBundle };

  function indentString(string, count = 1, options = {}) {
  	const {
  		indent = ' ',
  		includeEmptyLines = false
  	} = options;

  	if (typeof string !== 'string') {
  		throw new TypeError(
  			`Expected \`input\` to be a \`string\`, got \`${typeof string}\``
  		);
  	}

  	if (typeof count !== 'number') {
  		throw new TypeError(
  			`Expected \`count\` to be a \`number\`, got \`${typeof count}\``
  		);
  	}

  	if (count < 0) {
  		throw new RangeError(
  			`Expected \`count\` to be at least 0, got \`${count}\``
  		);
  	}

  	if (typeof indent !== 'string') {
  		throw new TypeError(
  			`Expected \`options.indent\` to be a \`string\`, got \`${typeof indent}\``
  		);
  	}

  	if (count === 0) {
  		return string;
  	}

  	const regex = includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;

  	return string.replace(regex, indent.repeat(count));
  }

  var global$1 = (typeof global !== "undefined" ? global :
    typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window : {});

  /*
  The MIT License (MIT)

  Copyright (c) 2016 CoderPuppy

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  */
  var _endianness;
  function endianness() {
    if (typeof _endianness === 'undefined') {
      var a = new ArrayBuffer(2);
      var b = new Uint8Array(a);
      var c = new Uint16Array(a);
      b[0] = 1;
      b[1] = 2;
      if (c[0] === 258) {
        _endianness = 'BE';
      } else if (c[0] === 513){
        _endianness = 'LE';
      } else {
        throw new Error('unable to figure out endianess');
      }
    }
    return _endianness;
  }

  function hostname() {
    if (typeof global$1.location !== 'undefined') {
      return global$1.location.hostname
    } else return '';
  }

  function loadavg() {
    return [];
  }

  function uptime() {
    return 0;
  }

  function freemem() {
    return Number.MAX_VALUE;
  }

  function totalmem() {
    return Number.MAX_VALUE;
  }

  function cpus() {
    return [];
  }

  function type() {
    return 'Browser';
  }

  function release () {
    if (typeof global$1.navigator !== 'undefined') {
      return global$1.navigator.appVersion;
    }
    return '';
  }

  function networkInterfaces () {
    return {};
  }

  function getNetworkInterfaces () {
    return {};
  }

  function arch() {
    return 'javascript';
  }

  function platform() {
    return 'browser';
  }

  function tmpDir() {
    return '/tmp';
  }
  var tmpdir = tmpDir;

  var EOL = '\n';

  function homedir(){
    return '$HOME'
  }

  var os = {
    homedir: homedir,
    EOL: EOL,
    arch: arch,
    platform: platform,
    tmpdir: tmpdir,
    tmpDir: tmpDir,
    networkInterfaces:networkInterfaces,
    getNetworkInterfaces: getNetworkInterfaces,
    release: release,
    type: type,
    cpus: cpus,
    totalmem: totalmem,
    freemem: freemem,
    uptime: uptime,
    loadavg: loadavg,
    hostname: hostname,
    endianness: endianness,
  };

  function escapeStringRegexp(string) {
  	if (typeof string !== 'string') {
  		throw new TypeError('Expected a string');
  	}

  	// Escape characters with special meaning either inside or outside character sets.
  	// Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  	return string
  		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
  		.replace(/-/g, '\\x2d');
  }

  const extractPathRegex = /\s+at.*[(\s](.*)\)?/;
  const pathRegex = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
  const homeDir = typeof os.homedir === 'undefined' ? '' : os.homedir().replace(/\\/g, '/');

  function cleanStack(stack, {pretty = false, basePath} = {}) {
  	const basePathRegex = basePath && new RegExp(`(at | \\()${escapeStringRegexp(basePath.replace(/\\/g, '/'))}`, 'g');

  	if (typeof stack !== 'string') {
  		return undefined;
  	}

  	return stack.replace(/\\/g, '/')
  		.split('\n')
  		.filter(line => {
  			const pathMatches = line.match(extractPathRegex);
  			if (pathMatches === null || !pathMatches[1]) {
  				return true;
  			}

  			const match = pathMatches[1];

  			// Electron
  			if (
  				match.includes('.app/Contents/Resources/electron.asar') ||
  				match.includes('.app/Contents/Resources/default_app.asar') ||
  				match.includes('node_modules/electron/dist/resources/electron.asar') ||
  				match.includes('node_modules/electron/dist/resources/default_app.asar')
  			) {
  				return false;
  			}

  			return !pathRegex.test(match);
  		})
  		.filter(line => line.trim() !== '')
  		.map(line => {
  			if (basePathRegex) {
  				line = line.replace(basePathRegex, '$1');
  			}

  			if (pretty) {
  				line = line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDir, '~')));
  			}

  			return line;
  		})
  		.join('\n');
  }

  const cleanInternalStack = stack => stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, '');

  class AggregateError extends Error {
  	#errors;

  	name = 'AggregateError';

  	constructor(errors) {
  		if (!Array.isArray(errors)) {
  			throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
  		}

  		errors = errors.map(error => {
  			if (error instanceof Error) {
  				return error;
  			}

  			if (error !== null && typeof error === 'object') {
  				// Handle plain error objects with message property and/or possibly other metadata
  				return Object.assign(new Error(error.message), error);
  			}

  			return new Error(error);
  		});

  		let message = errors
  			.map(error => {
  				// The `stack` property is not standardized, so we can't assume it exists
  				return typeof error.stack === 'string' && error.stack.length > 0 ? cleanInternalStack(cleanStack(error.stack)) : String(error);
  			})
  			.join('\n');
  		message = '\n' + indentString(message, 4);
  		super(message);

  		this.#errors = errors;
  	}

  	get errors() {
  		return this.#errors.slice();
  	}
  }

  const fulfilledFirst = new Promise((res, rej) => {
      setTimeout(res, 100, "fulfilledFirst");
      // rej(new Error("refusal"));   AggregateError
  });
  const fulfilledSecond = new Promise((res, rej) => {
      setTimeout(res, 300, "fulfilledSecond");
      // rej(new Error("refusal"));   AggregateError
  });
  const fulfilledThird = new Promise((res, rej) => {
      setTimeout(res, 500, "fulfilledThird");
      // rej(new Error("refusal"));   AggregateError
  });
  const refusal = new Promise((res, rej) => {
      rej(new Error("refusal"));
  });
  function PromiseAny(promises) {
      return new Promise((res, rej) => {
          const result = [];
          let count = 0;
          let resState = false;
          promises.forEach((data, index) => {
              data
                  .then((value) => {
                  if (!resState) {
                      resState = true;
                      res(value);
                  }
              })
                  .catch((error) => {
                  result[index] = error;
                  count++;
                  if (count === promises.length && !resState) {
                      rej(new AggregateError(result));
                  }
              });
          });
      });
  }
  const PromiseAnyBundle = PromiseAny([
      fulfilledFirst,
      fulfilledSecond,
      fulfilledThird,
      refusal,
  ])
      .then((result) => {
      console.log("result", result);
  })
      .catch((err) => {
      console.log(err.errors);
  });
  var PromiseAnyBundle$1 = { PromiseAnyBundle };

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise */


  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function sequential(promiseFunctions) {
      return __awaiter(this, void 0, void 0, function* () {
          for (const promiseFn of promiseFunctions) {
              yield promiseFn();
          }
      });
  }
  function createSequential(value) {
      return new Promise((resolve) => {
          setTimeout(() => {
              console.log(`order: ${value}`);
              resolve();
          }, 100);
      });
  }
  const promises = [
      () => createSequential(1),
      () => createSequential(2),
      () => createSequential(3),
  ];
  const SequentialBundle = sequential(promises);
  var SequentialBundle$1 = { SequentialBundle };

  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  function sleep(time) {
      return new Promise((resolve) => {
          setTimeout(resolve, time);
      });
  }
  function test() {
      console.log(year, "year");
      sleep(2000)
          .then(() => console.log(month, "month"))
          .then(() => console.log(date, "date"));
  }
  const SleepBundle = (test);
  // 왜 sleep을 사용하는가?
  // 비동기 작업의 시간 조정
  // 디버깅 및 테스트에 유용
  var SleepBundle$1 = { SleepBundle };

  var main = {
      PromiseAllBundle: PromiseAllBundle$1,
      PromiseAnyBundle: PromiseAnyBundle$1,
      SequentialBundle: SequentialBundle$1,
      SleepBundle: SleepBundle$1,
  };

  return main;

}));
