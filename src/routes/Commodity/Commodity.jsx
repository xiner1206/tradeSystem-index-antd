import { List, Avatar, Carousel, Divider, Button, Modal } from "antd";
import React, { Component } from 'react'
import Layout from '../../layouts/Layout/Layout'
import axios from 'axios'
import './commodity.css'
export default class Commodity extends Component {
                 state = {
                   visible: false,
                   listData: [],
                   loading: true,
                   total: 1,
                   modal: {},
                   storeId: "",
                   lists: [],
                   actlist: [],
                   hotlistData: [],
                   actvisible: false,
                   samevisible: false,
                   samemodal:{}
                 };

                 componentDidMount() {
                   const history = this.props.history;
                   console.log(this.props.location.state);
                   if (this.props.location.state) {
                     axios
                       .post(
                         "http://localhost:8080/TradingArea/commodity/hotSearch",
                         {
                           storeId: this.props.location.state
                             .storeId
                         }
                       )
                       .then(response => {
                         this.setState({
                           loading: false,
                           hotlistData: response.data
                         });
                         history.push(`commodity?page=1`);
                       })
                       .catch(function(error) {
                         console.log(error);
                       });
                     axios
                       .post(
                         "http://localhost:8080/TradingArea/commodity/onePic",
                         {
                           pageNum: "1",
                           pageSize: "9",
                           condition: {
                             store: {
                               storeId: this.props.location.state
                                 .storeId
                             }
                           }
                         }
                       )
                       .then(response => {
                         this.setState({
                           loading: false,
                           listData: response.data.list,
                           total: response.data.totalRecord
                         });
                         history.push(`commodity?page=1`);
                       })
                       .catch(function(error) {
                         console.log(error);
                       });

                     axios
                       .post(
                         "http://localhost:8080/TradingArea/activity/page",
                         {
                           pageNum: "1",
                           pageSize: "9",
                           condition: {
                             createTime: "2010-02-20",
                             endTime: "3000-10-23",
                             store: {
                               storeId: this.props.location.state
                                 .storeId
                             }
                           }
                         }
                       )
                       .then(response => {
                         this.setState({
                           lists: response.data.list
                         });
                         //  history.push(`commodity?page=1`);

                         console.log(response);
                       })
                       .catch(function(error) {
                         console.log(error);
                       });
                   } else {
                     axios
                       .post(
                         "http://localhost:8080/TradingArea/commodity/hotSearch",
                         {
                           storeId: ""
                         }
                       )
                       .then(response => {
                         this.setState({
                           loading: false,
                           hotlistData: response.data
                         });
                         history.push(`commodity?page=1`);
                       })
                       .catch(function(error) {
                         console.log(error);
                       });
                     axios
                       .post(
                         "http://localhost:8080/TradingArea/commodity/onePic",
                         {
                           pageNum: "1",
                           pageSize: "9",
                           condition: {
                             store: {
                               storeId: ""
                             }
                           }
                         }
                       )
                       .then(response => {
                         this.setState({
                           loading: false,
                           listData: response.data.list,
                           total: response.data.totalRecord
                         });
                         history.push(`commodity?page=1`);
                       })
                       .catch(function(error) {
                         console.log(error);
                       });
                     axios
                       .post(
                         "http://localhost:8080/TradingArea/activity/page",
                         {
                           pageNum: "1",
                           pageSize: "9",
                           condition: {
                             createTime: "2010-02-20",
                             endTime: "3000-10-23",
                             store: {
                               storeId: ""
                             }
                           }
                         }
                       )
                       .then(response => {
                         this.setState({
                           lists: response.data.list
                         });
                         console.log(response);
                       })
                       .catch(function(error) {
                         console.log(error);
                       });
                   }
                 }

                 onChange = page => {
                   console.log({ page: page });
                   this.setState({
                     loading: true
                   });
                   const history = this.props.history;
                   this.props.location.state
                     ? axios
                         .post(
                           "http://localhost:8080/TradingArea/commodity/onePic",
                           {
                             pageNum: page,
                             pageSize: "9",
                             condition: {
                               store: {
                                 storeId: this.props.location
                                   .state.storeId
                               }
                             }
                           }
                         )
                         .then(response => {
                           this.setState({
                             loading: false,
                             listData: response.data.list,
                             total: response.data.totalRecord
                           });
                           history.push(`commodity?page=1`);
                         })
                         .catch(function(error) {
                           console.log(error);
                         })
                     : axios
                         .post(
                           "http://localhost:8080/TradingArea/commodity/onePic",
                           {
                             pageNum: page,
                             pageSize: "9",
                             condition: {
                               store: {
                                 storeId: ""
                               }
                             }
                           }
                         )
                         .then(response => {
                           this.setState({
                             loading: false,
                             listData: response.data.list,
                             total: response.data.totalRecord
                           });
                           history.push(`commodity?page=1`);
                         })
                         .catch(function(error) {
                           console.log(error);
                         });
                 };

