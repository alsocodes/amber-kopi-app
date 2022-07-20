/* eslint-disable no-restricted-syntax */
import {Toast} from 'native-base';

export const formatNumber = number => {
  const text = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number || 0);

  return text.replace(/\xa0/g, ' ').replace(/\u202f/g, ' ');
};

export const formatDate = (date, hideTime = false, short = false) => {
  let dateObj = Date.parse(date);

  if (!dateObj) {
    dateObj = new Date(Date.now());
  }

  return new Intl.DateTimeFormat('id', {
    weekday: !short ? 'long' : undefined,
    day: 'numeric',
    month: !short ? 'long' : 'short',
    year: 'numeric',
    hour: !hideTime ? 'numeric' : undefined,
    minute: !hideTime ? 'numeric' : undefined,
  }).format(dateObj);
};

export const formatTime = date => {
  const dateObj = Date.parse(date);

  if (!dateObj) {
    return '-';
  }

  return new Intl.DateTimeFormat('id', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(dateObj);
};

export const showToast = (success, title, description) => {
  Toast.show({
    status: success ? 'success' : 'error',
    title,
    description,
  });
};

export const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

export const ucfirst = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDiscountAmount = disc => {
  let amount = '';

  switch (disc.discountType || disc.type) {
    case 'fix':
      amount = formatNumber(-disc.value);
      break;
    default:
      amount = `-${disc.value}%`;
      break;
  }

  return amount;
};

export const formatPayMethod = method => {
  let payMethod = method || '-';

  if (payMethod === 'cash') {
    payMethod = 'Cash';
  }

  return payMethod;
};

export const handleInfinityScroll = event => {
  const mHeight = event.nativeEvent.layoutMeasurement.height;
  const cSize = event.nativeEvent.contentSize.height;
  const Y = event.nativeEvent.contentOffset.y;
  if (Math.ceil(mHeight + Y) >= cSize) return true;
  return false;
};

export const calculateDiscount = (discount, price) => {
  let amount = 0;

  if (discount.type === 'fix' || discount.discountType === 'fix') {
    amount = discount.value;
  } else {
    amount = (discount.value / 100) * price;
  }

  amount = clamp(amount, 0, price);
  return amount;
};

const objectToFormData = (formData, data, key) => {
  if ((typeof data === 'object' && data !== null) || Array.isArray(data)) {
    for (const i in data) {
      if (
        (typeof data[i] === 'object' && data[i] !== null) ||
        Array.isArray(data[i])
      ) {
        objectToFormData(formData, data[i], `${key}[${i}]`);
      } else {
        formData.append(`${key}[${i}]`, data[i]);
      }
    }
  } else {
    formData.append(key, data);
  }
};

export const createFormData = data => {
  const form = new FormData();

  for (const key in data) {
    const item = data[key];
    if (typeof item?.name === 'string' && item?.type != null) {
      form.append(key, item);
    } else {
      objectToFormData(form, item, key);
    }
  }

  return form;
};

export const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

export default {formatNumber, showToast, clamp, ucfirst, createFormData};
