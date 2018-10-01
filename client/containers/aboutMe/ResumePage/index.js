import React, { PureComponent } from 'react'
import { Layout, Icon, Card, Progress, Row, Col, List, Timeline, Tag } from 'antd'
const { Sider, Content } = Layout
const TimelineItem = Timeline.Item
const ListItem = List.Item

import style from './resume.style.css'

class Resume extends PureComponent {
  constructor(props) {
    super(props)
  }

  skillList = [
    '精通原生javascript，js面向对象、继承、原型等；熟悉ECMAScript5、6标准；',
    '精通React、Redux及其配套的插件；熟悉其他主流前端框架及其思想，了解各框架的优势和缺点；',
    '具有中小型项目前端的架构能力，对电商和数据类产品开发比较熟悉；',
    '具备工程化的前端思维，具备良好的分析问题和解决问题能力，善于学习、总结，喜欢研究新技术，乐于分享',
    '熟悉后端语言：PHP、nodejs，有实际上线项目经验'
  ]

  workList = [
    {
      company: '敦煌网',
      logo: 'https://www.lgstatic.com/image1/M00/00/20/Cgo8PFTUWG2AdfQtAABEjOK8y7Q105.jpg',
      team: '新兴事业部',
      position: '高级前端开发工程师',
      period: '2015.05-至今',
      tag: ['架构师', '前端开发', 'React'],
      description:
        '负责新兴事业部的前端架构，如Socialshops项目、后台管理系统（React+Redux），手机web端的商城系统（webpack+es6+zepto），大V分销系统（Angular）'
    },
    {
      company: '北京展程科技有限公司',
      logo: 'https://www.lgstatic.com/i/image/M00/02/23/CgqKkVaDeA2ABTybAAHBn5iT9bA749.png',
      team: 'JS游戏组',
      position: '前端开发工程师',
      period: '2013.11-2015.04',
      tag: ['移动端', '原生JS'],
      description: '开发和维护游戏（Zepto+Canvas+PhoneGap）。开发游戏新活动、新功能和模块、优化js、css代码；负责游戏海外版本前端开发项目组'
    }
  ]

