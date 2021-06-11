import React, { useEffect } from "react";
import { aouterConfig } from "./config";
import { useAoute } from "./useAoute";

export interface LinkExpProps {
  href: string;
  prefetch?: number;
  replace?: boolean;
  params?: any;
}

type FC = React.FC<React.HTMLProps<HTMLButtonElement> & LinkExpProps>;

export const Link: FC = ({
  href,
  params,
  replace,
  onMouseEnter,
  onClick,
  onTouchEnd,
  onMouseUp,
  type,
  className,
  prefetch,
  ...rest
}) => {
  if (prefetch === void 0) {
    prefetch = aouterConfig.basePrefetchTime;
  }
  const route = useAoute();
  function atMouseEnter(e: any) {
    if (onMouseEnter) {
      onMouseEnter(e);
    }
    route.prefetch(href);
  }

  function atClick(e: any) {
    if (onClick) {
      onClick(e);
    }
    if (href === "back") {
      route.back();
    } else {
      if (replace) {
        route.replace(href, params);
      } else {
        route.push(href, params);
      }
    }
  }

  useEffect(() => {
    if (prefetch && prefetch > 0) {
      setTimeout(() => {
        route.prefetch(href);
      }, prefetch);
    }
  }, []);

  return (
    <button
      type="button"
      className={"focus:outline-none " + className}
      onTouchEnd={atClick}
      onMouseUp={atClick}
      onMouseEnter={atMouseEnter}
      {...rest}
    />
  );
};
