<script setup lang="ts">
import { ElNotification } from 'element-plus'

defineOptions({
  name: 'BuyIt',
})

const isActived = ref(false)
setTimeout(() => {
  isActived.value = false
}, 5000)

onMounted(() => {
  // ElNotification({
  //   type: 'success',
  //   title: '温馨提示',
  //   dangerouslyUseHTMLString: true,
  //   message: `
  //     <p>当前访问的是<b>基础版</b> (Vue3)</p>
  //     <p>你可以点<a href="https://fantastic-admin.gitee.io/pro-example/" target="_blank"><b>这里</b></a>访问专业版 (Vue3)</p>
  //   `,
  //   position: 'bottom-right',
  //   duration: 5000,
  // })

  // setTimeout(() => {
  //   ElNotification({
  //     type: 'info',
  //     title: '「 专业版限时优惠 」',
  //     dangerouslyUseHTMLString: true,
  //     message: `
  //       <p>原价 1099.00 元，现价 <b style="font-size: 18px; color: #ff4400;">899.00</b> 元，更有超值优惠合集，立减 <b style="color: #ff4400;">799.00</b> 元，点击<a href="https://fantastic-admin.gitee.io/buy.html" target="_blank">查看详情</a>！</p>
  //     `,
  //     position: 'bottom-right',
  //     duration: 0,
  //   })
  // }, 0)
})

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <!-- <div class="buy-it" :class="{ actived: isActived }">
    <div class="item" @click="open(`https://fantastic-admin.gitee.io/buy.html`)">
      <svg-icon name="fixed-right-buy" />
      <span class="title">购买<br>专业版</span>
    </div>
    <div class="item" @click="open('https://gitee.com/fantastic-admin/basic')">
      <svg-icon name="fixed-right-code" />
      <span class="title">下载<br>基础版</span>
    </div>
    <div class="item" @click="open(`https://fantastic-admin.gitee.io`)">
      <svg-icon name="fixed-right-doc" />
      <span class="title">开发<br>文档</span>
    </div>
    <div class="item" @click="open(`https://fantastic-admin.gitee.io/support.html`)">
      <svg-icon name="fixed-right-chat" />
      <span class="title">技术<br>支持</span>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
.buy-it {
  position: fixed;
  z-index: 10;
  right: -58px;
  top: 50%;
  transform: translateY(-50%);
  width: 70px;
  display: flex;
  flex-direction: column;
  transition: right 0.3s;

  &.actived,
  &:hover {
    right: 0;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70px;
    text-align: center;
    color: #fff;
    border-bottom: 1px solid #fff;
    transition: 0.3s;
    opacity: 0.7;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    &:first-child {
      border-top-left-radius: 5px;
    }

    &:last-child {
      border-bottom-left-radius: 5px;
      border-bottom: 0;
    }

    &:nth-child(1) {
      background-color: #ff4200;
    }

    &:nth-child(2) {
      background-color: #409eff;
    }

    &:nth-child(3) {
      background-color: #0fcc1a;
    }

    &:nth-child(4) {
      background-color: #343b42;
    }

    .icon {
      display: block;
      margin: 0 auto;
      font-size: 20px;
    }

    .title {
      display: inline-block;
      font-size: 12px;
    }
  }
}
</style>
