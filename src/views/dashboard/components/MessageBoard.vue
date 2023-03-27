<template>
  <el-card class="message_board">
    <template #header>
      <div class="card-header">
        <span>留言板</span>
        <el-button class="button" type="primary" link>更多</el-button>
      </div>
    </template>
    <el-space :fill="true" :size="10" direction="vertical">
      <div>
        <div>
          Icons made by
          <a href="https://www.freepik.com" title="Freepik">Freepik</a>
          from
          <a href="https://www.flaticon.com/" title="Flaticon"
            >www.flaticon.com</a
          >
        </div>
        <div>
          Icons made by
          <a
            href="https://www.flaticon.com/authors/vectors-market"
            title="Vectors Market"
            >Vectors Market</a
          >
          from
          <a href="https://www.flaticon.com/" title="Flaticon"
            >www.flaticon.com</a
          >
        </div>
      </div>
      <div class="item" v-for="item in messageList" :key="item.icon">
        <el-avatar class="icon" :size="40" :src="item.icon"></el-avatar>
        <span class="msg">
          <el-tooltip effect="dark" placement="top-start">
            <template v-slot:content>{{ item.msg }}</template
            >{{ item.msg }}
          </el-tooltip>
        </span>
      </div>
    </el-space>
  </el-card>
</template>

<script setup lang="ts" name="MessageBoard">
import icon1 from "@/assets/images/001-cool.png";
import icon2 from "@/assets/images/002-cool-1.png";
import icon3 from "@/assets/images/003-cool-2.png";
import icon4 from "@/assets/images/004-dizzy.png";
import icon5 from "@/assets/images/005-devil.png";
import icon6 from "@/assets/images/006-kiss.png";
import icon7 from "@/assets/images/007-in-love.png";
import icon8 from "@/assets/images/008-tongue.png";
import icon9 from "@/assets/images/009-kiss-1.png";
import icon10 from "@/assets/images/010-happy.png";

let messageList = [
  {
    icon: icon1,
    msg: "山有木兮木有枝，心悦君兮君不知。——《越人歌》",
  },
  {
    icon: icon2,
    msg: "春风又绿江南岸，明月何时照我还。——《赋得古原草送别》",
  },
  {
    icon: icon3,
    msg: "人生如梦，一尊还酹江月。——《赋得古原草送别》",
  },
  {
    icon: icon4,
    msg: "红豆生南国，春来发几枝。——《相思》",
  },
  {
    icon: icon5,
    msg: "海上生明月，天涯共此时。——《静夜思》",
  },
  {
    icon: icon6,
    msg: "行到水穷处，坐看云起时。——《登高》",
  },
  {
    icon: icon7,
    msg: "天长地久有时尽，此恨绵绵无绝期。——《长恨歌》",
  },
  {
    icon: icon8,
    msg: "多情自古伤离别，更那堪，冷落清秋节。——《长恨歌》",
  },
  {
    icon: icon9,
    msg: "花径不曾缘客扫，蓬门今始为君开。——《题西林壁》",
  },
  {
    icon: icon10,
    msg: "人生若只如初见，何事秋风悲画扇。——《乘客》",
  },
];
</script>

<style scoped lang="scss">
.message_board {
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 5px;
    .icon {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      margin-right: 10px;
    }
    .msg {
      cursor: pointer;
      flex: 1;
      width: 100%;
      font-size: 14px;
      // 设置溢出隐藏
      overflow: hidden;
      // 文本溢出显示省略号
      text-overflow: ellipsis;
      // 将盒子设置为弹性伸缩盒子
      display: -webkit-box;
      // 设置显示的行数
      -webkit-line-clamp: 1;
      // 在其中的排列方式为垂直的
      -webkit-box-orient: vertical;
    }

    &:hover {
      box-sizing: border-box;
      background-color: var(--el-fill-color-blank);
      // border: 1px solid var(--el-border-color-light);
      // border-radius: 4px;
      border-radius: 2px;
      box-shadow: 0 0 6px rgb(0 0 0 / 20%);
    }
  }
}
</style>
