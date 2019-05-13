import { List, Col, Row, Divider, Button, Modal, Form, Input,Select } from "antd";
import React, { Component } from 'react'
import Layout from '../../layouts/Layout/Layout'
import axios from "axios";
import './store.css'
class Store extends Component {
  state = {
    visible: false,
    listData: [],
    loading: true,
    total: 1,
    modal: [],
    tradeId: ""
  };

  handleViewDetail = storeId => {
    const history = this.props.history;
    axios
      .post("http://localhost:8080/TradingArea/store/onePic", {
        pageNum: "1",
        pageSize: "9",
        condition: {
            storeId: storeId
        }
      })
      .then(response => {
        this.setState({
          visible: true,
          modal: response.data.list[0],
          tradeId: response.data.list[0].tradeId
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({
      visible: true
    });
  };
  componentDidMount() {
    const history = this.props.history;
    this.props.location.state
      ? axios
          .post("http://localhost:8080/TradingArea/store/onePic", {
            pageNum: "1",
            pageSize: "9",
            condition: {
              trade: {
                tradeId: this.props.location.state.tradeId
              }
            }
          })
          .then(response => {
            this.setState({
              loading: false,
              listData: response.data.list,
              total: response.data.totalRecord
            });
            history.push(`store?page=1`);
          })
          .catch(function(error) {
            console.log(error);
          })
      : axios
          .post("http://localhost:8080/TradingArea/store/onePic", {
            pageNum: "1",
            pageSize: "9",
            condition: {
              trade: {
                tradeId: ""
              }
            }
          })
          .then(response => {
            this.setState({
              loading: false,
              listData: response.data.list,
              total: response.data.totalRecord
            });
            history.push(`store?page=1`);
          })
          .catch(function(error) {
            console.log(error);
          });
  }

  onChange = page => {
    console.log({ page: page });
    this.setState({
      loading: true
    });
    const history = this.props.history;
    this.props.location.state
      ? axios
          .post("http://localhost:8080/TradingArea/store/onePic", {
            pageNum: page,
            pageSize: "9",
            condition: {
              trade: {
                tradeId: this.props.location.state.tradeId
              }
            }
          })
          .then(response => {
            this.setState({
              loading: false,
              listData: response.data.list,
              total: response.data.totalRecord
            });
            history.push(`store?page=1`);
          })
          .catch(function(error) {
            console.log(error);
          })
      : axios
          .post("http://localhost:8080/TradingArea/store/onePic", {
            pageNum: page,
            pageSize: "9",
            condition: {
              trade: {
                tradeId: ""
              }
            }
          })
          .then(response => {
            this.setState({
              loading: false,
              listData: response.data.list,
              total: response.data.totalRecord
            });
            history.push(`store?page=1`);
          })
          .catch(function(error) {
            console.log(error);
          });
  };
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        axios
          .post("http://localhost:8080/TradingArea/store/onePic", {
            pageNum: "1",
            pageSize: "10",
            condition: {
              storeName: values.storeName,
              storeType: values.storeType,
            }
          })
          .then(response => {
            console.log(response);
            this.setState({ listData: response.data.list });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
    const history = this.props.history;
    axios
      .post("http://localhost:8080/TradingArea/store/onePic", {
        pageNum: "1",
        pageSize: "10",
        condition: {}
      })
      .then(response => {
        this.setState({
          loading: false,
          listData: response.data.list,
          total: response.data.totalRecord
        });
        console.log(response);
        history.push(`store?page=1`);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleCloseDetail = () => {
    this.setState({
      visible: false
    });
  };
  handleEnter = storeId => {
    this.props.history.push({
      pathname: "/commodity",
      state: { storeId: storeId }
    });
    //  this.props.history.push("/store");
  };
  handleOk = () => {
    this.setState({
      visible: false
    });
    this.props.history.push({
      pathname: `/store`,
      state: {
        tradeId: this.state.tradeId
      }
    });
    const history = this.props.history;
    console.log(this.props.location.state);
    axios
      .post("http://localhost:8080/TradingArea/store/onePic", {
        pageNum: "1",
        pageSize: "9",
        condition: {
          trade: {
            tradeId: this.state.tradeId
          }
        }
      })
      .then(response => {
        this.setState({
          loading: false,
          listData: response.data.list,
          total: response.data.totalRecord
        });
        history.push(`store?page=1`);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
     function getQueryString(name) {
       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
       var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
       var r = window.location.search.substr(1).match(reg);
       var q = window.location.pathname.substr(1).match(reg_rewrite);
       if (r != null) {
         return unescape(r[2]);
       } else if (q != null) {
         return unescape(q[2]);
       } else {
         return null;
       }
     }
     const page = parseInt(getQueryString("page"));
    const { visible, listData, loading, modal } = this.state;

    const Option = Select.Option;
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item label={`商铺名称`}>
                {getFieldDecorator("storeName", {
                  rules: [
                    {
                      required: false,
                      message: "请输入商铺名称"
                    }
                  ]
                })(<Input placeholder="商铺名称" id="storeName" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={`商铺类型`}>
                {getFieldDecorator("storeType", {
                  initialValue: "美食",
                  rules: [
                    {
                      required: false,
                      message: "请选择商铺类型"
                    }
                  ]
                })(
                  <Select span={8} id="storeType">
                    <Option value="美食">美食</Option>
                    <Option value="服饰">服饰</Option>
                    <Option value="美妆">美妆</Option>
                    <Option value="电影/演出">电影/演出</Option>
                    <Option value="酒店住宿">酒店住宿</Option>
                    <Option value="休闲娱乐">休闲娱乐</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                清空
              </Button>
            </Col>
          </Row>
        </Form>
        <List
          className="ant-store-list"
          grid={{ column: 3 }}
          size="large"
          loading={loading}
          pagination={{
            current: page,
            total: this.state.total,
            onChange: this.onChange
          }}
          dataSource={listData}
          renderItem={item => (
            <List.Item
              className="list"
              key={item.storeId}
              extra={
                <div>
                  <img className="img" alt="logo" src={item.url} />
                  <br />
                  <Button
                    type="primary"
                    onClick={this.handleEnter.bind(this, item.storeId)}
                  >
                    进入店铺
                  </Button>
                  <Divider type="vertical" />
                  <Button
                    onClick={this.handleViewDetail.bind(this, item.storeId)}
                  >
                    查看信息
                  </Button>
                </div>
              }
            >
              <List.Item.Meta
                title={
                  <div>
                    <b>[{item.storeType}]</b>
                    <span>{item.storeName}</span>
                  </div>
                }
              />
              <div>
                <span>
                  <b>地址：</b>
                  {item.storeLocation}
                </span>
              </div>
              <div>
                <span>
                  <b>描述：</b>
                  {item.storeRemark}
                </span>
              </div>
            </List.Item>
          )}
        />
        <Modal
          wrapClassName="detail"
          title={modal.storeName}
          visible={visible}
          okText="进入商圈"
          cancelText="取消"
          width={800}
          onCancel={this.handleCloseDetail}
          onOk={this.handleOk}
        >
          <div>
            <b>店铺类型：</b>
            {modal.storeType}
          </div>
          <div>
            <b>店铺地址：</b>
            {modal.storeLocation}
          </div>
          <div>
            <b>店铺热线：</b>
            {modal.storePhone}
          </div>
          <div>
            <b>店铺简介：</b>
            {modal.storeRemark}
          </div>
          <div>
            <b>店铺图片：</b>
            <img src={modal.url} />
          </div>
        </Modal>
      </Layout>
    );
  }
}
export default Form.create()(Store);