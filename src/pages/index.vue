<template>
  <el-row>
    <el-col :span="12"
      ><div class="grid-title">
        选择语言
        <el-select v-model="language">
          <el-option
            v-for="language in languages"
            :key="language"
            :value="language"
            :label="language"
            placeholder="请选择语言"
          ></el-option>
        </el-select>
        <el-button
          @click="dialogFormVisible = true"
          type="primary"
          icon="el-icon-s-tools"
          >环境设置</el-button
        >
      </div></el-col
    >
    <el-col :span="12"><div class="grid-title">代码调用图显示区</div> </el-col>
  </el-row>
  <el-row style="height: 100%">
    <el-col :span="12"><div ref="editor" class="grid-content"></div></el-col>
    <el-col :span="12"
      ><div class="grid-content">
        <el-image
          fit="contain"
          :src="image"
          :preview-src-list="previews"
        ></el-image></div
    ></el-col>
  </el-row>
  <el-dialog title="设置依赖程序安装目录" v-model="dialogFormVisible">
    <el-form :model="config">
      <el-form-item label="code2flow安装目录">
        <el-input
          v-model="config.code2flowPath"
          autocomplete="off"
          placeholder="/Users/${username}/Library/Python/3.8/bin/code2flow"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onConfigSave">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import {
  writeFile,
  testCmdIsValid,
  readConfig,
  writeConfig,
} from "../shared/base";
export default {
  name: "App",
  data() {
    return {
      languages: ["javascript"],
      language: "javascript",
      image: "",
      dialogFormVisible: false,
      config: {},
    };
  },
  computed: {
    file_extension() {
      if (this.language == "javascript") {
        return "js";
      }
      return "php";
    },
    previews() {
      return [this.image];
    },
  },
  mounted() {
    // 创建一个js编辑器
    this.$nextTick(() => {
      self.MonacoEnvironment = {
        getWorker(_, label) {
          if (label === "json") {
            return new jsonWorker();
          }
          if (label === "css" || label === "scss" || label === "less") {
            return new cssWorker();
          }
          if (label === "html" || label === "handlebars" || label === "razor") {
            return new htmlWorker();
          }
          if (label === "typescript" || label === "javascript") {
            return new tsWorker();
          }
          return new editorWorker();
        },
      };
      const editor = monaco.editor.create(this.$refs.editor, {
        value: [
          "function helloWorld() {",
          '\tconsole.log("Hello world!");',
          "beenCall();",
          "}",
          "function beenCall() {",
          '\tconsole.log("I am been call!");',
          "}",
        ].join("\n"),
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true,
      });
      var KM = monaco.KeyMod;
      var KC = monaco.KeyCode;
      editor.addCommand(KM.chord(KM.CtrlCmd | KC.KeyS), async () => {
        try {
          const outFilePath = await writeFile(
            editor.getValue(),
            this.file_extension
          );
          this.image = `file://${outFilePath + "?t=" + Date.parse(new Date())}`;
          console.log(outFilePath);
        } catch (e) {
          console.error(e);
          window.alert("生成代码调用图失败");
        }
      });
      this.config = readConfig();
      console.log(this.config);
    });
  },
  methods: {
    async onConfigSave() {
      const config = {};
      if (this.config.code2flowPath) {
        const code2flowPathOk = await testCmdIsValid(this.config.code2flowPath);
        code2flowPathOk && (config.code2flowPath = this.config.code2flowPath);
        console.log("code2flowPathOk", code2flowPathOk);
        if (!code2flowPathOk) {
          window.alert("code2flow路径设置不正确,将不会写入此项");
        }
        window.alert("code2flow路径设置成功");
        this.dialogFormVisible = false;
      }
      this.config = config;
      writeConfig(config);
    },
  },
};
</script>
<style>
.grid-title {
  text-align: center;
}
.grid-content {
  border-radius: 4px;
  border-style: solid;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
}
#drop_zone {
  border: 5px solid blue;
  width: 200px;
  height: 100px;
}
.monaco-editor {
  width: 100%;
  height: 100%;
}
</style>
