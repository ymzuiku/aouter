import { useEffect } from "react";
import { config } from "./config";
import { useAoute } from "./useAoute";

export interface LinkExpProps {
  href: string;
  as?: string;
  prefetch?: number;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  locale?: string | false;
}

type FC = React.FC<React.HTMLProps<HTMLButtonElement> & LinkExpProps>;

export const Link: FC = ({
  href,
  as,
  locale,
  scroll,
  replace,
  onMouseEnter,
  onClick,
  onTouchEnd,
  onMouseUp,
  type,
  className,
  prefetch = config.basePrefetchTime,
  ...rest
}) => {
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
      route.push(href);
    }
  }

  useEffect(() => {
    if (config.autoPrefetch && prefetch > 0) {
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
