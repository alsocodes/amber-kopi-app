import {useToast} from 'native-base';

export const ToastError = msg => {
  const toast = useToast();
  toast.show({
    title: msg,
    placement: 'bottom',
    bgColor: 'red.600',
  });
};
