/*!
  @tkskto/vue-component-analyzer v0.1.2
  https://github.com/tkskto/
  Released under the MIT License.
*/
'use strict';

class FileCounter {
    constructor() {
        this._count = {};
    }
    add(filename) {
        if (Object.prototype.hasOwnProperty.call(this._count, filename)) {
            this._count[filename]++;
        }
        else {
            this._count[filename] = 1;
        }
    }
    get count() {
        return this._count;
    }
}
module.exports = FileCounter;
