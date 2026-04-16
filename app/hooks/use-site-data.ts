"use client";

import { useState, useEffect, useCallback } from "react";
import { getData, setData, type SiteData, getDefaultData } from "@/lib/data";

export function useSiteData() {
  const [data, setSiteData] = useState<SiteData>(getDefaultData());

  useEffect(() => {
    const savedData = getData();
    if (savedData) {
      setSiteData(savedData);
    }
  }, []);

  const updateData = useCallback((newPartialData: Partial<SiteData>) => {
    setSiteData((prevData) => {
      const updatedData = { ...prevData, ...newPartialData };
      setData(updatedData);
      return updatedData;
    });
  }, []);

  return { data, updateData };
}