  projectList = [
    {
      name: 'Socialshops SellerWeb',
      period: '2017.06-至今',
      tag: ['项目管理', '技术架构', '功能开发'],
      description:
        <div>
          <p>项目地址为开源的架构demo,UI使用的是阿里的antd;</p>
          <p>
            <br />
          </p>
          <p>一个大型的卖家后台应用，使用了js的流行框架React（Webpack3+React+Redux+Karma）。</p>
          <p>系统包含：登录系统、用户系统、选品系统、产品管理系统、订单系统；</p>
          <p>
            <br />
          </p>
          <p>
            系统使用了React作为框架基础，搭配数据管理插件Redux，语言遵循ES6标准，使用Webpack进行开发环境搭建以及上线编译，并且搭建了单元测试框架Karma和mocha编写测试用例。
            <br />
          </p>
          <p>
            <br />
          </p>
          <p>工作内容：</p>
          <ol>
            <li>
              <p>开发环境以及编译环境的Webpack配置，对项目的优化，缩减开发成本。如热更新、代码编译、css的兼容处理。</p>
            </li>
            <li>
              <p>规范项目组代码，如在项目加入.eslintrc和.jsbeautifyrc结合编辑器插件（现在使用的vscode），做到代码统一检查和美化。</p>
            </li>
            <li>
              <p>编写项目底层代码。如项目目录规划，后端的数据交互组件，错误捕获，控制台log。</p>
            </li>
            <li>
              <p>复杂业务模块、组件demo的编写。不定期review代码，把控项目质量。</p>
            </li>
            <li>
              <p>
                培养新人，培养模块化思维、组件解耦与复用到端对端组件。编写开发文档。
                <br />
              </p>
            </li>
          </ol>
          <p>
            <br />
          </p>
          <p>现已将项目发布到公司内部共享，作为公司js的前沿技术储备案例。</p>
          <p>
            <br />
          </p>
        </div>

    },
    {
      name: 'Novoshops-WebApp',
      period: '2017.03-2018.01',
      tag: ['自搭框架', '项目管理'],
      description:
        <div>
          <p>项目地址为开源的架构demo;</p>
          <p />
          <p />
          <p>实现一个简洁的webapp单页面商城系统（webpack+zepto+es6）。</p>
          <p>系统包含：登录系统、账户系统、商城系统、订单系统；</p>
          <p>
            此系统所有的代码规范、开发环境、底层架构、公共插件和组件都是由我一人编写，之后再在项目组里面培训的开发流程，进行接下来的业务模块和组件化开发。
          </p>
          <p>项目优势：&nbsp;</p>
          <p> • 轻量级：使用zepto+director.js+es6的组合。实现组件化开发，模块解耦</p>
          <p> • 易上手：因为是个快速项目，尽量没有使用react等现阶段很火的前端架构，而是自己搭建了一个相对篇传统的底层结构，使同事在合作中能快速上手，介入开发。
          </p>
          <p> • 组件化：引入现在前端流行的组件化开发，将业务模块拆分为组件模块，使用积木的形式搭建项目。</p>
          <p> • 易开发和构建：使用了webpack2作为项目的开发工具，调试方便、构建简单，一键发布。</p>
          <p />
        </div>

    },
    {
      name: 'Socialshops IM',
      period: '2016.03-2017.05',
      tag: ['WebView', '技术架构'],
      description:
        <div>
          <p>Socialshops是面向生产商、批发商进行商业交流和商品推广交易的移动平台，一个私密的在线交易APP。</p>
          <p>
            <br />
          </p>
          <p>APP有ios和安卓版本，而app内的商城系统（店铺、购物车、结算、订单）都是WebView内嵌的HTML页面。</p>
          <p>文档介绍页面：</p>
          <p>https://xieleilei.wordpress.com/2016/05/22/webapp-%E5%8D%95%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E6%90%AD%E5%BB%BA-1/</p>
          <p>
            <br />
          </p>
          <p>
            这是一个由Requestjs+Zepto架构的单页应用。我负责几乎全部的工作，从技术选型到基础架构、模块化、业务功能编写、上线构建工程化等。使app内运行的web页面体验几乎可以媲美原生模块。
          </p>
        </div>

    },
    {
      name: 'Socialshops',
      period: '2016.03-2017.05',
      tag: ['前端负责人'],
      description:
        <div>
          <p>
            一个面向海外用户的社交购物网站，包含一整套系统：influencer(主站，大V系统：www.socialshops.com)、merchant（卖家系统:merchant.socialshops.com）、socialstore(商店socialstore.socialshops.com)、ops(ops.socialshops.com管理系统)；
            在此项目中因为表现突出被提升为前端leader、负责整个项目的前端工作分配和工作进度。 工作内容：
          </p>
          <ol>
            <li>
              <p>前期技术选型、调研、demo编写。在一系列框架中选定了angularjs作为我们的系统框架，自学angularjs，带领开发；</p>
            </li>
            <li>
              <p>
                编写公共组件：数据请求模块、页面公共动画模块（如loading、报错提示）、路由控制器、全局变量、googletagmanager和angularjs协调数据统计模块、用户行为track模块、UI加载模块；本地化存储模块编写（使用LocalStorge和SessionStorge减少请求cookie大小，优化http请求）。
              </p>
            </li>
            <li>
              <p>
                发版自动化：负责bower包控制、github线上版本控制、Grunt命令行一键发版（基于nodejs的Grunt整合了包括
                jsLint、html/css/js/image压缩、js/css代码合并减少请求）；
              </p>
            </li>
            <li>
              <p>
                产品功能实现：一般负责比较难的模块，如产品选品平台的瀑布流优化（处理数据量过大
                600+产品的时候，页面卡顿）、产品上传编辑界面（图片上传前端优化、sku排列组合逻辑优化）。
              </p>
            </li>
            <li>
              <p>
                向上级汇报进度，与产品经理讨论功能需求，协助UE优化用户体验，预估功能开发时间。负责代码质量检查，定期review代码，安排前端其他同事工作。
              </p>
            </li>
            <li>
              <p>动画：CSS3动画、UI的jquery动画（一般使用css3动画，通过js控制类名实现）；</p>
            </li>
            <li>
              <p>
                分享知识和培训新人：在公司前端组分享了angularjs的学习心得和使用途径，引导实习生和新进的程序员，教授和分享自己的所学，分享自己的编程心得和学习方法，给其他组输送人才。
              </p>
            </li>
          </ol>
        </div>

    },
    {
      name: '悍将三国',
      period: '2013.11-2015.04',
      tag: ['大型H5游戏'],
      description:
        <div>
          《悍将三国》是一款由HTML5打造的ios游戏、具有丰富的pvp和pve功能，前端技术主要是js、css3、canvas。 工作内容：
          <ol>
            <li>
              游戏功能开发：游戏使用的zeptojs加javascript原型模式开发，zepto负责页面交互，dom控制、事件控制、触发控制；javascript
              prototype负责逻辑控制。通过js+css/css3实现游戏绚丽的效果，如转盘抽奖、卡片拖动、动画帧播放，滑动等，我都做过。游戏pc版本地址：http://game.hanjiangsanguo.com（appstore是html通过cordova打包的ipa，代码逻辑一样）
            </li>
            <li>
              网站开发：公司的游戏官网开发。从UI的PSD图到上线，我前后端一起开发，使用PHP的CI框架+mysql，然后前端页面编写、切图。（项目如：
              http://www.hanjiangsanguo.com）；
            </li>
            <li>游戏多语言版本制作：各种css适配，本地化处理；</li>
            <li>
              html5宣传页编写：主要是投放到微信、手机浏览器等渠道的宣传页面和小游戏的编写,使用CSS3+js动画实现（如：http://t.cn/RGKjHQM）
            </li>
            <li>培训新人：负责带实习生、新程序员，传授编程思想、代码习惯；</li>
          </ol>
        </div>

    }
  ]

