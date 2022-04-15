<template>
  <div class="auth">
    <div class="bg"></div>
    <div class="title-info">
      <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201605%2F23%2F20160523123308_VNc4F.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652577872&t=201eb1e4afe9fa05fc7d70de0f64061a" alt="">
      <h2 class="title"> 后台</h2>
    </div>

    <div class="form">
      <a-tabs>
        <a-tab-pane key="1" tab="登入">
          <div class="item">
            <a-input
              size="large"
              placeholder="账户"
              v-model:value="loginForm.account"
            >
              <template
                v-slot:prefix
              >
                <UserOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input
              size="large"
              placeholder="密码"
              v-model:value="loginForm.password"
            >
              <template
                v-slot:prefix
              >
                <LockOutlined />
              </template>
            </a-input>
          </div>

          <div class="item" style="text-align:left" >
            <a href="javascript:;" @click="forgetPassword">忘记密码</a>
          </div>

          <div class="item">
            <a-button
              size="large"
              type="primary"
              @click="login"
            >
              登入
            </a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input
              size="large"
              placeholder="账户"
              v-model:value="regForm.account"
            >
              <template
                v-slot:prefix
              >
                <UserOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input
              size="large"
              placeholder="密码"
              v-model:value="regForm.password"
            >
          
              <template
                v-slot:prefix
              >

                <LockOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input
              size="large"
              placeholder="邀请码"
              v-model:value="regForm.inviteCode"
            >
              <template
                v-slot:prefix
              >
                <MailOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-button
              @click="register"
              size="large"
              type="primary"
            >
              注册
            </a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>




<script src="./index.jsx"></script>

<style lang="scss" scpoed>
  @import './index.scss';
</style>
