import { SendTracker } from '@ctrip/sentinel-eye/dist/types/lib/tracker';

export interface APIRequestOthers {
  /** 接口耗时 */
  time: Number;
  /** 返回码 */
  code?: String | Number;
  /** 错误信息 */
  msg?: String;
  /** 请求开始时间 */
  begin?: String;
  traceId?: String;
}

export interface APIReportInfo extends APIRequestOthers {
  api: String;
  success: Boolean;
}

export interface ErrorPOS {
  /** 错误发生的文件名 */
  filename?: String;
  /** 错误发生的行数 */
  lineno?: Number;
  /** 错误发生的列数 */
  colno?: Number;
}

export interface BehaviorData {
  /** 行为名称，String类型，必填，最大长度20字符 */
  name: string;
  /** 行为内容，String类型，必填，最大长度200字符 */
  message: string;
}

export interface BehaviorInfo {
  data: BehaviorData;
  /** 行为发生的页面,	默认值：location.pathname的值 */
  page?: string;
}

export type IgnoreFunc = (str: string) => boolean;
export type IgnoreType = String | RegExp | IgnoreFunc;
export interface Ignore {
  ignoreUrls?: IgnoreType[];
  ignoreApis?: IgnoreType[];
  ignoreErrors?: IgnoreType[];
  ignoreResErrors?: IgnoreType[];
}

export enum ReportEnvironment {
  /** 表示线上环境 */
  prod = 'prod',
  /** 表示灰度环境 */
  gray = 'gray',
  /** 表示预发环境 */
  pre = 'pre',
  /** 表示日常环境 */
  daily = 'daily',
  /** 表示本地环境 */
  local = 'local',
}

export interface ReportConfig {
  uid?: String;
  /** 在enableSPA设为true的前提下，页面触发hashchange事件时，parseHash参数用于将URL Hash解析为Page字段。 */
  parseHash?: Function;
  /** 禁用AJAX请求监听 */
  disableHook?: Boolean;
  /** 忽略Page URL大小写 */
  ignoreUrlCase?: Boolean;
  ignore?: Ignore;
  /** 是否允许自动发送性能日志 */
  autoSendPerf?: Boolean;
  environment?: string;
  /** 应用版本号 */
  release?: String;
}

interface ArmsBL {
  setConfig: (config: ReportConfig) => void;
  sum: (key: string, value?: number) => void;
  api: (info: APIReportInfo) => void;
  error: (error: Error, pos?: ErrorPOS) => void;
  addBehavior: (behavior: BehaviorInfo) => void;
  reportBehavior: () => void;
};

declare global {
  interface Window {
    __bl: ArmsBL;
    _se: SendTracker;
  }
}
