const pako = require("pako");

export const unzipBlobToJson = async (input: Blob) => {
  const reader = new FileReader();

  const result = new Promise((resolve) => {
    reader.onload = () => {
      const data = reader.result;
      const unzipped = JSON.parse(pako.inflate(data, { to: "string" }));
      resolve(unzipped);
    };
  });
  reader.readAsArrayBuffer(input);
  return result;
};
