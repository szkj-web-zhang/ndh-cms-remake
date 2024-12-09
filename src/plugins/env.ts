export const isDevFn = (mode: string): boolean => {
  return mode === "development";
};

export const isProdFn = (mode: string): boolean => {
  return mode === "production";
};

export const isTestFn = (mode: string): boolean => {
  return mode === "test";
};

// 将所有环境变量配置文件读取到process.env中
export const wrapperEnv = (envConf: Recordable): ViteEnv => {
  const ret: any = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {}
    }
    ret[envName] = realName;
  }
  return ret;
};
