<List
  className="ant-store-list"
  grid={{ column: 2 }}
  pagination={null}
  dataSource={listData}
  renderItem={item => (
    <List.Item
      className="list"
      key={item.storeId}
      extra={
        <div>
          <img className="img" alt="logo" src={item.url} />
         
        </div>
      }
    >
      <List.Item.Meta
        title={
            <b>[{item.storeType}]</b>
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
/>;