  schoolList = [
    {
      name: '重庆城市管理职业学院',
      logo: require('static/cqcsglxy.png'),
      position: '大专 / 软件工程',
      period: '2011.09-2014.07'
    },
    {
      name: '北京皮皮西有限公司',
      logo: 'https://www.lgstatic.com/thumbnail_300x300/image1/M00/00/2D/Cgo8PFTUXHmAATcfAACfCmlg9Ek066.png',
      position: 'PHP语言培训',
      period: '2013.06-2013.11'
    }
  ]

  render() {
    return (
      <Layout className={style.mainWrap}>
        <Sider width={300} className={style.sider}>
          <div className={style.siderTop}>
            <div className={style.siderTopAvatar}>
              <img style={inlineStyle.img} alt="头像" src={require('static/avatar.jpg')} />
            </div>
            <h2>雷登来的简历</h2>
            <p>5年前端开发经验，其中2年js游戏开发，3年电商开发</p>
          </div>

          <div>
            <Card
              style={inlineStyle.card}
              bordered={false}
              title={
                <div>
                  <Icon type="user" theme="outlined" />
                  <span className={style.siderTitle}>Basic info. 基本信息</span>
                </div>
              }>
              <div className={style.contentList}>
                <Row>
                  <Col span={7}>个人信息：</Col>
                  <Col span={17}>雷登来 / 26岁 / 5年工作经验 / 大专</Col>
                </Row>
                <Row>
                  <Col span={7}>职位：</Col>
                  <Col span={17}>敦煌网 / 高级前端开发工程师</Col>
                </Row>
                <Row>
                  <Col span={7}>GitHub：</Col>
                  <Col span={17}>
                    <a href="https://github.com/leidenglai" target="_blank" rel="noopener noreferrer">
                      https://github.com/leidenglai
                    </a>
                  </Col>
                </Row>
              </div>
            </Card>
            <Card
              style={inlineStyle.card}
              bordered={false}
              title={
                <div>
                  <Icon type="phone" theme="outlined" />
                  <span className={style.siderTitle}>Contact. 联系方式</span>
                </div>
              }>
              <div className={style.contentList}>
                <Row>
                  <Col span={7}>Email: </Col>
                  <Col span={17}>
                    <a href="mailto:leidenglai@qq.com">leidenglai@qq.com</a>
                  </Col>
                </Row>
                <Row>
                  <Col span={7}>手机/微信: </Col>
                  <Col span={17}>13241106608</Col>
                </Row>
              </div>
            </Card>
            <Card
              style={inlineStyle.card}
              bordered={false}
              title={
                <div>
                  <Icon type="like" theme="outlined" />
                  <span className={style.siderTitle}>Application. 期望工作</span>
                </div>
              }>
              <div className={style.contentList}>
                <Row>
                  <Col>Web前端工程师 / 成都 / 20k+</Col>
                </Row>
              </div>
            </Card>
            <Card
              style={inlineStyle.card}
              bordered={false}
              title={
                <div>
                  <Icon type="thunderbolt" theme="outlined" />
                  <span className={style.siderTitle}>Tech. 个人能力</span>
                </div>
              }>
              <div className={style.siderContentList}>
                <Row className={style.siderContentLi}>
                  <Col span={10}>JavaScript</Col>
                  <Col span={14}>
                    <Progress percent={90} showInfo={false} />
                  </Col>
                </Row>
                <Row className={style.siderContentLi}>
                  <Col span={10}>React</Col>
                  <Col span={14}>
                    <Progress percent={85} showInfo={false} />
                  </Col>
                </Row>
                <Row className={style.siderContentLi}>
                  <Col span={10}>Web应用架构</Col>
                  <Col span={14}>
                    <Progress percent={80} showInfo={false} />
                  </Col>
                </Row>
                <Row className={style.siderContentLi}>
                  <Col span={10}>HTML+CSS</Col>
                  <Col span={14}>
                    <Progress percent={80} showInfo={false} />
                  </Col>
                </Row>
                <Row className={style.siderContentLi}>
                  <Col span={10}>PHP+Nodejs</Col>
                  <Col span={14}>
                    <Progress percent={60} showInfo={false} />
                  </Col>
                </Row>
              </div>
            </Card>
          </div>
        </Sider>
        <Layout className={style.contentWrap}>
          <Content>
            <Card
              style={inlineStyle.card}
              bordered={false}
              title={
                <div>
                  <Icon type="double-right" theme="outlined" />
                  <span className={style.siderTitle}>Skill. 主要技能</span>
                </div>
              }>
              <List
                split={false}
                size="small"
                dataSource={this.skillList}
                renderItem={item =>
                  <ListItem>
                    <li>{item}</li>
                  </ListItem>
                }
              />
            </Card>
            <Card
              style={inlineStyle.card}
              bordered={false}
              title={
                <div>
                  <Icon type="double-right" theme="outlined" />
                  <span className={style.siderTitle}>Company. 工作经历</span>
                </div>
              }>
              <Timeline>
                {this.workList.map((item, key) =>
                  <TimelineItem key={key}>
                    <div className={style.timelineHeader}>
                      <div className={style.companyLogo}>
                        <img style={inlineStyle.img} src={item.logo} alt="公司Logo" />
                      </div>
                      <div className={style.companyInfo}>
                        <h4>
                          {item.company} / {item.team}
                        </h4>
                        <p>{item.position}</p>
                      </div>
                      <div className={style.companyDate}>
                        <span>{item.period}</span>
                      </div>
                    </div>
                    <div className={style.timelineTag}>
                      {item.tag.map((text, key) =>
                        <Tag style={inlineStyle.tag} key={key}>
                          {text}
                        </Tag>
                      )}
                    </div>
                    <div className={style.timelineContent}>
                      <p>{item.description}</p>
                    </div>
                  </TimelineItem>
                )}
              </Timeline>
            </Card>
            <Card
              style={inlineStyle.card}
              bordered={false}
              title={
                <div>
                  <Icon type="double-right" theme="outlined" />
                  <span className={style.siderTitle}>Project. 项目经历</span>
                </div>
              }>
              <Timeline>
                {this.projectList.map((item, key) =>
                  <TimelineItem key={key}>
                    <div className={style.timelineHeader}>
                      <div className={style.companyInfo}>
                        <h4>{item.name}</h4>
                      </div>
                      <div className={style.companyDate}>
                        <span>{item.period}</span>
                      </div>
                    </div>
                    <div className={style.timelineTag}>
                      {item.tag.map((text, key) =>
                        <Tag style={inlineStyle.tag} key={key}>
                          {text}
                        </Tag>
                      )}
                    </div>
                    <div className={style.timelineContent}>
                      <div className={style.expListContent}>{item.description}</div>
                    </div>
                  </TimelineItem>
                )}
              </Timeline>
            </Card>
            <Card
              style={inlineStyle.card}
              bordered={false}
              title={
                <div>
                  <Icon type="double-right" theme="outlined" />
                  <span className={style.siderTitle}>University. 教育经历</span>
                </div>
              }>
              <Timeline>
                {this.schoolList.map((item, key) =>
                  <TimelineItem key={key}>
                    <div className={style.timelineHeader}>
                      <div className={style.companyLogo}>
                        <img style={inlineStyle.img} src={item.logo} alt="学校Logo" />
                      </div>
                      <div className={style.companyInfo}>
                        <h4>{item.name}</h4>
                        <p>{item.position}</p>
                      </div>
                      <div className={style.companyDate}>
                        <span>{item.period}</span>
                      </div>
                    </div>
                  </TimelineItem>
                )}
              </Timeline>
            </Card>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const inlineStyle = {
  card: { backgroundColor: 'transparent', marginBottom: 24 },
  img: { width: '100%', height: '100%' },
  tag: { border: '1px solid #EAEDEC', borderRadius: 100, color: '#999' }
}

export default Resume
