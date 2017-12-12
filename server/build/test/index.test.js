"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../");
describe('Server.listen()', () => {
    it('should wrap an http server', (done) => {
        _1.server.listen(5000, () => {
            _1.server.close();
            done();
        });
    });
});
