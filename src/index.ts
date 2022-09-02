import { IDefaultOption } from "./types";
import type { PluginCreator } from "postcss";

// 表示默认参数
const defaultOptions: Partial<IDefaultOption> = {
  fn: "rc",
  groups: {},
  colors: {},
  useCustomProperties: false,
  themeSelector: [],
  nestingPlugin: null
};

/**
 * @author lihh
 * @description 通过key 获取指定主题以及颜色
 * @param opts 传入参数
 */
const getTheme =
  (opts: Partial<IDefaultOption>) =>
  (key: string): Record<string, string> => {
    // 表示选择标识
    const idenKeys = Object.keys(opts.groups!);
    if (!idenKeys.includes(key)) key = idenKeys[0];

    const colorKeyValues = opts.groups![key];
    /***
     * @description 返回结果是：
     * {
     *   light: "#fff",
     *   dark: "black"
     * }
     */
    return opts.themeSelector!.reduce((memo, curr, index) => {
      memo[curr] = opts.colors![colorKeyValues[index]] || "#fff";
      return memo;
    }, {} as Record<string, string>);
  };

const postcssThemeRc: PluginCreator<Partial<IDefaultOption>> = (opts = {}) => {
  // 设置默认属性
  opts = Object.assign({}, defaultOptions, opts);

  // ---------------------- start 临界值 以及合法判断 ------------------------------
  if (!Array.isArray(opts.themeSelector)) {
    new Error(`params<themeSelector> must be an array`);
  }
  // 进行临界值判断
  const values = Object.values(opts.groups!);
  const fitFlag = values.every(
    (item) => item.length === opts.themeSelector!.length
  );
  if (!fitFlag)
    new Error(
      `params<groups> The length of the array in the object must be consistent with the length of the themeselector `
    );
  // ---------------------- end 临界值 以及合法判断 ------------------------------

  const getValue = getTheme(opts);
  // 获取色值函数
  const reGroup = new RegExp(`\\b${opts.fn}\\(([^)]+)\\)`, "g");

  return {
    postcssPlugin: "postcss-theme-rc",
    Declaration(decl) {
      // 如果不存在 表示直接不匹配
      if (!decl.value.includes(opts.fn!)) return

      const matchs = reGroup.exec(decl.value);
      console.log(getValue(matchs![1]));
    }
  };
};

postcssThemeRc.postcss = true;
export default postcssThemeRc;
