<template>
  <div class="content_right">
    <div class="content-right-item">
      <h3 class="pink title">枝江作文展
        <a href="https://asoulcnki.asia/rank">[点此进入]</a>
      </h3>
      <div class="ab-content">
        枝网原班人马打造，现已支持关键词搜索和按成员筛选
      </div>
    </div>
    <div class="content-right-item">
      <ul class="intro-list">
        <li class="intro">
          枝网查重系统介绍
        </li>
        <!-- rewite by ch3cknull -->
        <li v-for="i in intro" :key="i.key">
          <p>
            <span class="pink">{{ i.key }}</span>
            <span v-if="i.type == 'text'">{{i.value}}</span>
            <span v-else>
              <a target="_blank" :href="i.value.href">{{i.value.text}}</a>
            </span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const description = [
  {key: '比对库范围：', value: 'b站动态、视频评论区（上述范围仅限A-Soul的六个官方账号）', type: 'text'},
  {key: '参考文献：', value: `[1]李旭.基于串匹配方法的文档复制检测系统研究[D].燕山大学.`, type: 'text'},
  {key: '开源地址：', value: {text: 'ASoulCnki', href: 'https://github.com/ASoulCnki'}, type: 'link'},
  {key: '页面问题反馈地址：', value: {text: 'ProJectASF', href: 'https://space.bilibili.com/1442421278'}, type: 'link'},
  {key: '查重接口反馈地址：', value: {text: '查重姬Official', href: 'https://t.bilibili.com/542031663106174238'}, type: 'link'},
  {key: '官方API文档：', value: {text: 'GitHub', href: 'https://github.com/ASoulCnki/ASoulCnkiBackend/blob/master/api.md'}, type: 'link'},
]

export default {
  name: '',
  data() { 
    return {
      intro: description
    }
  }
}
</script>

<style scoped>
  .content-right-item {
    border: 3px solid;
    @apply border-gray-100 mb-10 text-3xl p-3;
  }

  .title {
    @apply text-3xl mt-2;
  }

  .title a {
    @apply text-blue-500;
  }

  .ab-content {
    font-size: 16px;
    @apply w-full break-all my-3 leading-relaxed tracking-wider;
  }

  .intro-list {
    font-size: 17px;
    @apply break-all font-medium leading-loose;
  }

  .intro {
    @apply text-3xl my-3;
  }

  .pink {
    color: #c678d0;
  }
</style>