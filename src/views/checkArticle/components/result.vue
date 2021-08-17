<!-- 查重返回结果 -->
<template>
  <div class="article">
    <ul class="article-header" >
      <li>
        <span class="article-key">发表时间：</span>
        <span class="article-value">{{ result.reply.createTime }}</span>
      </li>
      <li>
        <span class="article-key">重复率：</span>
        <span class="article-value">{{ toPercent }}</span>
      </li>
      <li>
        <span class="article-key">作者：</span>
        <span class="article-value">{{ result.reply.m_name }}</span>
      </li>
      <li>
        <span class="article-value"><a :href="result.reply_url" class="link">原文地址</a></span>
      </li>
    </ul>
    <div class="article-content">{{ result.reply.content }}</div>
  </div>
</template>

<script>
export default {
  props:{
    result:Object
  },
  name: "Article",
  computed: {
    toPercent(){
      const point = this.result.rate
      return Number(point * 100).toFixed(2) + '%';
    }
  }
}
</script>

<style scoped>
  .article {
    border: 3px solid;
    @apply w-full overflow-hidden border-gray-100 p-2 pt-5;
  }

  .article-header {
    grid-template-columns: 65% 35%;
    @apply w-full grid pl-2 my-2;
    @apply xl:inline;
  }

  .article-header li {
    @apply text-2xl lg:inline lg:pr-5;
  }

  .article-key, .link {
    color: #c678d0;
    /* @apply font-semibold; */
  }

  .link {
    @apply cursor-pointer;
  }

  .article-content {
    @apply break-all whitespace-pre-wrap text-2xl;
    @apply w-full p-2 leading-relaxed;
  }
</style>
