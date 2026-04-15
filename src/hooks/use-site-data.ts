import { useState, useEffect, useCallback } from "react";
import { getData, setData, type SiteData } from "@/lib/data";

export function useSiteData() {
  const [data, setLocalData] = useState<SiteData>(getData());

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<SiteData>;
      setLocalData(customEvent.detail);
    };
    window.addEventListener("siteDataUpdated", handler);
    return () => window.removeEventListener("siteDataUpdated", handler);
  }, []);

  const updateData = useCallback((newData: SiteData) => {
    setLocalData(newData);
    setData(newData);
  }, []);

  return { data, updateData };
}
