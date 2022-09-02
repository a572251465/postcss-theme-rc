const defaultOptions = {
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
const getTheme = (opts) => (key) => {
    // 表示选择标识
    const idenKeys = Object.keys(opts.groups);
    if (!idenKeys.includes(key))
        key = idenKeys[0];
    const colorKeyValues = opts.groups[key];
    /***
     * @description 返回结果是：
     * {
     *   light: "#fff",
     *   dark: "black"
     * }
     */
    return opts.themeSelector.reduce((memo, curr, index) => {
        memo[curr] = opts.colors[colorKeyValues[index]] || "#fff";
        return memo;
    }, {});
};
const postcssThemeRc = (opts = {}) => {
    // 设置默认属性
    opts = Object.assign({}, defaultOptions, opts);
    // ---------------------- start 临界值 以及合法判断 ------------------------------
    if (!Array.isArray(opts.themeSelector)) ;
    // 进行临界值判断
    const values = Object.values(opts.groups);
    values.every((item) => item.length === opts.themeSelector.length);
    // ---------------------- end 临界值 以及合法判断 ------------------------------
    const getValue = getTheme(opts);
    // 获取色值函数
    const reGroup = new RegExp(`\\b${opts.fn}\\(([^)]+)\\)`, "g");
    return {
        postcssPlugin: "postcss-theme-rc",
        Declaration(decl) {
            // 如果不存在 表示直接不匹配
            if (!decl.value.includes(opts.fn))
                return;
            const matchs = reGroup.exec(decl.value);
            console.log(getValue(matchs[1]));
        }
    };
};
postcssThemeRc.postcss = true;

export { postcssThemeRc as default };
