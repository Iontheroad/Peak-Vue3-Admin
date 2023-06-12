<template>
  <div>
    <el-alert :closable="false" type="success">
      <template v-slot:title>
        <div style="height: 50px; line-height: 50px">
          基本的数据结构搭建完成,功能还未完全实现...
        </div>
      </template>
    </el-alert>
  </div>
  <!-- 讨论区  -->
  <div class="forum-container">
    <div class="comment-form focused">
      <div class="content">
        <!-- <div class="avatar-box">
          <img :src="url" alt="" class="" loading="lazy" />
        </div> -->
        <div class="form-box">
          <!-- 输入框 -->
          <div class="input-box focused">
            <!-- 输入区域 -->
            <div
              class="content-input"
              contenteditable="true"
              placeholder="输入评论（Enter换行，Ctrl + Enter发送）"
            ></div>

            <!-- 上传的图片区域 -->
            <div class="image-preview-box"></div>
          </div>
          <!-- 操作 -->
          <div class="action-box">
            <div class="emoji-btn">
              <svg-icon icon-name="func-forum-sanuk"></svg-icon>
              <span>表情</span>
            </div>
            <div class="image-btn">
              <svg-icon icon-name="func-forum-img"></svg-icon>
              <span>图片</span>
            </div>
            <div class="submit">
              <span>Ctrl + Enter</span>
              <button class="submit-btn">发表评论</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-divider></el-divider>

    <!-- 评论区列表  -->
    <div class="comment-list" v-if="commentList.length">
      <!-- 一级容器 -->
      <div class="comment" v-for="item in commentList" :key="item.id">
        <!-- 一级头像-->
        <div class="user-popover">
          <img :src="item.url" alt="" />
        </div>
        <!-- 一级主体内容容器 -->
        <div class="content-box">
          <!-- 一级评论内容 -->
          <div class="comment-main">
            <!-- 一级用户名和时间 -->
            <div class="user-box">
              <div class="user-popover">{{ item.userName }}</div>
              <div class="time">{{ item.createTime }}</div>
            </div>
            <!-- 一级评论内容 -->
            <!-- <div class="content">{{ item.info }}</div>
            <div class="limit-btn">展开</div>
            <div class="limit-btn">收起</div> -->
            <CommentContent :content="item.info" :labelId="'peak' + item.id" />
            <!-- 点赞 | 回复 -->
            <div class="action-box">
              <div class="item" :class="{ active: item.praiseType }">
                <svg-icon icon-name="func-forum-like" />
                {{ item.num ? item.num : "点赞" }}
              </div>
              <div class="item">
                <svg-icon icon-name="func-forum-comment" />
                {{ item.children.length ? item.children.length : "回复" }}
              </div>
              <!-- 删除按钮, 本人才显示 -->
              <div
                class="del"
                v-if="item.userId == id"
                @click="deleteComment(item.id)"
              >
                删除
              </div>
            </div>
          </div>
          <!-- 这沿途的风景或许不是那么精彩,但当我们回首往昔时,便是峥嵘岁月! -->
          <!-- 一级下的二级评论容器 -->
          <div class="sub-comment-wrapper" v-show="item.children.length != 0">
            <div class="sub-comment-list">
              <div
                class="sub-comment"
                v-for="child in item.children"
                :key="child.id"
              >
                <!-- 二级头像-->
                <div class="user-popover">
                  <img :src="child.url" alt="" />
                </div>
                <div class="content-box">
                  <div class="content-wrapper">
                    <!-- 二级用户名和时间 -->
                    <div class="user-box">
                      <div class="user-popover">{{ child.userName }}</div>
                      <div class="rely-box" v-if="child.replyName">
                        <span>回复</span>
                        <div class="user-popover">
                          {{ child.replyName }}
                        </div>
                      </div>
                      <div class="time">{{ child.createTime }}</div>
                    </div>
                    <CommentContent
                      :content="child.info"
                      :labelId="'peak' + child.id"
                      bgColor="#f7f8fa"
                    />
                    <!-- 点赞 , 回复 -->
                    <div class="action-box">
                      <div class="item" :class="{ active: child.praiseType }">
                        <svg-icon icon-name="func-forum-like" />
                        {{ child.num ? child.num : "点赞" }}
                      </div>
                      <div class="item">
                        <svg-icon icon-name="func-forum-comment" />回复
                      </div>
                      <!-- 删除按钮, 本人才显示 -->
                      <div
                        class="sub-del"
                        v-if="child.userId == id"
                        @click="deleteComment(item.id)"
                      >
                        删除
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="CurrentlyUnavailable">暂无讨论</div>
  </div>
