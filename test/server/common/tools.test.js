let tools = require('../../../server/common/tools')

describe('test/server/common/tools.test.js', () => {
  it('should format date', () => {
    tools.formatDate(new Date(0)).should.match(/1970\-01\-01 0\d:00/)
  })
  it('should format date friendly', () => {
    tools.formatDate(new Date(), true).should.equal('几秒前')
  })
})
