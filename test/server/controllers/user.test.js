const _ = require('lodash')

const app = require('../../../server/server.dev')
const user = require('../../../server/controllers/user')
const request = require('supertest')(app)
const support = require('../support/support')

function randomInt() {
  return (Math.random() * 10000).toFixed(0)
}

// 测试用户默认数据
const testUserDef = {
  pass: '123456',
  shareData: [
    {
      key: 'facebook',
      appId: '123456789'
    }
  ]
}

describe('test/server/controllers/user.test.js', () => {
  let testUser = {}

  before(done => {
    const key = new Date().getTime() + '_' + randomInt()

    const userData = _.assign(
      {
        email: `geTest${key}@gmail.com`,
        phone: '1324110' + randomInt(),
        isNew: true
      },
      testUserDef
    )

    support.createUser(userData).then(
      () => {
        // 调用登录
        request
          .get(`/api/user/login?email=${userData.email}&pass=${userData.pass}`)
          .expect(200, (err, res) => {
            testUser = res.body.data
            done()
          })
      },
      err => {
        done(err)
      }
    )
  })

  describe('#getSharekey()', () => {
    it('返回值是promise对象', () => {
      user.getSharekey({ userData: { uid: testUser.uid } }).should.be.a.Promise()
    })

    it('请求成功返回shareData', done => {
      request.get('/api/user/getSharekey?webToken=' + testUser.webToken).expect(200, (err, res) => {
        res.body.data.should.be.eql(testUserDef.shareData)
        done(err)
      })
    })
  })

  describe('#getSellerBaseProfile()', () => {
    it('返回值是promise对象', () => {
      user.getSellerBaseProfile({ userData: { uid: testUser.uid } }).should.be.a.Promise()
    })

    it('请求成功返回userData', done => {
      request
        .get('/api/user/getSellerBaseProfile?webToken=' + testUser.webToken)
        .expect(200, (err, res) => {
          res.body.data.uid.should.be.eql(testUser.uid)
          done(err)
        })
    })
  })

  describe('#registerUser()', () => {
    it('注册成功状态返回200', done => {
      const key = new Date().getTime() + '_' + randomInt()
      const userData = _.assign(
        {
          email: `geTest${key}@gmail.com`,
          phone: '1324110' + randomInt(),
          isNew: true
        },
        testUserDef
      )

      request.post('/api/user/register', userData).end((err, res) => {
        res.status.should.equal(200)
        done()
      })
    })
  })
})
