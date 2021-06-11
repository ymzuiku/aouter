# aouter

aouter = Auto Router

> Gzip size 0.8kb

基于 wouter，一个类似于 NextJS 的约定路由方案，通过脚本编译路由文件，适用于 SPA

## In vate

Add watch at `vite.config.ts`

```tsx
import aouterWatch from "aouter/watch";

aouterWatch({
  routes: "src/pages",
  src: "src",
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

`Pages/index.tsx` :

```tsx
import { Link } from "aouter";

export default () => {
  return (
    <div>
      <h2>hello page</h2>
      <Link href="back">Go back</Link>
      <Link prefetch={500} href="/user" params={{ age: 50 }}>
        Go to user
      </Link>
    </div>
  );
};
```

Hooks `useRoute`:

```tsx
import { useRoute } from "aouter";

export default () => {
  const route = useRoute();
  function handleGoPage() {
    route.push("/user", { age: 50 });
    // Other api:
    // route.replace("/user", { age: 50 });
    // route.back()
    // route.prefetch("/user")
  }
  return (
    <div>
      <h2>hello page</h2>
      <button onClick={handleGoPage}>go page</button>
    </div>
  );
};
```
