<template>
  <el-row>
    <el-col :span="12"><div class="grid-title">代码显示区</div></el-col>
    <el-col :span="12"><div class="grid-title">流程图显示区</div></el-col>
  </el-row>
  <el-row>
    <el-col :span="12"><div class="grid-content"></div></el-col>
    <el-col :span="12"><div class="grid-content"></div></el-col>
  </el-row>
</template>

<script>
export default {
  name: "App",
};
</script>
<style>
.grid-title {
  text-align: center;
}
.grid-content {
  border-radius: 4px;
  border-style: solid;
  height: 480px;
}
</style>
