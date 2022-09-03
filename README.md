<div align="center"><h1><u>postcss-theme-rc</u></h1></div>

> a postcss plugin, mainly used for page switching theme

English | [简体中文](https://github.com/a572251465/postcss-theme-rc/blob/master/README.zh-CN.md)

## 📚 Options

| field         | meaning               | default value |
| ------------- |-----------------------|---------------|
| fn            | replace function name | `rc`          |
| colors        | selection all color   | {}            |
| groups        | option grouping       | {}            |
| isImportant   | add highest priority  | false         |
| themeSelector | selection all theme   | []            |

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

## 📦 example

- vite/ vite.config.ts
```typescript
import PostcssThemeRc from "postcss-theme-rc";

const PostcssThemeRcPlugin = PostcssThemeRc({
  colors: {
    c1: "#f5f5f5",
    c2: "#000000",
    c3: "#ccc"
  },
  groups: {
    g1: ["c1", "c2"],
    g2: ["c1", "c2"],
    g3: ["c2", "c3"]
  },
  themeSelector: ["light", "dark"]
});

export default defineConfig({
  css: {
    postcss: {
      plugins: [PostcssThemeRcPlugin]
    }
  }
});
```
