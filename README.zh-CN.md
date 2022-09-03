<div align="center"><h1><u>postcss-theme-rc</u></h1></div>

> 一个 postcss 插件，主要用作主题切换

简体中文 | [English](https://github.com/a572251465/postcss-theme-rc/blob/master/README.md)

## 📚 参数

| 字段          | 含义                 | 默认值 |
| ------------- | -------------------- | ------ |
| fn            | 替换方法名称         | `rc`   |
| colors        | 可以选择的所有颜色   | {}     |
| groups        | 参数分组             | {}     |
| isImportant   | 是否添加最高优先级   | false  |
| themeSelector | 可以选择的所有的模板 | []     |

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
div a {
  color: rc(A01);
  background: red;
}

/* => */

div a {
  color: #fff;
  background: red;
}
html[data-theme-rc="light"] div a {
  color: #fff;
}
html[data-theme-rc="dark"] div a {
  color: black;
}
```

## 📦 注册

```bash
$ npm install postcss-theme-rc -D
# or
$ yarn add postcss-theme-rc -D
# or
$ pnpm install postcss-theme-rc -D
```

## 📦 配置实例

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
