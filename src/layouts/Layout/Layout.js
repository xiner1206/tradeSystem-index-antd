import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link, Route, withRouter } from "react-router-dom";
import "./Layout.css";
class MyLayout extends Component {
  state = {
    selectedKey: "trade"
  };
  componentDidMount() {
    this.setState({
      selectedKey: this.props.location.pathname.substring(1)
    });
  }
  render() {
    console.log(this.state.selectedKey);
    const { Header, Footer, Content } = Layout;
    return (
      <Layout id="layout">
        <Header className="ant-layout-header">
          <Menu
            theme="dark"
            mode="horizontal"
            gutter={24}
            selectedKeys={[this.state.selectedKey]}
            onClick={({ key }) => this.setState({ selectedKey: key })}
          >
            <Menu.Item key="index" span={8}>
              <Link to="/index">
                <Icon type="home" />
                首页
              </Link>
            </Menu.Item>
            <Menu.Item key="trade" span={8}>
              <Link to="/trade">
                <Icon type="shopping" />
                商场
              </Link>
            </Menu.Item>
            <Menu.Item key="store" span={8}>
              <Link to="/store">
                <Icon type="shop" />
                店铺
              </Link>
            </Menu.Item>
            <Menu.Item key="commodity" span={8}>
              <Link to="/commodity">
                <Icon type="inbox" />
                商品
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>{this.props.children}</Content>
        <Footer className="ant-layout-footer">
          E 商 圈 · Design by dangxin
        </Footer>
      </Layout>
    );
  }
}

export default withRouter(MyLayout);
