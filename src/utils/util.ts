import { Context } from 'koa';

// 获取本机ip地址
export const getIpAddress = () => {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
};

//获取客户端ip地址
export const getClientIp = (req: Context) => {
  var ip =
    req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress ||
    '';
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0];
  }
  ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length);
  console.log('ip:' + ip);
  return ip;
};

/**
 * 生成随机 字符串
 * @description 生成随机字符串给文件命名
 * @returns {string}
 */
export function randomStr(length: number = 16): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/* 时间转换成日期格式 */
export function dateFormart(fmt: string, date: any = new Date()) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      // @ts-ignore
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero(str: string) {
  return ('00' + str).substr(str.length);
}

export function isJSON(str: string) {
  if (typeof str === 'string') {
    try {
      let obj = JSON.parse(str);
      if (typeof obj === 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
  // console.log('It is not a string!')
}
