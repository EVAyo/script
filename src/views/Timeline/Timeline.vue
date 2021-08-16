<template>
  <div ref="timeline" class="timeline">
    <div class="a-timeline">
      <div v-for="(i, idx) in list" :key="i.id || idx" class="a-timeline-item">
        <div class="a-timeline-item-symbol" />
        <div class="a-timeline-item-container" @click="handleClick(i.target_url)">
          <h2 class="a-timeline-item-title">{{ i.title }}</h2>
          <div class="a-timeline-item-content">{{ i.content }}</div>
          <div class="a-timeline-item-date">{{ format(i.timestamp) }}</div>
        </div>
      </div>
      <div v-if="page < dataSource.length" class="a-timeline-item">
        <div class="a-timeline-item-symbol" />
        <div class="a-timeline-item-space" />
      </div>
    </div>
    <div class="last-page" v-if="isLastPage">---------已经是最后一页啦---------</div>
  </div>
</template>

<script>
export default {
  name: 'ATimeline',
  props: {
    url: {
      type: String,
      default: 'api/milestone/next-group?next_key=1627227103034'
    }
  },
  data() {
    return {
      dataSource: [],
      list: [],
      page: 5,
      nextKey:0,
      isLastPage:false
    }
  },
  created() {
    this.getData()
  },
  mounted(){
    window.addEventListener('scroll', this.watchTimelineScroll,false)
  },
  destroyed(){
    window.removeEventListener('scroll',this.watchTimelineScroll,false)
  },
  methods: {
    format(time) {
      return new Date(time).toLocaleString('chinese', { hour12: false }).split(' ')[0]
    },
    async getData() {
      try {
        this.$loading()
        const res = await this.$request(`api/milestone/next-group?next_key=${this.nextKey}`)
        this.dataSource = [...res.list]
        this.nextKey =res.next_key
        if( this.nextKey ===null){
          this.isLastPage =true
        }
        this.page = res.list.length

        this.$nextTick(() => {
          this.renderList(0)
        })
      } catch (error) {
        this.$message({message:error,type: 'error'})
      } finally {
        this.$closeLoading()
      }
    },
    // 逐个添加轴节点
    renderList(idx) {
      if (idx < this.page && this.dataSource[idx]) {
        setTimeout(() => {
          this.list.push(this.dataSource[idx])
          this.renderList(idx + 1)
        }, 100)
      }
    },
    handleClick(url) {
      if (url) window.open(url)
    },

    // 监听滚动条
    watchTimelineScroll(){
      if(this.isLastPage){
        return
      }
      if (!this.timelineScroll) {
        this.timelineScroll = true
        setTimeout(async()=> {
          // 目前窗口底部离容器顶部的距离
          let  TopOffsetHeight = document.documentElement.scrollTop +document.body.clientHeight
          let scrollHeight  = document.body.scrollHeight
          // 离底部50px触发翻页
          if(TopOffsetHeight +50 >= scrollHeight){
            await this.getData()
          }
          this.timelineScroll = false
        }, 400)
      }
    }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    box-shadow: 0 0 0 #000000;
  }
  to {
    opacity: 1;
  }
}

.timeline {
  padding-left: 0;
  background: #2B343A;
}

.a-timeline {
  padding: 20px 0;
  min-height: 100vh;
  position: relative;
}

.a-timeline:before {
  content: '';
  position: absolute;
  top: 0;
  left: 25px;
  height: 100%;
  width: 4px;
  background: #7E57C2;
}

.a-timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.a-timeline-item:after {
  content: "";
  display: table;
  clear: both;
}

.a-timeline-item-symbol {
  position: absolute;
  top: 8px;
  left: 12px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px #7e57c2, inset 0 2px 0 rgb(0 0 0/8%), 0 3px 0 4px rgb(0 0 0/5%);
  background: #673AB7;
}

.a-timeline-item-container {
  margin-left: 60px;
  margin-right: 30px;
  padding: 20px;
  color: white;
  background: #333C42;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
  box-shadow: 0 5px 5px #000000;
  animation: fadeIn 1s;
}

.a-timeline-item-space {
  height: 300px;
}

.a-timeline-item-container:before {
  content: "";
  position: absolute;
  top: 16px;
  right: 100%;
  height: 0;
  width: 0;
  border: 7px solid transparent;
  border-right: 7px solid #333C42;
}

.a-timeline-item-title {
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
}

.a-timeline-item-content {
  margin: 1em 0;
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-line;
  color: rgba(255, 255, 255, 0.7);
  overflow: hidden;
}

.a-timeline-item-date {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
}

@media only screen and (min-width: 1170px) {
  .timeline {
    padding-left: 18.5vh;
    background: #2B343A;
  }

  .a-timeline:before {
    left: 50%;
    margin-left: -2px;
  }

  .a-timeline-item-symbol {
    left: 50%;
    margin-left: -15px;
    margin-top: 15px;
  }

  .a-timeline-item-container {
    margin: 0 5%;
    padding: 30px;
    width: 36%;
    box-shadow: 0 10px 5px #000000;
  }

  .a-timeline-item:nth-child(even) .a-timeline-item-container {
    float: right;
  }

  .a-timeline-item-container:before {
    top: 24px;
  }

  .a-timeline-item:nth-child(odd) .a-timeline-item-container:before {
    left: 100%;
    border-color: transparent;
    border-left-color: #333C42;
  }

  .a-timeline-item-date {
    position: absolute;
    width: 100%;
    left: 122%;
    top: 10px;
  }

  .a-timeline-item:nth-child(even) .a-timeline-item-date {
    left: auto;
    right: 122%;
    text-align: right;
  }
}

.last-page{
  color: #f1f2f3;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  width: 100%;
}
</style>
