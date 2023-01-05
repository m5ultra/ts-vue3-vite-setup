<template>
  <el-container>
    <el-header>
      <HomeHeader />
    </el-header>
    <el-container>
      <el-aside>
        <HomeAside />
      </el-aside>
      <el-main>
        <HomeBreadcrumb />
        <HomeMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.el-header {
  box-shadow: 0 8px 24px -2px rgb(0 0 0 / 5%);
}
.el-aside {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
.el-main {
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
}
</style>
