<div align="center"><h1><u>postcss-theme-rc</u></h1></div>

> a postcss plugin, mainly used for page switching theme

English | [简体中文](https://github.com/a572251465/postcss-theme-rc/blob/master/README.zh-CN.md)

## 📚 Options

| field         | meaning               |
| ------------- |-----------------------|
| fn            | replace function name |
| colors        | selection all color   |
| groups        | option grouping       |
| isImportant   | add highest priority  |
| themeSelector | selection all theme   |

## 🔨 Usage

- option definition
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

- css transform

```css
div a {color: rc(A01); background: red;}

/* => */

div a {color: #fff; background: red;}
html[data-theme-rc='light'] div a {color: #fff;}
html[data-theme-rc='dark'] div a {color: black;}
```

## 📦 Install

```bash
$ npm install postcss-theme-rc -D
# or
$ yarn add postcss-theme-rc -D
# or
$ pnpm install postcss-theme-rc -D
```
