<div align="center"><h1><u>postcss-theme-rc</u></h1></div>

> 一个postcss插件，主要用作主题切换

简体中文 | [English](https://github.com/a572251465/postcss-theme-rc/blob/master/README.md)

## 📚 参数

| 字段            | 含义         |
|---------------|------------|
| fn            | 替换方法名称     |
| colors        | 可以选择的所有颜色  |
| groups        | 参数分组       |
| isImportant   | 是否添加最高优先级  |
| themeSelector | 可以选择的所有的模板 |

## 🔨 使用

- 参数定义
```javascript
const opts = {
  colors: {
    a: "#fff",
    b: "black"
  },
  groups: {
    A01: ["a", "b"],
    A02: ["a", "b"]
  },
  themeSelector: ["light", "dark"]
};
```

- css 转换

```css
div a {color: rc(A01); background: red;}

/* => */

div a {color: #fff; background: red;}
html[data-theme-rc='light'] div a {color: #fff;}
html[data-theme-rc='dark'] div a {color: black;}
```

## 📦 注册

```bash
$ npm install postcss-theme-rc -D
# or
$ yarn add postcss-theme-rc -D
# or
$ pnpm install postcss-theme-rc -D
```
