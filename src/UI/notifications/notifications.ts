import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const openNotificationWithIcon = (
  type: NotificationType,
  message: string,
  description: string,
) => {
  notification[type]({
    duration: 2.0,
    message,
    description,
  });
};

export default openNotificationWithIcon;
