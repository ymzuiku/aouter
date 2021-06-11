import { useLocation } from "wouter";
import { aouterConfig } from "./config";
import { useRef, useLayoutEffect } from "react";
import qs from "querystring-number";

const _history = [] as { url: string; top: number }[];
export const lazyCache = {} as { [key: string]: any };

export const useAoute = () => {
  const [localtion, setLocaltion] = useLocation();
  const params = useRef({});

  useLayoutEffect(() => {
    params.current = qs.parse(window.location.search) || {};
  }, [window.location.search]);

  return {
    localtion,
    params: params.current,
    prefetch: (url: string) => {
      const lazy = lazyCache[url];
      if (lazy) {
        lazy.fn();
      }
    },
    replace: (url: string, params?: any) => {
      if (typeof window === "undefined") {
        return;
      }
      if (params) {
        url += "?" + qs.stringify(params);
      }
      setLocaltion(url, { replace: true });
    },
    push: (url: string, params?: any) => {
      if (typeof window === "undefined") {
        return;
      }
      if (params) {
        url += "?" + qs.stringify(params);
      }
      _history.push({ url, top: window.scrollY });
      if (aouterConfig.onlyUseReplace) {
        setLocaltion(url, { replace: true });
      } else {
        setLocaltion(url, { replace: false });
      }
    },
    back: () => {
      if (typeof window === "undefined") {
        return;
      }
      _history.pop();
      const last = _history.pop() || { top: 0, url: "/" };
      if (aouterConfig.onlyUseReplace) {
        setLocaltion(last.url, { replace: true });
        setTimeout(() => {
          window.scrollTo({ top: last.top });
        });
      } else {
        history.back();
      }
    },
  };
};
