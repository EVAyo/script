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
    @apply w-full overflow-hidden px-2 my-8 rounded-lg;
    @apply border-[3px] border-gray-100;
  }

  .article-header {
    @apply w-full grid pl-1 pt-2;
    @apply grid-cols-[63%,37%] text-[14px];
    @apply xl:inline;
  }

  .article-header li {
    @apply lg:inline lg:pr-5 leading-relaxed;
  }

  .article-key, .link {
    @apply text-[#c678d0];
  }

  .link {
    @apply cursor-pointer;
  }

  .article-content {
    @apply break-all whitespace-pre-wrap text-2xl;
    @apply w-full p-1 leading-relaxed;
  }
</style>
