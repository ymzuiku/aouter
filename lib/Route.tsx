import React, { lazy, Suspense } from "react";
import { lazyCache } from "./useRoute";
import { Route as Woute } from "wouter";

export interface LazyRouteProps {
  component: any;
  path: string;
}

type FC = React.FC<LazyRouteProps>;

const Loading = <div style={{ all: "unset" }} />;

export const Route: FC = ({ path, component }) => {
  let last = lazyCache[path];
  if (!last) {
    lazyCache[path] = {
      fn: component,
      Lazy: lazy(component),
    };
    last = lazyCache[path];
  }

  return (
    <Woute path={path}>
      {(params) => {
        return last.Comp ? (
          <last.Comp params={params} />
        ) : (
          <Suspense fallback={Loading}>
            <last.Lazy params={params} />
          </Suspense>
        );
      }}
    </Woute>
  );
};
