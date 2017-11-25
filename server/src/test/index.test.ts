/* eslint-env node, mocha */

import server from '../';

describe('Server.listen()', () => {
  it('should wrap an http server', (done) => {
    server.listen(5000, () => {
      server.close();
      done();
    });
  });
});
