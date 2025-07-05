import os from "os";

const networkInterfaces = os.networkInterfaces();

const getIP = () => {
  for (const interfaceName in networkInterfaces) {
    const iface: any = networkInterfaces[interfaceName];
    for (const alias of iface) {
      if (alias.family === "IPv4" && !alias.internal) {
        if (alias.address.length > 0) return alias.address;
        return "IP";
      }
    }
  }
};
export { getIP };
