import path from "path";
const getPath = (dirname: string, subdir: string) => {
  return path.resolve(dirname, subdir);
};
// module.exports = getPath;
export default getPath;
