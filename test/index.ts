import { ReportConfig, BehaviorData, APIRequestOthers, ErrorPOS } from './reportTypes';

/**
 * 获取是否开启上报
 */
export const getReportEnabled = () => {
  return !!window.__bl && window.__bl.setConfig;
}

/**
 * 获取是否开启上报(我们自己的)
 */
export const getSentinalEyeEnabled = () => {
  return !!window._se && window._se.isOpen;
}

/**
 * @param config 在SDK初始完成后调用setConfig()接口来重新修改部分配置项
 * @param config https://help.aliyun.com/zh/arms/browser-monitoring/developer-reference/sdk-reference?spm=a2c4g.11186623.0.0.5a275846j9LRR5#concept-58655-zh
 * @returns
 */
export const setConfig = (config: ReportConfig) => {
  if (getReportEnabled()) {
    window.__bl.setConfig(config);
  }
}

/**
 * 设置项目自定义信息
 */
export var setCustomInfo = function (customInfo: Record<string, unknown>) {
  if (getSentinalEyeEnabled()) {
      window._se.setCustomInfo(customInfo);
  }
};

/**
 * 设置项目自定义信息
 */
export var setConfigInfo = function (configInfo: Record<string, unknown>) {
  if (getSentinalEyeEnabled()) {
      window._se.setConfigInfo(configInfo);
  }
};
/**
 * 设置用户ID
 */
export const setUid = (uid: string, tenantID?: string) => {
  setConfig({ uid });
  if (getSentinalEyeEnabled()) {
    window._se.setUID(uid, tenantID);
  }
};

/**
 * API 上报
 * @param url
 * @param success
 * @param others
 */
export const reportAPIRequest = (url: string, success = false, others?: APIRequestOthers): void => {
  if (!getReportEnabled()) return;
  const info = others || { time: 1000 } as APIRequestOthers;
  window.__bl.api({
    api: url,
    success,
    ...info,
  });
};

/**
 * JS报错上报
 * @param error
 * @param pos
 * @returns
 */
export const reportError = (error: Error, pos?: ErrorPOS): void => {
  if (getReportEnabled()) {
    window.__bl.error(error, pos);
  }
  if (getSentinalEyeEnabled()) {
    window._se.reportError(error, pos);
  }
};

/**
 * 用户行为上报
 * @param data
 * @param page
 * @returns
 */
export const reportBehavior = (data: BehaviorData, page = window.location.href): void => {
  if (!getReportEnabled()) return;
  window.__bl.addBehavior({ data, page });
  window.__bl.reportBehavior();
};

export const devTrace = (key: string, value?: unknown) => {
  if (getReportEnabled()) {
    window.__bl.sum(key, typeof value === 'number' ? value : 0);
  }
  if (getSentinalEyeEnabled()) {
    window._se.devTrace(key, value);
  }
};
