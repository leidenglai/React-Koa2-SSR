import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Steps, Button, Input, Alert, Layout, Icon } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
const { Content } = Layout
const { Step } = Steps

function IsPC() {
  const userAgentInfo = navigator.userAgent;
  const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

class NumericInput extends React.Component {
  onChange = (e) => {
    const { value } = e.target;
    const reg = /^[0-9]*$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  }

  handleReset = () => {
    // 清空数据
    this.props.onChange('');
  }

  render() {
    return <span className='forgotInput'>
      <Input
        {...this.props}
        size="large"
        onChange={this.onChange}
        suffix={this.props.value.length > 0 ? <Icon onClick={this.handleReset} type="close-circle-o" style={{cursor: 'pointer'}} /> : ''}
      />
    </span>
  }
}

class CaptchaButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 59,
      timerStart: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show != this.props.show || nextState.count != this.state.count
  }

  componentDidUpdate() {
    let that = this

    if (this.props.show && !this.state.timerStart) {

      that.setState({ timerStart: true })

      const timer = setInterval(function() {
        if (that.state.count <= 0) {
          that.props.btnChange()
          clearInterval(timer)
          that.setState({ count: 59, timerStart: false })
        } else {
          that.setState({ count: that.state.count - 1 })
        }
      }, 1000);
    }
  }
  render() {
    return (this.props.show ? (<span>({this.state.count})</span>) : null)
  }
}

