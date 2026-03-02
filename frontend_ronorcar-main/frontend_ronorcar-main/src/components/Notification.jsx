import React from "react";
import { Card, List, Avatar } from "antd";
import moment from "moment";

const { Meta } = Card;

const NotificationComponent = ({ notifications }) => {
  return (
    <List
      dataSource={notifications}
      renderItem={(notification) => (
        <List.Item key={notification.id}>
          <Card>
            <Meta
              avatar={<Avatar src={notification.avatar} />}
              title={notification.title}
              description={notification.message}
            />
            <div style={{ marginTop: 10, textAlign: "right" }}>
              {moment(notification.timestamp).fromNow()}
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default NotificationComponent;
