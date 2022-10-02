const os = require("os");
const path = require("path");
const fs = require("fs");
const util = require("util");

window.readConfig = () => {
  const config = utools.dbStorage.getItem("code2flow_storages");
  console.log("配置文件是", config);
  return JSON.parse(config || "{}");
};
window.writeConfig = (config = {}) => {
  utools.dbStorage.setItem("code2flow_storages", JSON.stringify(config));
};

// 该文件支持运行 node，electron 和 utools 的 api
window.handlePluginEnter = ({ code, type, payload }) => {
  console.log("handlePluginEnter");
};

utools.onPluginEnter(window.handlePluginEnter);

window.writeFile = (data, filetype) => {
  return new Promise((resolve, reject) => {
    const tmpFile = path.join(os.tmpdir(), `code2flow.${filetype}`);
    fs.writeFile(tmpFile, data, { overwrite: true }, async function (err) {
      if (err) throw err;
      const filePath = await code2flow(tmpFile);
      if (filePath) {
        resolve(filePath);
      }
      reject(new Error("生成call graft失败"));
    });
  });
};

async function code2flow(inFilepath) {
  const exec = util.promisify(require("child_process").exec);

  var isWin = /^win/.test(process.platform);

  if (!isWin) {
    process.env.PATH = process.env.PATH + ":/usr/local/bin";
  }
  const username = os.userInfo().username;
  const outFilepath = path.join(os.tmpdir(), "code2flow.png");
  const { code2flowPath } = await window.readConfig();
  code2flowExec = code2flowPath
    ? code2flowPath
    : `/Users/${username}/Library/Python/3.8/bin/code2flow `;
  console.log("使用code2flowExec的路径是：", code2flowExec);
  const { error, stdout, stderr } = await exec(
    `${code2flowExec}  ${inFilepath} --output ${outFilepath}`
  );
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
  if (!error) {
    return outFilepath;
  } else {
    return "";
  }
}

window.testCmdIsValid = async function testCmdIsValid(cmd_path) {
  const exec = util.promisify(require("child_process").exec);
  const { error, stdout, stderr } = await exec(`test -x ${cmd_path}`);
  console.log(error, stdout, stderr);
  if (!error) {
    return true;
  }
  return false;
};
