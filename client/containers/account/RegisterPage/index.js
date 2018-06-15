import React, { PureComponent } from 'react'
import { Button, Input, Form, message } from 'antd'
import { history } from 'store'

import style from './style.css'

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

    const { register } = this.props

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)

        register(values).then(
          () => {
            history.replace('/account')
            message.success('注册成功，请登录')
          },
          ({ code, message }) => {
            if (code === 10002) {
              this.props.form.setFields({
                email: {
                  value: values.email,
                  errors: [new Error(message)]
                }
              })
            } else if (code === 10003) {
              this.props.form.setFields({
                phone: {
                  value: values.phone,
                  errors: [new Error(message)]
                }
              })
            }
          }
        )
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form

    console.log(value)

    if (value && value !== form.getFieldValue('pass')) {
      callback('两次密码输入不一致')
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    }

    return (
      <div className={style.registerFormWrap}>
        <div
          className={style.logo}
          style={{ backgroundImage: `url(${require('static/logo@2x-black.png')})` }}
        />
        <Form onSubmit={this.handleSubmit} className={style.registerFormContent}>
          <h2 className={style.registerTitle}>注册账号</h2>

          <FormItem {...formItemLayout} label="邮箱">
            {getFieldDecorator('email', { rules: [{ required: true, message: '邮箱不能为空' }] })(
              <Input
                autoComplete="off"
                onFocus={this.inputFoucs}
                type="email"
                maxLength="40"
                className={style.input}
                placeholder="请输入邮箱"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="密码">
            {getFieldDecorator('pass', { rules: [{ required: true, message: '密码不能为空' }] })(
              <Input
                autoComplete="off"
                onFocus={this.inputFoucs}
                type="password"
                maxLength="20"
                placeholder="请输入密码"
                className={style.input}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="确认密码">
            {getFieldDecorator('rePass', {
              rules: [
                { required: true, message: '确认密码不能为空' },
                { validator: this.compareToFirstPassword }
              ]
            })(
              <Input
                autoComplete="off"
                onFocus={this.inputFoucs}
                type="password"
                maxLength="20"
                placeholder="请输入确认密码"
                className={style.input}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="手机号">
            {getFieldDecorator('phone', { rules: [{ required: true, message: '手机号不能为空' }] })(
              <Input
                autoComplete="off"
                onFocus={this.inputFoucs}
                type="tel"
                maxLength="11"
                placeholder="请输入手机号"
                className={style.input}
              />
            )}
          </FormItem>
          <FormItem
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 18, push: 5 }
            }}
            className={style.registerBtnWrap}>
            <Button type="primary" htmlType="submit" size="large" className={style.registerBtn}>
              注册
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const WrappedLoginForm = Form.create()(LoginForm)

// React.PureComponent is exactly like React. Component but implements
// shouldComponentUpdate() with a shallow prop and state comparison.
export default class Register extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { register } = this.props

    return (
      <div className={style.content}>
        <WrappedLoginForm register={register} />
      </div>
    )
  }
}
