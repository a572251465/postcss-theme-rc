import { IDefaultOption } from "./types";
import type { PluginCreator } from "postcss";

// 表示默认参数
const defaultOptions: Partial<IDefaultOption> = {
  fn: "rc",
  groups: {},
  colors: {},
  isImportant: false,
  themeSelector: []
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
    throw new Error(`params:themeSelector must be an array`);
  }

  if (opts.themeSelector.length <= 0)
    throw new Error(`params:themeSelector is not empty array`);

  // 进行临界值判断
  const values = Object.values(opts.groups!);
  if (!values.every((item) => Array.isArray(item)))
    throw new Error(`params:groups element must is a array`);

  const fitFlag = values.every(
    (item) => item.length === opts.themeSelector!.length
  );
  if (!fitFlag)
    throw new Error(
      `params:groups The length of the array in the object must be consistent with the length of the themeSelector`
    );
  // ---------------------- end 临界值 以及合法判断 ------------------------------

  const getValue = getTheme(opts);
  // 获取色值函数
  const reGroup = new RegExp(`\\b${opts.fn}\\(([^)]+)\\)`, "g");

  return {
    postcssPlugin: "postcss-theme-rc",
    Declaration(decl, { Rule }) {
      // 如果不存在 表示直接不匹配
      if (!decl.value.includes(opts.fn!)) return;

      const matchs = reGroup.exec(decl.value);
      if (matchs === null) return;

      const mappingValues = getValue(matchs![1]);
      if (Object.keys(mappingValues).length <= 0) return;

      // 修改原来的属性
      decl.value = Object.values(mappingValues)[0];
      const selector = (decl.root().nodes[0] as any).selector;

      for (const [theme, color] of Object.entries(mappingValues)) {
        // 建立新的规则
        const newRule = new Rule({
          selector: `html[data-theme-${opts.fn}='${theme}'] ${selector}`,
          source: decl.source
        });
        // 添加到root节点中
        decl.root().append(newRule);
        // 使用新的value值
        newRule.append(
          decl.clone({ value: color, important: !!opts.isImportant })
        );
      }
    }
  };
};

postcssThemeRc.postcss = true;
export default postcssThemeRc;
