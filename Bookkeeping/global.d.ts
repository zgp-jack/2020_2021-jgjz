/*
 * @Author: zyb
 * @Date: 2020-08-27 20:38:37
 * @LastEditors: zyb
 * @LastEditTime: 2020-09-08 15:17:40
 * @Description: 
 */
declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";
declare module "*.module.scss";

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq';
    [key: string]: any;
  }
}