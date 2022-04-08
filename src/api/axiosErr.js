import axios from 'axios';
import ErrorMsg from './errorMsg';

// respone拦截器 我们主要拦截异常，对异常信息统一处理
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 异常信息统一处理1）,直接给出异常提示
    // const errMsg = ErrorMsg(error.response);
    // console.log({
    //   type: 'error',
    //   title: '错误信息',
    //   closeable: true,
    //   duration: 0,
    //   content: errMsg,
    // });
       // 异常处理2）调用统一异常函数
    ErrorMsg(error.response);
    return Promise.reject(error);
  }
);

export default axios;
