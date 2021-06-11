import { lazy, Suspense } from "react";
import { lazyCache } from "./useAoute";
import { Route as Woute } from "wouter";

export interface LazyRouteProps {
  component: any;
  path: string;
  loading?: any;
}

type FC = React.FC<LazyRouteProps>;

const Loading = <div style={{ all: "unset" }} />;

export const Aoute: FC = ({ path, component, loading }) => {
  let Comp = lazyCache[path];
  if (!Comp) {
    lazyCache[path] = lazy(component);
    Comp = lazyCache[path];
  }

  return (
    <Woute path={path}>
      <Suspense fallback={Loading}>
        <Comp />
      </Suspense>
    </Woute>
  );
};
