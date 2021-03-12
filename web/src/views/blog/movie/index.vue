<template>
  <div class="movie">
    <ul class="movie-list grid">
      <li class="movie-list-item grid-item"
          v-for="item in movieList"
          @click="getDetails(item)"
          :key="item._id">
        <img :src="item.imgSrc"
             alt="">
        <p>{{item.name}} <span>{{item.grade}}</span> </p>

        <div class="movie-list-item__mask">
          <p>剧名&nbsp;&nbsp;:&nbsp;&nbsp;{{item.name}}</p>
          <p>豆瓣评分&nbsp;&nbsp;:&nbsp;&nbsp;{{item.grade}}</p>
          <p>别名&nbsp;&nbsp;:&nbsp;&nbsp;{{item.AlsoknownAs.join('、')}}</p>
          <p>时长&nbsp;&nbsp;:&nbsp;&nbsp;{{item.duration.join('、')}}</p>
          <p>国家&nbsp;&nbsp;:&nbsp;&nbsp;{{item.showArea.join('、')}}</p>
          <p>类型&nbsp;&nbsp;:&nbsp;&nbsp;{{item.typs.join('、')}}</p>
          <p>上映年份&nbsp;&nbsp;:&nbsp;&nbsp;{{item.year}}</p>
        </div>
      </li>
    </ul>
    <div class="movie-page">
      <Page :total="total"
            :page-size="size"
            @on-change="getList" />
    </div>
    <Modal v-model="movieDetailsModal"
           footer-hide
           width="920">
      <div v-if="movieDetails">
        <div class="movie-details-modal">
          <div>
            <img :src="movieDetails.imgSrc"
                 alt="">
          </div>
          <div>
            <p>剧名&nbsp;&nbsp;:&nbsp;&nbsp;{{movieDetails.title}}<span>{{movieDetails.doubanScore}}</span></p>
            <p>别名&nbsp;&nbsp;:&nbsp;&nbsp;{{movieDetails.AlsoknownAs.join('、')}}</p>
            <p>主演&nbsp;&nbsp;:&nbsp;&nbsp;{{movieDetails.toStar.join('、')}}</p>
            <p>时长&nbsp;&nbsp;:&nbsp;&nbsp;{{movieDetails.duration.join('、')}}</p>
            <p>国家&nbsp;&nbsp;:&nbsp;&nbsp;{{movieDetails.showArea.join('、')}}</p>
            <p>类型&nbsp;&nbsp;:&nbsp;&nbsp;{{movieDetails.typs.join('、')}}</p>
            <p>上映年份&nbsp;&nbsp;:&nbsp;&nbsp;{{movieDetails.year.join('、')}}</p>
            <p>更新时间&nbsp;&nbsp;:&nbsp;&nbsp;{{movieDetails.updateTime | dateFormat}}</p>
          </div>
          <div>
            <p v-for="(item,index) in movieDetails.info"
               :key="`movieDetails-${index}`">
              {{item}}
            </p>
          </div>
        </div>
        <ul class="movie-details-magnetic">
          <li v-for="(item,index) in movieDetails.magnetic"
              :key="`magnetic-${index}`"
              v-clipboard:copy="item.href"
              v-clipboard:success="onCopy">
            <p>{{item.name}}</p>
            <p>{{item.href}}</p>
          </li>
        </ul>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getMovieList, getMovieDetails } from '@api/movie.js'
import Masonry from "masonry-layout"; // Vue项目的引入方式
import imagesloaded from 'imagesloaded';
export default {
  name: 'movie',

  data() {
    return {
      movieDetailsModal: false,
      movieList: [],
      movieDetails: null,
      total: 0,
      size: 20,
    };
  },
  created() {
    this.getList()
  },

  updated() {
    let grid = document.querySelector('.grid');
    let msnry = new Masonry(grid, {
      itemSelector: '.grid-item',
      columnWidth: 300,
    });
    imagesloaded('.grid-item', () => {
      msnry.layout(); // 图片加载完成后重新绘制。
    });
  },

  methods: {
    getList(page) {
      getMovieList({ page: page, size: this.size }).then(res => {
        this.movieList = res.list
        this.total = res.total
      })
    },
    getDetails({ id, imgSrc }) {

      getMovieDetails({ id: id }).then(res => {
        this.movieDetails = {
          ...res,
          info: res.info.split('　　').filter(item => item),
          imgSrc: imgSrc
        }
        this.movieDetailsModal = true
      })
    },
    onCopy() {
      this.$Message.success('复制链接成功')
    }
  },
};
</script>

<style lang="scss" scoped>
.movie {
  height: 100%;
  padding: 32px;
  background-color: #a7bfcb;
  overflow-y: auto;
  color: #333;
  &-list {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    &-item {
      width: 300px;
      padding-top: 12px;
      border-radius: 6px;
      margin-bottom: 24px;
      overflow: hidden;
      text-align: center;
      cursor: pointer;

      img {
        width: 284px;
        border-radius: 6px;
      }
      p {
        padding: 12px 0 24px 0;
        font-size: 16px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          height: 22px;
          line-height: 22px;
          border-radius: 4px;
          background: #f0ecbc;
          padding: 0 8px;
          color: #333;
          font-size: 12px;
          display: inline-block;
          margin-left: 12px;
        }
      }
      &__mask {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        transition: top 0.3s;
        top: 100%;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        color: #fff;
        font-size: 12px;
        padding: 60px 12px 0 12px;
        p {
          padding: 6px;
        }
        p:first-child {
          font-size: 24px;
          font-weight: bold;
          padding-bottom: 14px;
        }
      }
    }
    &-item:hover {
      .movie-list-item__mask {
        top: 0;
      }
    }
  }
  &-page {
    text-align: center;
    padding: 62px 0;
  }
}
::v-deep .ivu-modal {
  height: 80%;
  overflow-y: auto;
  color: #333;
}
::v-deep .ivu-modal-body {
  .movie-details-modal {
    display: flex;
    justify-content: space-between;
    text-align-last: left;
    div {
      padding: 12px;
    }
    div:nth-child(1) {
      width: 300px;
      flex: none;

      img {
        width: 100%;
      }
    }
    div:nth-child(2) {
      width: 300px;
      flex: none;
      font-size: 14px;
      font-weight: bold;
      p {
        margin-bottom: 14px;
        span {
          height: 22px;
          line-height: 22px;
          border-radius: 4px;
          background: #f0ecbc;
          padding: 0 8px;
          color: #333;
          font-size: 12px;
          display: inline-block;
          margin-left: 12px;
        }
      }
    }
    div:nth-child(3) {
      width: 100%;
      p {
        text-indent: 2em;
      }
    }
  }
  .movie-details-magnetic {
    width: 600px;
    margin: 0 auto;
    li {
      margin: 24px 0;
      text-align: center;
      background: #ededed;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      p {
        padding: 6px;
      }
    }
  }
}
</style>