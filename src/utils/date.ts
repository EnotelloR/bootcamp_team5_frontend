const getDateDiff = (date1: Date, date2: Date) => {
  const diffInMs = date1.getTime() - date2.getTime();
  return Math.trunc(diffInMs / (1000 * 60 * 60 * 24));
};

const getDaysStr = (num: number): string => {
  let str;
  const preLast = Math.trunc((num % 100) / 10);
  if (preLast === 1) {
    str = 'дней';
  } else if (num % 10 === 1) {
    str = 'день';
  } else if (num % 10 >= 2 && num % 10 <= 4) {
    str = 'дня';
  } else {
    str = 'дней';
  }
  return num + ' ' + str;
};

const when = (date: Date): string => {
  const today = new Date();
  const dt = new Date(date);
  dt.setHours(0);
  dt.setMinutes(0);
  dt.setSeconds(0);
  const days = getDateDiff(today, dt);
  if (days === 0) {
    return 'Сегодня';
  } else if (days === 1) {
    return 'Вчера';
  } else {
    return `${getDaysStr(days)} назад`;
  }
};

const formatOrderDate = (str: string): string => {
  const date = new Date(Date.parse(str));
  const hours = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
  const minutes =
    date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
  return `${when(date)}  ${hours}:${minutes} i-GMT+${-date.getTimezoneOffset() / 60}`;
};

export { formatOrderDate };
