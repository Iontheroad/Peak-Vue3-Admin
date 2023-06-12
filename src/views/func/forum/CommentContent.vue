<template>
  <div
    class="comment-content"
    :style="{ '--bg-color': bgColor, '--color': color }"
  >
    <!-- 通过复选框区分展开收起 -->
    <input :id="labelId" class="exp" type="checkbox" />
    <div class="text">
      <label class="btn" :for="labelId"></label>
      {{ content }}
    </div>
    <!-- 图片 -->
    <!-- <div></div> -->
    <!--
      在前端开发中，如果遇到单词或者长单词在一行无法完全显示，导致布局错乱，可以使用以下方法来解决字母换行问题：

      1. 使用CSS属性 `word-break: break-all`。这个属性可以强制单词内部的字母换行，从而避免了单词整体溢出。
      2. 使用CSS属性 `overflow-wrap: break-word`。这个属性可以让浏览器在单词内部的任何位置进行换行，从而避免了单词整体溢出。
      3. 使用CSS属性 `hyphens: auto`。这个属性可以在单词内部的适当位置插入连字符，从而避免了单词整体溢出。
      4. 在单词内部手动添加断点，使用`&shy;`实现单词内部的换行。这个方法需要手动添加断点，比较繁琐，但是可以精确控制换行的位置。

      需要注意的是，以上方法可能会影响单词的阅读体验，因此需要根据实际情况来选择合适的方法来解决字母换行问题。
     -->
  </div>
</template>

<script>
/* 纯css实现展开收起
      适用于纯色背景
*/
export default {
  name: "CommentContent",
  props: {
    // 必须传,不可以重复
    labelId: {
      type: String,
      required: true,
    },

    // 评论内容
    content: {
      type: String,
      // required: true,
      default:
        "我是评论的内容我是评论的内容我是评论的内容我是评论的内容我是评论的内容woshipinglundeneirongwoshipinglundeneirong我是评论的内容我是评论的内容我是评论的内容我是评论的内容我是评论的内容woshipinglundeneirong我是评论的内容我是评论的内容我是评论的内容我是评论的内容我是评论的内容我是评论的内容我是评论的内容我是评论的内容woshipinglundeneirong我是评论的内容",
    },
    bgColor: {
      type: String,
      default: "#ffffff",
    },
    color: {
      type: String,
      default: "#000000",
    },
  },
  data() {
    return {};
  },

  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.comment-content {
  display: flex;
  width: 100%;
  overflow: hidden;
  /*   resize: horizontal; */
  border-radius: 8px;
  margin-top: 8px;
  // padding: 15px;
  color: var(--color);
  // box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  // background-color: var(--bg-color);
  .text {
    position: relative;

    /* 这个属性可以让浏览器在单词内部的任何位置进行换行，从而避免了单词整体溢出。 */
    // overflow-wrap: break-word;

    /* 这个属性可以强制单词内部的字母换行，从而避免了单词整体溢出。 */
    word-break: break-all;

    /* 当使用text-align: justify;时，文本将被调整为两端对齐，这意味着每行的左右两端对齐，并且文本会自动拉伸或压缩以填充整个容器宽度。这样可以使文本看起来更整齐、更规整，但是可能会导致单词间的间距不一致，造成视觉上的不协调感。 */
    text-align: justify;

    /* 每行的行高 是字体的1.5倍 */
    line-height: 2em;

    /* 最大高度， */
    max-height: 6em; // 通过高度展开
    overflow: hidden;

    transition: 0.4s max-height;
    // background-color: #55fe07;
    // font-size: 20px;
    // font-weight: 400;
    // -webkit-line-clamp: 6;
    /* 把展开收起按钮挤下去 */
    &::before {
      content: "";
      height: calc(100% - 1.8em);
      float: right;
    }
    /* 遮盖： 在文本的最后一行，
    超出指定行数就跟随超出的文本溢出隐藏了
    未超出指定函数就刚在最后一行遮罩住按钮了
    */
    &::after {
      content: "";
      position: absolute;
      width: 999vw;
      height: 999vw;
      /* 用阴影遮罩,并空出100px */
      box-shadow: inset calc(100px - 999vw) calc(30px - 999vw) 0 0
        var(--bg-color); // 空出遮罩的左上角的区域,防止盖着文字
      margin-left: -100px; // 左移动遮罩, 完全遮住按钮
    }

    /* 按钮 */
    .btn {
      position: relative;
      float: right;
      /* 清除浮动 */
      clear: both;

      /* 空出右侧省略号的位置 */
      margin-left: 18px;
      // font-size: 16px;
      line-height: 1.5;
      padding: 0 5px;
      // background: #3f51b5;
      color: #1e80ff;
      cursor: pointer;
      font-weight: 400;
      // 默认按钮有省略号
      &::before {
        content: "...";
        position: absolute;
        left: -5px;
        transform: translateX(-100%) translateY(-16%);
        color: var(--color);
      }
      // 默认展开字段
      &::after {
        content: "展开";
      }
    }
  }

  /* 复选框 */
  .exp {
    // 隐藏复选框
    display: none;

    // 当选中复选框,展开内容
    &:checked + .text {
      /* max-height: none; 是一个 CSS 属性，它用于设置元素的最大高度。当设置为 none 时，表示元素没有最大高度限制，可以根据内容自动调整高度。 */
      max-height: none;
      // background-color: yellow;
    }
    // 选中 ，隐藏遮罩
    &:checked + .text::after {
      visibility: hidden;
    }
    // 选中隐藏按钮省略号
    &:checked + .text .btn::before {
      visibility: hidden;
    }
    // 选中修改按钮为 收起
    &:checked + .text .btn::after {
      content: "收起";
    }
  }
}
</style>
