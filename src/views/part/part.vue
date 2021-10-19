<!--
 * @Author: maggot-code
 * @Date: 2021-07-24 16:59:06
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-08-03 12:40:55
 * @Description: file content
-->
<template>
  <main class="a-soul-fan-part">
    <section class="part-body">
      <!-- 搜索框 -->
      <div class="body-search">
        <input
          class="search-input"
          type="text"
          placeholder="请输入用户名"
          v-model="searchValue"
          :disabled="loading"
          @blur="handlerSearch"
          @keydown.enter="handlerSearch"
        />
        <!-- <div
                    class="search-submit"
                    :class="submitDisable"
                    @click="handlerSearch"
                ></div> -->
      </div>

      <div
        class="body-content"
        v-loading="loading"
        element-loading-text="成分姬在努力分析捏~"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <p>
          他 / 她 / 它关注的VUP有:
          <span v-show="hasCopyText" @click="handlerCopyText">复制文本</span>
        </p>
        <search-content
          v-show="searchLoad"
          :list="searchList"
          @cellClick="handlerCell"
        ></search-content>
      </div>

      <p class="body-support">Bilibili@成分姬Official</p>
    </section>
    <el-dialog
      title="在吗？给五位姑娘点点关注"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
      center
      :show-close="false"
    >
      <div class="dig-box">
        <div
          v-for="item in Asoul"
          :key="item.uid"
          @click="toBzhan(item)"
          style="dig-box-item"
        >
          <img :src="item.image" class="header-image" />
        </div>
      </div>
      <div class="dig-button">
        <div @click="handleClose" class="dig-close-button">关闭</div>
      </div>
    </el-dialog>
  </main>
</template>

<script>
import { default as SearchContent } from "./components/search-content";
import { parseTime } from "@/utils/time";

function copy(text) {
  const fakeElem = document.body.appendChild(
    document.createElement("textarea")
  );
  fakeElem.style.position = "absolute";
  fakeElem.style.left = "-9999px";
  fakeElem.setAttribute("readonly", "");
  fakeElem.value = text;
  fakeElem.select();
  try {
    return document.execCommand("copy");
  } catch (err) {
    return false;
  } finally {
    fakeElem.parentNode.removeChild(fakeElem);
  }
}

export default {
  name: "a-soul-fan-part",
  mixins: [],
  components: {
    SearchContent,
  },
  props: {},
  data() {
    //这里存放数据
    return {
      loading: false,
      searchLoad: false,
      searchValue: "",
      searchList: [],
      oldSearchValue: "",
      isFirstSearch: true,
      isSearch: true,
      // 弹窗
      dialogVisible: false,

      // 五小只
      Asoul: [
        {
          name: "向晚",
          uid: 672346917,
          image:
            "https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg@256w_256h_1o.webp",
        },
        {
          name: "贝拉",
          uid: 672353429,
          image:
            "https://i2.hdslb.com/bfs/face/668af440f8a8065743d3fa79cfa8f017905d0065.jpg@256w_256h_1o.webp",
        },
        {
          name: "珈乐",
          uid: 351609538,
          image:
            "https://i1.hdslb.com/bfs/face/a7fea00016a8d3ffb015b6ed8647cc3ed89cbc63.jpg@256w_256h_1o.webp",
        },
        {
          name: "嘉然",
          uid: 672328094,
          image:
            "https://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg@256w_256h_1o.webp",
        },
        {
          name: "乃琳",
          uid: 672342685,
          image:
            "https://i1.hdslb.com/bfs/face/8895c87082beba1355ea4bc7f91f2786ef49e354.jpg@256w_256h_1o.webp",
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {
    submitDisable() {
      return this.loading ? "search-submit-disable" : "";
    },
    hasContent() {
      return this.searchValue.length <= 0;
    },
    hasCopyText() {
      return this.searchList.length > 0;
    },
  },
  //监控data中的数据变化
  watch: {
    searchValue() {
      if (this.searchLoad) this.searchLoad = false;
    },
  },
  //方法集合
  methods: {
    openDig() {
      this.dialogVisible = true;
      this.isFirstSearch = false;
    },
    handleClose() {
      this.dialogVisible = false;
      this.handlerSearch();
    },
    handlerSearch() {
      // 第一次搜索
      if (this.isFirstSearch) {
        this.openDig();
        return;
      }
      if (!this.isSearch) {
        return;
      }
      if (
        this.loading ||
        this.hasContent ||
        this.oldSearchValue === this.searchValue
      ) {
        return false;
      }
      this.isSearch = false;
      setTimeout(() => {
        this.isSearch = true;
        console.log(this.isSearch);
      }, 5 * 1000);

      this.oldSearchValue = this.searchValue;
      this.loading = true;

      this.searchList = [];
      this.$request({
        url: `/api/cfj/?name=${this.searchValue}`,
        methods: "GET",
      })
        .then(this.setSearchReady)
        .then(this.setSearchResponse)
        .catch(this.searchError);
    },
    handlerCell(cell) {
      const { mid } = cell;
      window.open(`https://space.bilibili.com/${mid}`);
    },
    handlerCopyText() {
      const vupName = this.searchList.map(this.setCopyText).join("、");

      const selectTime = parseTime(new Date(), "{y}-{m}-{d} {h}:{i}:{s}");

      const tmp = `@${this.searchValue} 关注的VUP有：\r\n${vupName}\r\n查询时间：${selectTime}\r\n数据来源：@ProJectASF × http://b23.tv/cflHxi`;

      copy(tmp) &&
        this.$message({
          message: "成分姬内容都告诉你了捏~",
          type: "success",
        });
    },
    setSearchReady(success) {
      setTimeout(() => {
        this.searchLoad = true;

        this.loading = false;
      }, 1000);

      return success;
    },
    setSearchResponse(response) {
      const { list } = response;

      this.searchList = list || [];
    },
    setCopyText(item) {
      const { uname } = item;

      return uname;
    },
    searchError(error) {
      // const { message: baseMsg } = error;

      // const { message } = JSON.parse(baseMsg);

      this.$message({ message: error, type: "error" });

      this.searchLoad = true;

      this.loading = false;
    },
    toBzhan(item) {
      window.open(`https://space.bilibili.com/${item.uid}`);
      this.handlerSearch();
    },
  },
};
</script>
<style lang='less' scoped>
@import "./part.less";
.dig-box {
  display: flex;
  justify-content: center;
}
.dig-box-item {
  cursor: pointer;
}
.header-image {
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  max-width: 200px;
  max-height: 200px;
  margin:0 5px 5px 0;
}
.dig-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
}
.dig-close-button {
  cursor: pointer;
  background: #4b5563;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #d1d2d3;
}
@media only screen and (max-width: 1170px) {
  .dig-box {
    flex-direction: column;
    align-items: center;
  }
  .dig-button {
    justify-content: center;
    margin-top: 20px;
  }
  .header-image{
      max-width: 100px;
      max-height: 100px;
  }
}
</style>