</template>

<!--https://blog.csdn.net/zLanaDelRey/article/details/100997792-->
<script>
import CommentContent from "./CommentContent.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
export default {
  components: { CommentContent, SvgIcon },
  data() {
    return {
      commentList: [], // 评论列表
    };
  },
  computed: {
    url() {
      //用户头像
      return `http://119.91.22.164:8085/images/11411538250643115avatar.jpg`;
    },
    id() {
      // 当前登录的用户id
      return 1;
    },
  },
  created() {
    this.getComment(); //获取评论
  },
  methods: {
    //获取评论
    getComment() {
      this.commentList = [
        {
          "topId": 1, // 所属文章评论区的id
          "attachmentUrl": "[]", // 图片集合
          "num": 1, // 评论数量，只有一级有，二级都是0
          "userName": "多可悲", // 评论用户的姓名
          "userId": 8, // 评论用户的id
          "url": "http://119.91.22.164:8085/OASystem/gaoding-koutu.png", //  评论用户的头像
          "createTime": "2023-05-13 18:26:43", // 评论时间
          "praiseType": 0, // 当前登录的用户是否对该条评论点赞
          "id": 531, // 该条评论的id
          "info":
            "那个夜晚，月亮如同一颗钻石悬挂在天空中，星星闪烁着让人心醉的光芒，而我却独自一人站在海滩上，感受着海风的轻拂和海浪的拍打，仿佛整个世界都变得安静而美好。", // 评论的内容

          "children": [
            {
              "topId": 1, //  // 所属文章评论区的id
              "createTime": "2023-05-13 18:26:51",
              "replyUserId": 8, // 被@评论用户的用户id
              "replyName": "多可悲", // 被@评论用户的用户名
              "num": 0, // 评论数量，只有一级有，二级都是0
              "commentId": 531, // 对应的一级评论id
              "praiseType": 0, // 当前登录的用户是否对该条评论点赞
              "id": 533, // 该条评论的id
              "userName": "多可悲", // 评论用户的姓名
              "userId": 8, // 评论用户的id
              "url": "http://119.91.22.164:8085/OASystem/gaoding-koutu.png", //  评论用户的头像
              "info":
                "雨水滴落在屋檐上，发出清脆的声响，仿佛是上天派来的音乐，让人沉醉其中。我静静地坐在窗前，看着窗外的雨滴，想着那些曾经的美好时光，仿佛又回到了那个温馨的时刻。",
            },
            {
              "createTime": "2023-05-30 14:17:20",
              "topId": 1,
              "num": 4,
              "commentId": 531,
              "praiseType": 1,
              "id": 577,
              "userName": "多可悲",
              "userId": 8,
              "url": "http://119.91.22.164:8085/OASystem/gaoding-koutu.png",
              "info":
                "夜幕降临，一片黑暗笼罩着整个城市，只有路灯和星星点缀着这个宁静的夜晚。我独自一人漫步在街头，感受着这个城市的气息，仿佛每一个建筑物都有自己的故事，每一个人都有自己的梦想，这一刻，我感受到了人类的温暖和力量。",
            },
            {
              "replyUserId": 8,
              "createTime": "2023-05-31 11:40:13",
              "topId": 1,
              "replyName": "多可悲",
              "num": 0,
              "commentId": 531,
              "praiseType": 0,
              "id": 581,
              "userName": "Peak",
              "userId": 1,
              "url":
                "http://119.91.22.164:8085/images/11411538250643115avatar.jpg",
              "info": "落花有意随流水，流水无心恋落花。",
            },
            {
              "createTime": "2023-05-31 11:59:02",
              "topId": 1,
              "num": 0,
              "commentId": 531,
              "praiseType": 0,
              "id": 582,
              "userName": "Peak",
              "userId": 1,
              "url":
                "http://119.91.22.164:8085/images/11411538250643115avatar.jpg",
              "info": "爱情是一场盛大的旅行，需要勇气和冒险精神。",
            },
            {
              "replyUserId": 1,
              "createTime": "2023-05-31 11:59:24",
              "topId": 1,
              "replyName": "Peak",
              "num": 0,
              "commentId": 531,
              "praiseType": 0,
              "id": 583,
              "userName": "Peak",
              "userId": 1,
              "url":
                "http://119.91.22.164:8085/images/11411538250643115avatar.jpg",
              "info": "那些年，我们一起追过的梦，如今已经变成了回忆。",
            },
          ], // 该条评论下的二级评论集合
        },
        {
          "children": [],
          "attachmentUrl": "[]",
          "createTime": "2023-05-17 14:57:15",
          "topId": 1,
          "num": 1,
          "praiseType": 1,
          "id": 534,
          "userName": "多可悲",
          "userId": 8,
          "url": "http://119.91.22.164:8085/OASystem/gaoding-koutu.png",
          "info":
            "希望如同一盏明灯，照亮我们前行的路途，在黑暗中为我们指引方向。",
        },
        {
          "children": [],
          "attachmentUrl":
            '["http://172.16.10.187:8085/PlantImages/27993126194500.png","http://172.16.10.187:8085/PlantImages/27993164489300.png","http://172.16.10.187:8085/PlantImages/27993183153900.png"]',
          "createTime": "2023-05-31 16:35:33",
          "topId": 1,
          "num": 0,
          "praiseType": 0,
          "id": 595,
          "userName": "Peak",
          "userId": 1,
          "url": "http://119.91.22.164:8085/images/11411538250643115avatar.jpg",
          "info": "回首往昔，千丝万缕细Soft，温柔如水，恰似一曲悠扬的旋律。",
        },
        {
          "children": [],
          "attachmentUrl":
            '["http://172.16.10.187:8085/PlantImages/31762671304000.jpg"]',
          "createTime": "2023-05-31 17:38:23",
          "topId": 1,
          "num": 2,
          "praiseType": 1,
          "id": 604,
          "userName": "Peak",
          "userId": 1,
          "url": "http://119.91.22.164:8085/images/11411538250643115avatar.jpg",
          "info": "风轻轻地吹拂着花叶，发出轻柔的声响，谱写着一曲自然的音乐。",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
// 讨论区
.forum-container {
  flex: 1;
  background-color: #fff;
  padding: 30px;

  .form-box {
    .input-box {
      background: #f2f3f5;
      border: 1px solid transparent;
      padding: 8px 12px;
      border-radius: 5px;

      &.focused {
        border-color: #1e80ff;
      }

      // 输入框
      .content-input {
        position: relative;
        color: #252933;
        outline: none;
        min-height: 64px;
        box-sizing: border-box;
        line-height: 22px;
        font-size: 14px;
        resize: both;
        &:empty::before {
          // 将元素的placeholder属性的值作为内容插入
          content: attr(placeholder);
          color: #8a919f;
        }
      }
    }

    .action-box {
      display: flex;
      align-items: center;
      margin-top: 8px;
      .emoji-btn,
      .image-btn {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        color: #515767;
        .svg-icon {
          margin-right: 4px;
        }
        span {
          font-size: 12px;
        }
      }
      .image-btn {
        margin-left: 24px;
      }
      .submit {
        margin-left: auto;
        span {
          font-size: 14px;
          line-height: 22px;
          letter-spacing: 0.2px;
          color: #8a919f;
          margin-right: 16px;
        }
        button {
          margin-left: auto;
          width: 92px;
          text-align: center;
          font-size: 14px;
          line-height: 36px;
          background: #1e80ff;
          border: 0px;
          border-radius: 4px;
          color: #fff;
          padding: 0;
          cursor: pointer;
        }
      }
    }
  }

  // 评论区列表
  .comment-list {
    background-color: #fff;
    color: #000;
    font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell,
      Noto Sans, sans-serif, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
      Hiragino Sans GB, Microsoft YaHei, Arial !important;
    padding-bottom: 50px;
    font-size: 12px;
    .active {
      color: #1e80ff !important;
    }
    .comment {
      display: flex;
      padding: 16px 0px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.25);
      &:hover .del {
        display: block !important;
      }
      // 头像
      > .user-popover {
        flex-shrink: 0;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      // 主体内容
      .content-box {
        flex: 1;
        margin-left: 10px;
        // 一级评论内容
        .comment-main {
          // 一级用户名和时间
          .user-box {
            display: flex;
            height: 24px;
            line-height: 24px;
            // justify-content: space-between;
            .user-popover {
              font-weight: 500;
              font-size: 15px;
              max-width: 90px;
            }
            .time {
              margin-left: auto;
              font-size: 12px;
              color: #8a919f;
            }
          }
          // 一级评论内容
          // .content {
          //   display: -webkit-box;
          //   overflow: hidden;
          //   text-overflow: ellipsis;
          //   -webkit-box-orient: vertical;
          //   -webkit-line-clamp: 6;
          //   font-weight: 400;
          //   font-size: 14px;
          //   margin-top: 8px;
          //   // 展开后的
          //   &.extend {
          //     -webkit-line-clamp: initial;
          //   }
          // }
          // // 内容的展开收起
          // .limit-btn {
          //   margin-top: 8px;
          //   cursor: pointer;
          //   font-size: 14px;
          //   line-height: 22px;
          //   color: #1e80ff;
          // }
          .action-box {
            position: relative;
            display: flex;
            align-items: center;
            margin-top: 10px;
            .item {
              display: flex;
              align-items: center;
              margin-right: 16px;
              line-height: 22px;
              font-size: 14px;
              color: #8a919f;
              cursor: pointer;
              &:hover {
                color: #1e80ff;
              }
              .svg-icon {
                margin-right: 2px;
                font-size: 16px;
              }
            }
            .del {
              display: none;
              margin-left: auto;
              color: #ff5132;
              cursor: pointer;
            }
          }
        }

        // 一级下的二级评论
        .sub-comment-wrapper {
          background-color: #f7f8fa;
          border-radius: 8px;
          .sub-comment-list {
            margin-top: 16px;
            padding: 16px;
            .sub-comment {
              display: flex;
              width: calc(100% - 10px);
              border-bottom: 1px solid rgba(255, 255, 255, 0.25);
              margin-bottom: 24px;
              &:hover {
                .sub-del {
                  display: block !important;
                }
              }
              // 二级头像
              & > .user-popover {
                flex-shrink: 0;
                img {
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                }
              }
              .content-box {
                // display: flex;
                width: 100%;
                .content-wrapper {
                  // 二级用户名和时间
                  .user-box {
                    display: flex;
                    height: 30px;
                    line-height: 30px;
                    .user-popover {
                      height: 100%;
                      font-size: 15px;
                    }
                    .rely-box {
                      display: flex;
                      align-items: center;
                      > span {
                        padding: 0 12px;
                        font-size: 14px;
                        color: #8a919f;
                      }
                    }
                    .time {
                      margin-left: auto;
                      font-size: 12px;
                      color: #8a919f;
                      height: 100%;
                    }
                  }
                  .action-box {
                    position: relative;
                    display: flex;
                    align-items: center;
                    margin-top: 10px;
                    .item {
                      display: flex;
                      align-items: center;
                      margin-right: 16px;
                      line-height: 22px;
                      font-size: 14px;
                      color: #8a919f;
                      cursor: pointer;
                      &:hover {
                        color: #1e80ff;
                      }
                      .svg-icon {
                        margin-right: 2px;
                        font-size: 16px;
                      }
                    }
                    .sub-del {
                      display: none;
                      margin-left: auto;
                      color: #ff5132;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
            // > div {
            // }
          }
        }
      }
    }
  }

  .CurrentlyUnavailable {
    font-size: 30px;
    color: #dedede;
    text-align: center;
  }
}
</style>
