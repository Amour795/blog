<template>
  <div class="movie">
    <ul class="movie-list grid">
      <li class="movie-list-item grid-item"
          v-for="item in movieList"
          :key="item._id">
        <img :src="item.imgSrc"
             alt="">
        <p>{{item.name}}</p>
      </li>
    </ul>
    <div class="movie-page">
      <Page :total="100" @on-change="getList"/>
    </div>
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
      movieList: []
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
      getMovieList({ page: page, size: 20 }).then(res => {
        this.movieList = res
        console.log(132);
      })
    },
    getDetails() {
      getMovieDetails({ id: 1579 }).then(res => {
        console.log(res);
      })
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
  &-list {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    &-item {
      width: 300px;
      // margin-bottom: 24px;
      border-radius: 6px;
      overflow: hidden;
      text-align: center;
      img {
        width: 284px;
        border-radius: 6px;
      }
      p {
        padding: 12px 0 24px 0;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  &-page{
    text-align: center;
    padding:62px 0;
  }
}
</style>