<template>
  <div class="about">
    <div class="about-content">
      <div class="about-left">
        <div class="about-left-left">
          <template-box title="Photo">
            <img src="../../../assets/imgs/Photo.jpeg"
                 alt="">
          </template-box>
          <template-box title="Wechat">
            <img class="logo"
                 src="../../../assets/imgs/wechat.png"
                 alt="">
            <p>Jie_Mar</p>
          </template-box>
        </div>
        <div class="about-left-right">
          <div class="about-left-right__top">
            <template-box title="AboutMe">
              <!-- 待补充 -->
            </template-box>
          </div>
          <div class="about-left-right__bottom">
            <template-box title="Email">
              <img class="logo"
                   src="../../../assets/imgs/email.png"
                   alt="">
              <p>Amour795@icloud.com</p>
            </template-box>
            <template-box title="GitHub">
              <img class="logo"
                   src="../../../assets/imgs/github.png"
                   alt="">
              <p>Amour795</p>
              <a href="https://github.com/Amour795">
                 <img class="link"
                   src="../../../assets/imgs/url.png"
                   alt="">
              </a>
            </template-box>
          </div>

        </div>
      </div>
      <div class="about-right">
        <template-box title='Where'>
          <div class="Where">
            <p>HUBEI</p>
            <p>WUAHN</p>
          </div>
        </template-box>
        <template-box title='Friends'>
          <div class="friends">
            <p>无</p>
          </div>
        </template-box>
      </div>
    </div>
  </div>
</template>

<script>
import templateBox from './components/templateBox'
export default {
  name: 'about',

  mixins: [],

  components: { templateBox },

  props: {},

  data() {
    return {

    };
  },

  computed: {},

  watch: {},

  created() { },

  methods: {}
};
</script>

<style lang="scss" scoped>
.about {
  background-color: #a7bfcb;
  width: 100%;
  height: 100%;
  padding: 0 100px;
  &-content {
    // width: 1200px;
    padding-top: 42px;
    // height: 100%;
    display: flex;
    margin: 0 auto;
    .about-left {
      flex: 4 0;
      margin-right: 20px;
      display: flex;
      .about-left-left {
        flex: 1 0;
        margin-right: 20px;
        .template-box:nth-child(1) {
          height: 520px;
          margin-bottom: 20px;
          ::v-deep main {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #e8ffff;
            img {
              width: 160px;
              height: 160px;
              border-radius: 50%;
              border: 1px solid #333;
            }
          }
        }
        .template-box:nth-child(2) {
          height: 260px;
          ::v-deep main {
            text-align: center;
            .logo {
              width: 80px;
              margin-top: 42px;
            }
            p {
              color: #333;
              font-family: NewFont;
              margin-top: 16px;
              font-size: 16px;
            }
          }
        }
      }
      .about-left-right {
        flex: 2 1;
        &__top {
          .template-box {
            height: 520px;
            margin-bottom: 20px;
          }
        }
        &__bottom {
          display: flex;
          .template-box {
            height: 260px;
            flex: 1 0;
            ::v-deep main {
              text-align: center;
              .logo {
                width: 80px;
                margin-top: 42px;
              }
              p {
                color: #333;
                font-family: NewFont;
                margin-top: 16px;
                font-size: 16px;
              }
            }
          }
          ::v-deep .template-box:nth-child(1) {
            margin-right: 20px;
            main {
              background: #99f3bd;
            }
          }
          ::v-deep .template-box:nth-child(2) {
            main {
              background: #d2f6c5;
            }
          }
        }
      }
    }
    .about-right {
      flex: 1 0;
      .template-box:nth-child(1) {
        height: 400px;
        margin-bottom: 20px;
        ::v-deep main {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #a5ecd7;
        }
      }
      .template-box:nth-child(2) {
        height: 380px;
        // ::v-deep main {
        // }
      }
      .friends {
        padding: 24px;
        overflow-y: auto;
        width: 100%;
        height: 100%;
        background: #eeeeee;
        p {
          font-size: 16px;
          font-family: NewFont;
        }
      }
      .Where {
        p {
          font-family: NewFont;
          font-size: 24px;
          padding: 8px 32px;
          background: #eeeeee;
          color: #333;
          margin: 12px 0;
          border-radius: 10px;
        }
      }
    }
  }
  .link {
    width: 32px;
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
}
</style>