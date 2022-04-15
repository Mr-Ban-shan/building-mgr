<template>
  <div class="basic-layout">
    <div class="app-header">

      <div class="left">
        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F0c%2Fef%2Fa0%2F0cefa0f17b83255217eddc20b15395f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652577774&t=709a8b82b98a9a04e502fc142faf516c" alt="">
        <div class="title">建材管理系统</div>
      </div>

      <div class="right">
        <div class="hello-msg">你好，</div>
        <div class="logout" @click="logout">退出</div>
      </div>

    </div>

    <div class="app-header-placeholder"></div>

    <div class="app-content">
      <div class="left">
        <app-nav />
      </div>

      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