                 handleViewDetail = (
                   commodityId,
                   commodityName
                 ) => {
                   const history = this.props.history;
                   console.log(commodityId, commodityName);
                   axios
                     .post(
                       "http://localhost:8080/TradingArea/commodity/selectById",
                       {
                         commodityId: commodityId
                       }
                     )
                     .then(response => {
                       this.setState({
                         visible: true,
                         modal: response.data,
                         storeId: response.data.store.storeId
                       });
                     })
                     .catch(function(error) {
                       console.log(error);
                     });
                   axios
                     .post(
                       "http://localhost:8080/TradingArea/commodity/sameName",
                       {
                         commodityId: commodityId,
                         commodityName: commodityName
                       }
                     )
                     .then(response => {
                       console.log(response);
                       this.setState({
                         visible: true,
                         samelistData: response.data
                       });
                     })
                     .catch(function(error) {
                       console.log(error);
                     });
                   this.setState({
                     visible: true
                   });
                 };
                 handleSameViewDetail = (
                   commodityId,
                   commodityName
                 ) => {
                   const history = this.props.history;
                   console.log(commodityId, commodityName);
                   axios
                     .post(
                       "http://localhost:8080/TradingArea/commodity/selectById",
                       {
                         commodityId: commodityId
                       }
                     )
                     .then(response => {
                       this.setState({
                         samevisible: true,
                         samemodal: response.data,
                         storeId: response.data.store.storeId
                       });
                     })
                     .catch(function(error) {
                       console.log(error);
                     });
                   this.setState({
                     samevisible: true
                   });
                 };
                 handleOk = () => {
                   this.setState({
                     visible: false,
                     samevisible:false
                   });
                   this.props.history.push({
                     pathname: `/commodity`,
                     state: {
                       storeId: this.state.storeId
                     }
                   });
                   const history = this.props.history;
                   console.log(this.props.location.state);
                   axios
                     .post(
                       "http://localhost:8080/TradingArea/commodity/onePic",
                       {
                         pageNum: "1",
                         pageSize: "9",
                         condition: {
                           store: {
                             storeId: this.state.storeId
                           }
                         }
                       }
                     )
                     .then(response => {
                       this.setState({
                         loading: false,
                         listData: response.data.list,
                         total: response.data.totalRecord
                       });
                       history.push(`commodity?page=1`);
                     })
                     .catch(function(error) {
                       console.log(error);
                     });
                 };

