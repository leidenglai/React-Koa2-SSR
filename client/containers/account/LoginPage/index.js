import React, { PureComponent } from 'react'
import { Button, Input, Form, Card } from 'antd'
import { Link } from 'react-router'

import style from './style.css'
import './cover.less'

const FormItem = Form.Item

class LoginForm extends PureComponent {
  constructor(props) {
    super(props)
  }

  /**
   * 处理登录提交
   */
  handleSubmit = e => {
    e.preventDefault()

    const { login } = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)

        login(values).then(() => {
          console.log('登录成功')
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
      }
    }

    return (
      <div className={style.loginContent + ' login-content'}>
        <div
          className={style.loginLogo}
          style={{ backgroundImage: `url(${require('static/logo@2x-black.png')})` }}
        />
        <Form onSubmit={this.handleSubmit} className={style.loginFormContent}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('email', { rules: [{ required: true, message: '请输入邮箱' }] })(
              <Input
                autoComplete="email"
                onFocus={this.inputFoucs}
                type="email"
                maxLength="40"
                className={style.input}
                placeholder="请输入邮箱"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('pass', { rules: [{ required: true, message: '请输入密码' }] })(
              <Input
                autoComplete="pass"
                onFocus={this.inputFoucs}
                type="password"
                maxLength="20"
                placeholder="请输入密码"
                className={style.input}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout}>
            <Button type="primary" htmlType="submit" size="large" className={style.loginBtn}>
              登录
            </Button>
          </FormItem>
          <p className={style.registerWrap}>
            <Link to="/account/register">我要注册</Link>
          </p>
        </Form>
      </div>
    )
  }
}
const WrappedLoginForm = Form.create()(LoginForm)

// React.PureComponent is exactly like React. Component but implements
// shouldComponentUpdate() with a shallow prop and state comparison.
export default class Login extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { login } = this.props

    return (
      <div className={style.content}>
        <Card className={style.loginBox}>
          <WrappedLoginForm login={login} />
        </Card>
      </div>
    )
  }
}
