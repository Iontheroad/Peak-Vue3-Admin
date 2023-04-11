/**
 * 根据当天不同时间端返回不同的招呼语
 */
export function getGreeting(): string {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let week = now.getDay();
  let greeting = ""; // 招呼语
  // 工作日
  if ([1, 2, 3, 4, 5].includes(week)) {
    switch (hours) {
      case 0:
        // 凌晨24点：
        greeting = "凌晨好！还没睡吗？";
        break;
      case 1:
        // 凌晨1点：
        greeting = "凌晨好！夜深了，注意休息哦！";
        break;
      case 2:
        // 凌晨2点：
        greeting = "凌晨好！还在工作吗？";
        break;
      case 3:
        // 凌晨3点：
        greeting = "凌晨好！时间过得好快啊！";
        break;
      case 4:
        // 凌晨4点：
        greeting = "凌晨好！一天的工作已经完成了吗？";
        break;
      case 5:
        // 凌晨5点：
        greeting = "凌晨好！新的一天即将开始！";
        break;
      case 6:
        // 早上6点：
        greeting = "早安！新的一天开始啦！";
        break;
      case 7:
        // 早上7点：
        greeting = "早上好！今天有什么计划呢？";
        break;
      case 8:
        // 早上8点：
        greeting = "上午好！一天的工作开始啦！";
        break;
      case 9:
        // 上午9点：
        greeting = "上午好！今天要加油哦！";
        break;
      case 10:
        // 上午10点：
        greeting = "上午好！工作顺利吗？";
        break;
      case 11:
        // 上午11点：
        greeting = "上午好！休息一下吧！";
        break;
      case 12:
        // 中午12点：
        greeting = "中午好！吃午饭了吗？";
        break;
      case 13:
        // 下午13点：
        greeting = "下午好！午休愉快！";
        break;
      case 14:
        // 下午14点：
        greeting = "下午好！继续加油哦！";
        break;
      case 15:
        // 下午15点：
        greeting = "下午好！放松一下吧！";
        break;
      case 16:
        // 下午16点：
        greeting = "下午好！再坚持一下！";
        break;
      case 17:
        // 下午17点：
        greeting = "下班时间快到啦！辛苦了一整天！";
        break;
      case 18:
        // 傍晚18点：
        greeting = "晚上好！下班了放松一下吧！";
        break;
      case 19:
        // 傍晚19点：
        greeting = "晚上好！晚餐吃了吗？";
        break;
      case 20:
        // 傍晚20点：
        greeting = "晚上好！休息一下吧！";
        break;
      case 21:
        // 晚上21点：
        greeting = "晚上好！今天过得怎么样？";
        break;
      case 22:
        // 晚上22点：
        greeting = "晚上好！早点休息哦！";
        break;
      case 23:
        // 晚上23点：
        greeting = "晚安！好梦哦！";
        break;
      default:
        greeting = "当前时间不在24小时制范围内！";
        break;
    }
  }
  // 周末
  else if ([6, 0].includes(week)) {
    switch (hours) {
      case 0:
        // 凌晨24点：
        greeting = "半夜12点，愿你周末的美好延续到明天！";
        break;
      case 1:
        greeting = "凌晨1点，祝你周末美梦连连！";
        break;
      case 2:
        greeting = "2点整，愿你周末充满惊喜！";
        break;
      case 3:
        greeting = "3点了，周末好心情，继续享受美好时光！";
        break;
      case 4:
        greeting = "4点整，祝你周末充满能量！";
        break;
      case 5:
        greeting = "清晨5点，愿你周末的美好一直延续下去！";
        break;
      case 6:
        greeting = "早上6点，祝你周末愉快！";
        break;
      case 7:
        greeting = "7点了，起床啦，周末好心情！";
        break;
      case 8:
        greeting = "8点整，美好的周末早晨！";
        break;
      case 9:
        greeting = "上午9点，祝你周末充满活力！";
        break;
      case 10:
        greeting = "10点了，周末好心情，开始一天的计划吧！";
        break;
      case 11:
        greeting = "11点整，愿你周末快乐无比！";
        break;
      case 12:
        greeting = "中午12点，祝你周末午餐愉快！";
        break;
      case 13:
        greeting = "下午1点，愿你周末愉快无比！";
        break;
      case 14:
        greeting = "2点整，祝你周末充满能量！";
        break;
      case 15:
        greeting = "3点了，周末好心情，继续加油！";
        break;
      case 16:
        greeting = "4点整，愿你周末充满惊喜！";
        break;
      case 17:
        greeting = "下午5点，祝你周末放松愉快！";
        break;
      case 18:
        greeting = "6点了，周末好心情，享受美好时光！";
        break;
      case 19:
        greeting = "7点整，愿你周末充满欢声笑语！";
        break;
      case 20:
        greeting = "8点了，祝你周末晚餐愉快！";
        break;
      case 21:
        greeting = "9点整，周末好心情，继续享受美好时光！";
        break;
      case 22:
        greeting = "10点了，愿你周末充满幸福感！";
        break;
      case 23:
        greeting = "11点整，祝你周末快乐无比！";
        break;
      default:
        greeting = "当前时间不在24小时制范围内！";
        break;
    }
  }

  return greeting;
}
