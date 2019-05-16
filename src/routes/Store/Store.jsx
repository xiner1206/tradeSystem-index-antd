import {
  List,
  Col,
  Row,
  Divider,
  Button,
  Modal,
  message,
  Form,
  Rate,
  Input,
  Select
} from "antd";
import React, { Component } from 'react'
import Layout from '../../layouts/Layout/Layout'
import axios from "axios";
import './store.css'
class Store extends Component {
  state = {
    visible: false,
    ratevisible: false,
    listData: [],
    hotlistData: [],
    loading: true,
    total: 1,
    modal: {},
    tradeId: "",
    storeId: "",
    score:{}
  };

  handleViewDetail = storeId => {
    const history = this.props.history;
    axios
      .post("http://localhost:8080/TradingArea/store/selectById", {
        storeId: storeId
      })
      .then(response => {
        this.setState({
          visible: true,
          modal: response.data,
          tradeId: response.data.trade.tradeId
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .post("http://localhost:8080/TradingArea/score/avgScore", {
        storeId: storeId
      })
      .then(response => {
        this.setState({
          visible: true,
          score: response.data
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
    if (this.props.location.state) {
      axios
        .post("http://localhost:8080/TradingArea/store/hotSearch", {
          tradeId: this.props.location.state.tradeId
        })
        .then(response => {
          this.setState({
            loading: false,
            hotlistData: response.data
          });
          history.push(`store?page=1`);
        })
        .catch(function(error) {
          console.log(error);
        });
      axios
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
        });
    } else {
      axios
        .post("http://localhost:8080/TradingArea/store/hotSearch", {
          tradeId: ""
        })
        .then(response => {
          this.setState({
            loading: false,
            hotlistData: response.data
          });
          history.push(`store?page=1`);
        })
        .catch(function(error) {
          console.log(error);
        });
      axios
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
  }
  handleRate = storeId => {
    console.log(storeId);
    this.setState({
      ratevisible: true,
      storeId: storeId
    });
  };

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
              storeType: values.storeType
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
      visible: false,
      ratevisible: false
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
  handleRateSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values, storeId) => {
      if (!err) {
        axios
          .post("http://localhost:8080/TradingArea/score/insert", {
            environment: values.environment,
            serve: values.service,
            substantial: values.cost,
            totalScore: values.all,
            store: {
              storeId: this.state.storeId
            }
          })
          .then(response => {
            if (response.data === 1) {
              message.success("评分成功");
              this.setState({
                ratevisible: false
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
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
    const {
      visible,
      listData,
      loading,
      modal,
      hotlistData,
      ratevisible,
      score
    } = this.state;
    console.log(score.environment)
    const Option = Select.Option;
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
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
        <Divider />
        <h2>热门店铺</h2>
        <Divider />
        <List
          className="store-list"
          grid={{ column: 4 }}
          size="middle"
          loading={loading}
          pagination={false}
          dataSource={hotlistData}
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
                    size="small"
                    onClick={this.handleEnter.bind(this, item.storeId)}
                  >
                    进入店铺
                  </Button>
                  <Divider type="vertical" />
                  <Button
                    size="small"
                    onClick={this.handleViewDetail.bind(this, item.storeId)}
                  >
                    查看信息
                  </Button>
                  <Divider type="vertical" />
                  <Button
                    size="small"
                    onClick={this.handleRate.bind(this, item.storeId)}
                  >
                    评分
                  </Button>
                </div>
              }
            >
              <List.Item.Meta
                title={
                  <div>
                    <b>[{item.storeType}]</b>
                    <span>{item.storeName}</span>
                    {item.betterStore === true ? (
                      <span>
                        <Divider type="vertical" />
                        <b style={{ color: "rgba(171, 106, 10, 0.85)" }}>
                          品质联盟
                        </b>
                      </span>
                    ) : (
                      ""
                    )}
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
                  {item.storeRemark.substr(0, 9) + "..."}
                </span>
              </div>
            </List.Item>
          )}
        />
        <Divider />
        <h2>所有店铺</h2>
        <Divider />
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
                  <Divider type="vertical" />
                  <Button onClick={this.handleRate.bind(this, item.storeId)}>
                    评分
                  </Button>
                </div>
              }
            >
              <List.Item.Meta
                title={
                  <div>
                    <b>[{item.storeType}]</b>
                    <span>{item.storeName}</span>
                    {item.betterStore === true ? (
                      <span>
                        <Divider type="vertical" />
                        <b style={{ color: "rgba(171, 106, 10, 0.85)" }}>
                          品质联盟
                        </b>
                      </span>
                    ) : (
                      ""
                    )}
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
                  {item.storeRemark.substr(0, 12) + "..."}
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
            <b>店铺评分：</b>
            <div>
              <span>环 境： </span>
              <Rate disabled allowHalf value={score.environment} />
            </div>
            <div>
              <span>服 务： </span>
              <Rate disabled allowHalf value={score.serve} />
            </div>
            <div>
              <span>性价比：</span>
              <Rate disabled allowHalf value={score.substantial} />
            </div>
            <div>
              <span>总 评： </span>
              <Rate disabled allowHalf value={score.totalScore} />
            </div>
          </div>
          <div>
            <b>店铺图片：</b>
            {modal.storePicList &&
              modal.storePicList.map((item, index) => {
                console.log(item);
                return <img key={item.pictureId} src={item.url} alt="" />;
              })}
          </div>
        </Modal>
        <Modal
          wrapClassName="ratedetail"
          title={modal.storeName}
          visible={ratevisible}
          width={500}
          footer={null}
          onCancel={this.handleCloseDetail}
        >
          <Form
            onSubmit={this.handleRateSubmit}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
          >
            <Form.Item label="环境">
              {getFieldDecorator("environment", {
                initialValue: 3.5
              })(<Rate allowHalf />)}
            </Form.Item>
            <Form.Item label="服务">
              {getFieldDecorator("service", {
                initialValue: 3.5
              })(<Rate allowHalf />)}
            </Form.Item>
            <Form.Item label="性价比">
              {getFieldDecorator("cost", {
                initialValue: 3.5
              })(<Rate allowHalf />)}
            </Form.Item>
            <Form.Item label="总评">
              {getFieldDecorator("all", {
                initialValue: 3.5
              })(<Rate allowHalf />)}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    );
  }
}
export default Form.create()(Store);