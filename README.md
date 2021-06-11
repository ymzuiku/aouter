# aouter

aouter = Auto Router

基于 wouter，一个类似于 NextJS 的约定路由方案，通过脚本编译路由文件

## In vate

Add watch at `vite.config.ts`

```tsx
import aouterWatch from "aouter/watch";

aouterWatch({
  routes: "client/pages",
  src: "client",
  watch: process.env.NODE_ENV !== "production",
});
```

Edit `main.tsx` that use `_aouter.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom";
import AllAouters from "./_aouter";

ReactDOM.render(
  <React.StrictMode>
    <AllAouters />
  </React.StrictMode>,
  document.getElementById("root")
);
```
