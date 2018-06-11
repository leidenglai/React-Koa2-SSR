import React, { PureComponent } from 'react'
import { Layout, Button } from 'antd'
import { connect } from 'react-redux'
import ClipboardButton from 'react-clipboard.js'
import { FormattedMessage } from 'react-intl'

import { getSellerBaseProfile } from 'actions/user'
const { Header, Content } = Layout
/**
 * 本组件为登录模块的容器页
 * 由于与app内容模块布局不一样
 * 所以区别于App.js
 */

class BrowserError extends PureComponent {
  constructor(props) {
    super(props)

    props.getSellerBaseProfile()
  }

  handleCopy() {
    // find target element
  }

  render() {
    return (
      <div style={styles.container} className="container">
        <Layout style={styles.container}>
          <Header style={styles.topLogo}>
            <div
              style={{
                ...styles.logo,
                backgroundImage: `url(${require('static/logo@2x-black.png')})`
              }}
            />
          </Header>
          <Content style={{ flex: 1, backgroundColor: '#fff' }}>
            <div style={{ height: '100%', maxWidth: 1230, margin: '0 auto' }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: 700,
                  backgroundColor: '#ecf3f8',
                  margin: '0 auto',
                  textAlign: 'center',
                  paddingTop: '10%',
                  paddingLeft: '10%',
                  paddingRight: '10%',
                  fontSize: 16,
                  color: '#232323'
                }}>
                <img
                  src={require('static/browserError.jpg')}
                  alt="The browser you are currently using does not support reseller login at the moment."
                />
                <h2 style={{ fontSize: 26, lineHeight: 1.2 }}>
                  <FormattedMessage id="browser_not_support_tips_title" />
                </h2>
                <p style={{ marginTop: 10 }}>
                  <FormattedMessage id="browser_not_support_tips_info" />
                </p>
                <p>
                  <FormattedMessage id="you_login_address" />{' '}
                </p>
                <ClipboardButton
                  className="ant-btn ant-btn-primary ant-btn-lg"
                  style={{ marginTop: 30, borderRadius: 16, padding: '4px 40px 5px 40px' }}
                  data-clipboard-text={'/account'}>
                  <FormattedMessage id="copy_the_login_link" />
                </ClipboardButton>
                <Button style={{ display: 'none' }} />
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    )
  }
}

const styles = {
  container: { height: '100vh' },
  topLogo: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e9e9e9'
  },
  logo: {
    height: 64,
    width: '100%',
    backgroundPosition: 'center center',
    backgroundSize: '180px 25px',
    backgroundRepeat: 'no-repeat'
  },
  loginBox: {
    marginTop: 100,
    textAlign: 'center'
  }
}

// 将组件包装成端对端组件
const mapStateToProps = ({ userData }) => {
  return { userData }
}

export default connect(mapStateToProps, { getSellerBaseProfile })(BrowserError)
