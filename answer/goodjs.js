const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "orange"

var t = 0; // 蓄力时间
var startTime = null; // 蓄力开始时间戳
var intervalID = null; // 计时器ID

document.onmousedown = function (ev) {
     console.log(ev);
     if (ev.buttons == 1) // 假定长按左键蓄力
        if (intervalID == null)
//  设置100ms后t自增，设置过小的数字会对网页质量造成影响
              intervalID = setInterval(function () { ++t; }, 100);
        startTime = ev.timeStamp;
 }

 document.onmouseup = function (ev) {
      console.log(ev);
     if (ev.buttons == 0) {
        clearInterval(intervalID); // 停止计时
          intervalID = null; // 清空ID
         t = ev.timeStamp - startTime;
        console.log(t); // 调试输出
         t = 0; // 蓄力后清零
     }
 }

document.onkeydown = function (ev) {
    if (ev.key == "Enter") {
        if (intervalID == null) {
            intervalID = setInterval(function () { ++t; }, 100);
        }
    }
}

document.onkeyup = function (ev) {
    if (ev.key == "Enter") {
        clearInterval(intervalID);
        intervalID = null;
        console.log(t);
        t = 0;
    }
}

var randomInt = (l, r) => Math.random() * (r - l) + l;

var player = Object();

function init() {
    player.x = 130;
    player.y = 800;

    //画平台
    ctx.strokeRect(230 - player.x, 900, 100, 100)
    ctx.strokeRect(430 - player.x, 800, 300, 200)
    ctx.strokeRect(830 - player.x, 700, 200, 300)
    ctx.strokeRect(1130 - player.x, 400, 50, 600)
    ctx.strokeRect(1230 - player.x, 900, 100, 100)
    ctx.strokeRect(1530 - player.x, 900, 200, 100)

    //分数条#抄力度条的

    ctx.beginPath()
    ctx.arc(10, 20, 5, 0.5 * Math.PI, 1.5 * Math.PI)
    ctx.stroke()
    ctx.arc(100, 20, 5, 1.5 * Math.PI, 0.5 * Math.PI)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(10, 15)
    ctx.lineTo(100, 15)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(10, 25)
    ctx.lineTo(100, 25)
    ctx.stroke()
    ctx.closePath()
    //文字提示
    ctx.font = "20px Georgia";
    ctx.fillText("score", 20, 50);
}

player.draw = function () {
    //头！头!
    ctx.arc(player.x, player.y, 20, 50, 100)
    ctx.fill()

    //画个三角形
    ctx.beginPath()
    ctx.moveTo(player.x - 30, player.y + 100)
    ctx.lineTo(player.x, player.y)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(player.x, player.y)
    ctx.lineTo(player.x + 30, player.y + 100)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(player.x - 30, player.y + 100)
    ctx.lineTo(player.x + 30, player.y + 100)
    ctx.stroke()
    ctx.closePath()

    //力度条
    ctx.beginPath()
    ctx.arc(player.x - 20, player.y - 45, 5, 0.5 * Math.PI, 1.5 * Math.PI)
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.arc(player.x + 20, player.y - 45, 5, 1.5 * Math.PI, 0.5 * Math.PI)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(player.x - 20, player.y - 50)
    ctx.lineTo(player.x + 20, player.y - 50)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(player.x - 20, player.y - 40)
    ctx.lineTo(player.x + 20, player.y - 40)
    ctx.stroke()
    ctx.closePath()

    //window.requestAnimationFrame(player.draw);
}

player.jump = function () {
     player.x = 130 + 5 * t
     player.y = 800 - t ^ 2 + 2 * t + 1
}

// 主游戏进程
init();

window.requestAnimationFrame(player.draw);