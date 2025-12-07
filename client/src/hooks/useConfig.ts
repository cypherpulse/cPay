import { useState, useCallback, createContext, useContext } from "react";
import type { AppConfig } from "@shared/schema";
import { defaultConfig } from "@/config/config";

interface ConfigContextType {
  config: AppConfig;
  setMockMode: (enabled: boolean) => void;
  updateConfig: (updates: Partial<AppConfig>) => void;
}

export const ConfigContext = createContext<ConfigContextType | null>(null);

export function useConfigState() {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);

  const setMockMode = useCallback((enabled: boolean) => {
    setConfig((prev) => ({ ...prev, mockMode: enabled }));
  }, []);

  const updateConfig = useCallback((updates: Partial<AppConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  return { config, setMockMode, updateConfig };
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within ConfigProvider");
  }
  return context;
}