class Forgot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageStepsType: props.params.type,
      current: 0,
      phoneNum: '',
      email: '',
      captcha: '',
      passWord: '',
      repeatPassWord: '',
      errorText: '',
      showError: false,
      timerType: false,
      pageType: 1 // 标记发送邮件成功页面
    }

    this.isPc = IsPC();
  }

  componentWillMount() {
    const { clearErrorInfo, location, checkUniqcode } = this.props
    const { account, uniqcode } = location.query

    clearErrorInfo()

    if (uniqcode) {
      if (this.state.pageStepsType === 'reset') {
        // 进入重置密码步骤
        this.setState({ current: 1 })

        // 重置密码的校验串
        this.uniqcode = uniqcode

        // 校验uniqcode
        checkUniqcode({ uniqcode }, () => {
          // 进入重置密码步骤
          this.setState({
            current: 0,
            pageStepsType: 'email'
          });
        })
      }
    }

    if (account) {
      // 判断忘记密码自动填入账号
      if (this.state.pageStepsType === 'phone') {
        this.setState({ phoneNum: account })
      } else if (this.state.pageStepsType === 'email') {
        // 邮箱
        this.setState({ email: account })
      }
    }
  }

  handlePhoneNum = (phoneNum) => {
    this.setState({ phoneNum, showError: false })
    this.props.userData.type = null
  }

  handleEmail = (e) => {
    const { value } = e.target;

    this.setState({ email: value, showError: false })
    this.props.userData.type = null
  }

  handleCaptcha = (captcha) => {
    this.setState({ captcha, showError: false })
    this.props.userData.type = null
  }

  handlePassWord = (event) => {
    this.setState({ passWord: event.target.value.trim(), showError: false })
  }

  handleRepeatPassWord = (event) => {
    this.setState({ repeatPassWord: event.target.value.trim(), showError: false })
  }

  handleSentBtn = () => {
    const { sendMsg } = this.props;

    // 发送验证码
    sendMsg({ telNum: this.state.phoneNum }, this.handleTimerType.bind(this))
  }

  handleTimerType = () => {
    if (!this.state.timerType) {
      this.setState({ timerType: true })
    }
  }

  handleCheckPhone = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const { phoneNum, captcha } = this.state

    this.props.checkCode({ telNum: phoneNum, verifyCode: captcha }, this.next.bind(this))
  }

  handleCheckEmail = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const { sendEmail } = this.props;

    // 发送验证码
    sendEmail({ email: this.state.email }, (re) => {
      // 显示邮件发送成功页
      this.setState({ pageType: 2 })
    })
  }

  handleCheckReset = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const { phoneNum, passWord, repeatPassWord, pageStepsType } = this.state

    if (passWord.length < 6 || repeatPassWord.length < 6) {
      this.setState({ showError: true, errorText: <FormattedMessage id='password_less_six_length' /> })
    } else if (passWord !== repeatPassWord) {
      this.setState({ showError: true, errorText: <FormattedMessage id='password_must_same' /> })
    } else {
      if (pageStepsType === 'reset') {
        this.props.resetPwd({ uniqcode: this.uniqcode, userPwd: passWord, reUserPwd: repeatPassWord }, this.next.bind(this));
      } else {
        this.props.resetPwd({ telNum: phoneNum, userPwd: passWord, reUserPwd: repeatPassWord }, this.next.bind(this));
      }
    }
  }

  hanldeTimerType = () => {
    this.setState({ timerType: false })
  }

  next() {
    const current = this.state.current + 1

    this.setState({ current })
  }

  render() {
    const steps = [
      {
        title: this.props.intl.formatMessage({ id: 'identity_verify' })
      }, {
        title: this.props.intl.formatMessage({ id: 'reset_password' })
      }, {
        title: this.props.intl.formatMessage({ id: 'complete_modify' })
      }
    ]

    const {
      current,
      phoneNum,
      captcha,
      passWord,
      repeatPassWord,
      timerType,
      showError,
      errorText,
      email,
      pageType,
      pageStepsType
    } = this.state

    return (
      <Content style={styles.content}>
        <Row type="flex" justify="center">
          <Col id="forgot-steps-container" style={styles.stepsBox} xs={18} sm={16} md={14} lg={10}>
          {// 区分邮件发送状态显示页面
          pageType === 1 ?
            <Steps style={styles.stepsMain} current={current}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps> : null
          }
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col id="forgot-content-container" xs={18} sm={14} md={10} lg={8}>
            {
              current === 0
              &&
              (
                // 区分邮件发送状态显示页面
                pageType === 1 ?
                <div>
                { // 邮箱找回密码
                  pageStepsType == 'email' ?
                  <form onSubmit={this.handleCheckEmail}>
                    <h2 style={styles.forgotTitle}><FormattedMessage id='identity_verify' /></h2>
                    <Alert style={{marginBottom: 8}} message={<FormattedMessage id='sent_reset_pwd_email_tips' />} type="info" showIcon />
                    {showError || this.props.userData.type == 'error' ?
                      <Alert
                        message={this.props.userData.msg || errorText}
                        style={{marginBottom: 8}}
                        type="error"
                        showIcon
                      /> :
                    null }
                    <Input
                      size="large"
                      type="email"
                      name="email"
                      maxLength={50}
                      value={email}
                      onChange={this.handleEmail}
                      placeholder={this.props.intl.formatMessage({id: 'enter_email'})}
                    />
                    <Button type="primary" size="large" htmlType="submit" disabled={!email} style={styles.nextBtn} ><FormattedMessage id='reset_pwd' /></Button>
                  </form>
                  // 手机号找回密码
                  :
                  <form onSubmit={this.handleCheckPhone}>
                    <h2 style={styles.forgotTitle}><FormattedMessage id='identity_verify' /></h2>
                    {showError || this.props.userData.type == 'error' ?
                      <Alert
                        style={{marginBottom: 8}}
                        message={this.props.userData.msg || errorText }
                        type="error"
                        showIcon
                      /> : null
                    }
                    <NumericInput value={this.state.phoneNum} placeholder={this.props.intl.formatMessage({id: 'please_input_phone'})} maxLength="20" style={styles.forgotInput} onChange={this.handlePhoneNum} />
                    <Row type="flex" justify="center" gutter={8}>
                      <Col span={15}>
                        <NumericInput value={this.state.captcha} placeholder={this.props.intl.formatMessage({id: 'please_input_captcha'})} maxLength="4" onChange={this.handleCaptcha} />
                      </Col>
                      <Col span={9}>
                        <Button className="send-code-btn" type="primary" size="large" disabled={!phoneNum || timerType} style={styles.sentBtn} onClick={this.handleSentBtn}><FormattedMessage id='sent_captcha_code' /><CaptchaButton show={timerType} btnChange={this.hanldeTimerType} /></Button>
                      </Col>
                    </Row>
                    <Button type="primary" size="large" htmlType="submit" disabled={!phoneNum || !captcha} style={styles.nextBtn} ><FormattedMessage id='button_determine' /></Button>
                  </form>
                }
                </div> :
                <div>
                  <div style={styles.sendSucImg}></div>
                  <div style={{fontSize: 16, marginTop: 20, textAlign: 'center'}}><FormattedMessage id='send_reset_pwd_email_tips' values={{email}} /></div>
                </div>
              )
            }
            {
              current === 1
              &&
              (
                <div>
                  <form onSubmit={this.handleCheckReset}>
                    <h2 style={styles.forgotTitle}><FormattedMessage id='reset_password' /></h2>
                    {showError || this.props.userData.type == 'error' ?
                      <Alert
                        message={this.props.userData.msg || errorText }
                        type="error"
                        style={{marginBottom: 8}}
                        showIcon
                      /> : null
                    }
                    <Input type="password" value={this.state.passWord} size="large" maxLength="20" placeholder={this.props.intl.formatMessage({id: 'please_input_pass'})} style={styles.forgotInput} onChange={this.handlePassWord} />
                    <Input type="password" value={this.state.repeatPassWord} size="large" maxLength="20" placeholder={this.props.intl.formatMessage({id: 'please_input_pass_repeat'})} onChange={this.handleRepeatPassWord} />
                    <Button type="primary" size="large" htmlType="submit" disabled={!passWord || !repeatPassWord} style={styles.nextBtn} ><FormattedMessage id='submit_pass_button' /></Button>
                  </form>
                </div>
              )
            }
            {
              current === 2
              &&
              (
                <div>
                  <h2 style={styles.forgotTitle}><FormattedMessage id='reset_pass_success' /></h2>
                  {this.isPc ? <Link style={{marginTop: 16}} to='/account'><Button type="primary" size="large" style={styles.nextBtn}><FormattedMessage id='login_again_button' /></Button></Link> :
                  <p style={{textAlign: 'center'}}><FormattedMessage id='please_use_pc_login' /></p>}
                </div>
              )
            }
          </Col>
        </Row>
      </Content>
    )
  }
}

export default injectIntl(Forgot)

const styles = {
  content: {
    backgroundColor: '#fff'
  },
  stepsBox: {
    marginTop: 100
  },
  stepsMain: {
    marginBottom: 32
  },
  forgotTitle: {
    marginBottom: 16,
    fontSize: 18,
    textAlign: "center",
    color: "#666"
  },
  forgotInput: {
    marginBottom: 8
  },
  sentBtn: {
    display: "block",
    paddingLeft: 0,
    paddingRight: 0,
    width: "100%"
  },
  nextBtn: {
    display: "block",
    marginTop: 20,
    width: "100%"
  },
  sendSucImg: {
    width: 200,
    height: 155,
    margin: "0 auto",
    backgroundImage: `url(${require('static/send-success.png')})`

  }
}
