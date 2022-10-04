const pako = require("pako");

export const unzipBlobToString = async (input: Blob) => {
  const reader = new FileReader();

  const result: Promise<string> = new Promise((resolve) => {
    reader.onload = () => {
      const data = reader.result;
      const unzippedStr = pako.inflate(data, { to: "string" });
      resolve(unzippedStr);
    };
  });
  reader.readAsArrayBuffer(input);
  return result;
};
