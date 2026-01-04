import { useState, useCallback } from "react";


export function useTabOverrides(tabCount = 3) {
  const [overrides, setOverrides] = useState(() => Array(tabCount).fill({}));
  const handleColorChange = useCallback((activeTab, key, color) => {
    setOverrides((prev) =>
      prev.map((o, idx) => (idx === activeTab ? { ...o, [key]: color } : o))
    );
  }, []);
  return [overrides, handleColorChange];
}
