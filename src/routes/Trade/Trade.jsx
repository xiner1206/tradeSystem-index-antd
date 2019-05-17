import { List, Input, Icon, Divider, Button, Modal } from "antd";
import React, { Component } from 'react'
import Layout from '../../layouts/Layout/Layout'
import './trade.css'
import axios from 'axios'
const Search = Input.Search;
export default class Trade extends Component {
                 state = {
                   visible: false,
                   listData: [],
                   hotlistData:[],
                   loading: true,
                   total: 1,
                   modal: {}
                 };

                 componentDidMount() {
                   const history = this.props.history;
                   axios
                     .post(
                       "http://localhost:8080/TradingArea/trade/onePic",
                       {
                         pageNum: "1",
                         pageSize: "9",
                         condition: {}
                       }
                     )
                     .then(response => {
                       this.setState({
                         loading: false,
                         listData: response.data.list,
                         total: response.data.totalRecord
                       });
                       history.push(`trade?page=1`);
                     })
                     .catch(function(error) {
                       console.log(error);
                     });
                     axios
                       .post(
                         "http://localhost:8080/TradingArea/trade/hotSearch",
                         {
                         }
                       )
                       .then(response => {
                         this.setState({
                           loading: false,
                           hotlistData: response.data,
                         });
                         history.push(`trade?page=1`);
                       })
                       .catch(function(error) {
                         console.log(error);
                       });
                 }

                 handleViewDetail = tradeId => {
                   const history = this.props.history;
                   axios
                     .post(
                       "http://localhost:8080/TradingArea/trade/selectById",
                       {
                           tradeId: tradeId
                       }
                     )
                     .then(response => {
                       this.setState({
                         visible: true,
                         modal: response.data
                       });
                     })
                     .catch(function(error) {
                       console.log(error);
                     });
                   this.setState({
                     visible: true
                   });
                 };
                 handleEnter = tradeId => {
                   this.props.history.push({
                     pathname: "/store",
                     state: { tradeId: tradeId }
                   });
                   //  this.props.history.push("/store");
                 };

                 handleCloseDetail = () => {
                   this.setState({
                     visible: false
                   });
                 };
                 handleSearch = value => {
                   const history = this.props.history;
                   axios
                     .post(
                       "http://localhost:8080/TradingArea/trade/onePic",
                       {
                         pageNum: "1",
                         pageSize: "9",
                         condition: {
                           tradeName: value
                         }
                       }
                     )
                     .then(response => {
                       this.setState({
                         loading: false,
                         listData: response.data.list,
                         total: response.data.totalRecord
                       });
                       history.push(`trade?page=1`);
                     })
                     .catch(function(error) {
                       console.log(error);
                     });
                 };
                 onChange = page => {
                   const history = this.props.history;
                   console.log({ page: page });
                   this.setState({
                     loading: true
                   });
                   axios
                     .post(
                       "http://localhost:8080/TradingArea/trade/onePic",
                       {
                         pageNum: "1",
                         pageSize: "9",
                         condition: {}
                       }
                     )
                     .then(response => {
                       this.setState({
                         loading: false,
                         listData: response.data.list,
                         total: response.data.totalRecord
                       });
                       history.push(`trade?page=1`);
                     })
                     .catch(function(error) {
                       console.log(error);
                     });
                 };

                 render() {
                  
                   function getQueryString(name) {
                     var reg = new RegExp(
                       "(^|&)" + name + "=([^&]*)(&|$)",
                       "i"
                     );
                     var reg_rewrite = new RegExp(
                       "(^|/)" + name + "/([^/]*)(/|$)",
                       "i"
                     );
                     var r = window.location.search
                       .substr(1)
                       .match(reg);
                     var q = window.location.pathname
                       .substr(1)
                       .match(reg_rewrite);
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
                     hotlistData,
                     loading,
                     modal
                   } = this.state;
                    console.log(modal.tradePicList)
                   return (
                     <Layout>
                       <Search
                         className="search"
                         placeholder="请输入关键字查询"
                         enterButton="搜索"
                         size="large"
                         onSearch={this.handleSearch}
                       />
                       <h2>热门商圈</h2>
                       <Divider />
                       <List
                         className="trade-list"
                         grid={{ column: 4 }}
                         size="Small"
                         loading={loading}
                         pagination={false}
                         dataSource={hotlistData}
                         renderItem={item => (
                           <List.Item
                             className="list"
                             key={item.tradeId}
                             extra={
                               <div>
                                 <img
                                   className="img"
                                   alt="logo"
                                   src={item.url}
                                 />
                                 <br />
                                 <Button
                                   type="primary"
                                   onClick={this.handleEnter.bind(
                                     this,
                                     item.tradeId
                                   )}
                                 >
                                   进入商圈
                                 </Button>
                                 <Divider type="vertical" />
                                 <Button
                                   onClick={this.handleViewDetail.bind(
                                     this,
                                     item.tradeId
                                   )}
                                 >
                                   查看信息
                                 </Button>
                               </div>
                             }
                           >
                             <List.Item.Meta
                               title={
                                 <b>{item.tradeName}</b>
                               }
                             />
                             <div>
                               <span>
                                 <b>地址：</b>
                                 {item.tradeLocation}
                               </span>
                             </div>
                             <div>
                               <span>
                                 <b>描述：</b>
                                 {item.tradeRemark.substr(
                                   0,
                                   9
                                 ) + "..."}
                               </span>
                             </div>
                           </List.Item>
                         )}
                       />
                       <Divider />
                       <h2>所有商圈</h2>
                       <Divider />
                       <List
                         className="ant-trade-list"
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
                             key={item.tradeId}
                             extra={
                               <div>
                                 <img
                                   className="img"
                                   alt="logo"
                                   src={item.url}
                                 />
                                 <br />
                                 <Button
                                   type="primary"
                                   onClick={this.handleEnter.bind(
                                     this,
                                     item.tradeId
                                   )}
                                 >
                                   进入商圈
                                 </Button>
                                 <Divider type="vertical" />
                                 <Button
                                   onClick={this.handleViewDetail.bind(
                                     this,
                                     item.tradeId
                                   )}
                                 >
                                   查看信息
                                 </Button>
                               </div>
                             }
                           >
                             <List.Item.Meta
                               title={
                                 <b>{item.tradeName}</b>
                               }
                             />
                             <div>
                               <span>
                                 <b>地址：</b>
                                 {item.tradeLocation}
                               </span>
                             </div>
                             <div>
                               <span>
                                 <b>描述：</b>
                                 {item.tradeRemark.substr(
                                   0,
                                   12
                                 ) + "..."}
                               </span>
                             </div>
                           </List.Item>
                         )}
                       />
                       <Modal
                         wrapClassName="detail"
                         title={modal.tradeName}
                         visible={visible}
                         okText="进入商圈"
                         cancelText="取消"
                         width={800}
                         onCancel={this.handleCloseDetail}
                       >
                         <div>
                           <b>商圈地址：</b>
                           {modal.tradeLocation}
                         </div>
                         <div>
                           <b>商圈热线：</b>
                           {modal.tradePhone}
                         </div>
                         <div>
                           <b>商圈简介：</b>
                           {modal.tradeRemark}
                         </div>
                         <div>
                           <b>商圈图片：</b>
                           {modal.tradePicList && modal.tradePicList.map(
                             (item, index) => {
                               console.log(item.url);
                               return (
                                 <div>
                                   <img
                                     src={item.url}
                                     alt=""
                                   />
                                 </div>
                               );
                             }
                           )}
                         </div>
                       </Modal>
                     </Layout>
                   );
                 }
               }
