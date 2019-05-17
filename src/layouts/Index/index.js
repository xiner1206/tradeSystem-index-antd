import React, { Component } from "react";
import { Row, Col } from "antd";
import Layout from "../Layout/Layout";
import './index.css'
export default class Index extends Component {
render() {
  return (
    <Layout>
      <div className="gutter">
        <Row>
          <Col className="gutter-row" span={8}>
            <a href="#/trade">
              <div>
                <img
                  src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1051648285,2214287494&fm=26&gp=0.jpg"
                  alt=""
                />
                <h3>商场</h3>
                <h4>Trading Area</h4>
              </div>
            </a>
          </Col>
          <Col className="gutter-row" span={8}>
            <a href="#/store">
              <div>
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557752757258&di=1bf76173513c48d093ebf061c0095b03&imgtype=0&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fd7%2F1612%2F77%2Fd5c0a29189c218b5.jpg_r_680x508x95_c7f842e4.jpg"
                  alt=""
                />
                <h3>店铺</h3>
                <h4>Store</h4>
              </div>
            </a>
          </Col>
          <Col className="gutter-row" span={8}>
            <a href="#/commodity">
              <div>
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557753054241&di=e5cc29b9ae8dd5a6ca28088b61c061c3&imgtype=0&src=http%3A%2F%2Fxm.51wangpu.com%2Fupload%2F201808%2F30%2F201808301627571190.jpg"
                  alt=""
                />

                <h3>商品</h3>
                <h4>Commodity</h4>
              </div>
            </a>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
}