                 handleCloseDetail = () => {
                   this.setState({
                     visible: false,
                     actvisible: false
                   });
                 };
                 handleCloseSameDetail = () => {
                   this.setState({
                     samevisible: false
                   });
                 };
                 handleImg = list => {
                   const history = this.props.history;
                   axios
                     .post(
                       "http://localhost:8080/TradingArea/activity/page",
                       {
                         pageNum: "1",
                         pageSize: "9",
                         condition: {
                           createTime: "2010-02-20",
                           endTime: "3000-10-23",
                           activityId: list.activityId
                         }
                       }
                     )
                     .then(response => {
                       this.setState({
                         actvisible: true,
                         actlist: response.data.list[0]
                       });
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
                     loading,
                     modal,
                     actlist,
                     hotlistData,
                     actvisible,
                     samelistData,
                     samevisible,
                     samemodal
                   } = this.state;
                   return (
                     <Layout>
                       <Carousel autoplay>
                         {this.state.lists.map(
                           (list, index) => {
                             return list.activityPicList.map(
                               (item, index) => {
                                 return (
                                   <div
                                     onClick={this.handleImg.bind(
                                       this,
                                       list
                                     )}
                                   >
                                     <img
                                       width="100%"
                                       height="180px"
                                       src={item.url}
                                       alt=""
                                     />
                                   </div>
                                 );
                               }
                             );
                           }
                         )}
                       </Carousel>
                       <Divider />
                       <h2>热销商品</h2>
                       <Divider />
                       <List
                         className="commodity-list"
                         grid={{ column: 4 }}
                         loading={loading}
                         size="middle"
                         pagination={false}
                         dataSource={hotlistData}
                         renderItem={item => (
                           <List.Item
                             className="list"
                             key={item.commodityId}
                             onClick={this.handleViewDetail.bind(
                               this,
                               item.commodityId,
                               item.commodityName
                             )}
                             extra={
                               <div>
                                 <img
                                   className="img"
                                   alt="logo"
                                   src={item.url}
                                 />
                               </div>
                             }
                           >
                             <List.Item.Meta
                               title={
                                 <b>{item.commodityName}</b>
                               }
                             />
                             <div>
                               <span>
                                 <b>价格：</b>
                                 {item.commodityPrice}元
                               </span>
                             </div>
                             <div>
                               <span>
                                 <b>描述：</b>
                                 {item.commodityRemark}
                               </span>
                             </div>
                           </List.Item>
                         )}
                       />
                       <Divider />
                       <h2>所有商品</h2>
                       <Divider />
                       <List
                         className="ant-commodity-list"
                         grid={{ column: 3 }}
                         loading={loading}
                         size="large"
                         pagination={{
                           current: page,
                           total: this.state.total,
                           onChange: this.onChange
                         }}
                         dataSource={listData}
                         renderItem={item => (
                           <List.Item
                             className="list"
                             key={item.commodityId}
                             onClick={this.handleViewDetail.bind(
                               this,
                               item.commodityId,
                               item.commodityName
                             )}
                             extra={
                               <div>
                                 <img
                                   className="img"
                                   alt="logo"
                                   src={item.url}
                                 />
                               </div>
                             }
                           >
                             <List.Item.Meta
                               title={
                                 <b>{item.commodityName}</b>
                               }
                             />
                             <div>
                               <span>
                                 <b>价格：</b>
                                 {item.commodityPrice}元
                               </span>
                             </div>
                             <div>
                               <span>
                                 <b>描述：</b>
                                 {item.commodityRemark}
                               </span>
                             </div>
                           </List.Item>
                         )}
                       />
                       <Modal
                         wrapClassName="detail"
                         title={actlist.activityName}
                         visible={actvisible}
                         footer={null}
                         width={800}
                         onCancel={this.handleCloseDetail}
                       >
                         <div>
                           <b>活动名称：</b>
                           {actlist.activityName}
                         </div>
                         <div>
                           <b>活动开始时间：</b>
                           {actlist.createTime}
                         </div>
                         <div>
                           <b>活动结束时间：</b>
                           {actlist.endTime}
                         </div>
                         <div>
                           <b>活动折扣：</b>
                           全场{actlist.activityDiscount}折
                         </div>
                         <div>
                           <b>活动描述：</b>
                           {actlist.activityRemark}
                         </div>
                       </Modal>
                       <Modal
                         wrapClassName="detail"
                         title={modal.commodityName}
                         visible={visible}
                         okText="进入店铺"
                         cancelText="取消"
                         width={800}
                         onCancel={this.handleCloseDetail}
                         onOk={this.handleOk}
                       >
                         <div>
                           <b>商品名称：</b>
                           {modal.commodityName}
                         </div>
                         <div>
                           <b>商品价格：</b>
                           {modal.commodityPrice}元
                         </div>
                         <div>
                           <b>商品描述：</b>
                           {modal.commodityRemark}
                         </div>
                         <div>
                           <b>商品图片：</b>
                           {modal.commodityPicList &&
                             modal.commodityPicList.map(
                               item => {
                                 return (
                                   <img
                                     key={item.pictureId}
                                     src={item.url}
                                     alt=""
                                   />
                                 );
                               }
                             )}
                         </div>
                         <div>
                           <b>类似商品：</b>
                           <List
                             className="ant-commodity-list"
                             grid={{ column: 3 }}
                             loading={loading}
                             size="small"
                             pagination={false}
                             dataSource={samelistData}
                             renderItem={item => (
                               <List.Item
                                 className="list"
                                 key={item.commodityId}
                                 onClick={this.handleSameViewDetail.bind(
                                   this,
                                   item.commodityId
                                 )}
                                 extra={
                                   <img
                                     className="img"
                                     alt="logo"
                                     src={item.url}
                                   />
                                 }
                               >
                                 <List.Item.Meta
                                   title={
                                     <b>
                                       {item.commodityName}
                                     </b>
                                   }
                                 />
                                 <div>
                                   <span>
                                     <b>价格：</b>
                                     {item.commodityPrice}元
                                   </span>
                                 </div>
                                 <div>
                                   <span>
                                     <b>描述：</b>
                                     {item.commodityRemark}
                                   </span>
                                 </div>
                               </List.Item>
                             )}
                           />
                         </div>
                       </Modal>
                       <Modal
                         wrapClassName="detail"
                         title={samemodal.commodityName}
                         visible={samevisible}
                         okText="进入店铺"
                         cancelText="取消"
                         width={500}
                         onCancel={
                           this.handleCloseSameDetail
                         }
                         onOk={this.handleOk}
                       >
                         <div>
                           <b>商品名称：</b>
                           {samemodal.commodityName}
                         </div>
                         <div>
                           <b>商品价格：</b>
                           {samemodal.commodityPrice}元
                         </div>
                         <div>
                           <b>商品描述：</b>
                           {samemodal.commodityRemark}
                         </div>
                         <div>
                           <b>商品图片：</b>
                           {samemodal.commodityPicList &&
                             samemodal.commodityPicList.map(
                               item => {
                                 return (
                                   <img
                                     key={item.pictureId}
                                     src={item.url}
                                     alt=""
                                   />
                                 );
                               }
                             )}
                         </div>
                       </Modal>
                     </Layout>
                   );
                 }
               }
