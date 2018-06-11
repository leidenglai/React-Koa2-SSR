import React from 'react'
import { Layout } from 'antd'

const { Sider } = Layout

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      mode: 'inline',
      orderSum: false
    }
  }

  componentDidMount() {}

  onCollapse = collapsed => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline'
    })
  }

  closeBadge = () => {}

  render() {
    return (
      <Layout style={styles.app}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          width={224}
          style={styles.sider}>
          Sider
        </Sider>
      </Layout>
    )
  }
}
export default App

const styles = {
  app: {
    position: 'relative',
    width: '100%',
    height: '100vh'
  },
  sider: { backgroundColor: '#404040' },
  menu: { color: '#ffffff' }
}
