const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');



var t = 0; // 蓄力时间
// var startTime = null; // 蓄力开始时间戳
var intervalID = null; // 计时器ID
var score = 0;



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
        player.jump();
        t = 0;
    }
}

var randomInt = (l, r) => Math.random() * (r - l) + l;

function draw_score(score) {
    let te = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(75, 0, 200, 50);
    ctx.fillStyle = te;
    ctx.fillText(score.toString(), 80, 20);
}

var player = Object();

function clearCanvas() {
    let te = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 2000, 1000);
    ctx.fillStyle = te;
}

function initDraw() {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "orange";

    //画平台
    ctx.strokeRect(90, 900, 100, 100)
    
    //文字提示
    ctx.font = "20px Georgia";
    ctx.fillText("Score", 20, 20);
    draw_score(score);
    level.draw();
}

function init() {
    player.x = 140;
    player.y = 800;

    level.createRandom();

    initDraw();
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

    // window.requestAnimationFrame(player.draw);
}
player.collide = function () {
    if (player.x - 30 >= level.left && player.x + 30 <= level.right && player.y + 100 >= level.up) return 1;
    if (player.x + 30 >= level.left && player.y + 100 >= level.up) return -1;
    if (player.x - 30 <= level.right && player.x + 30 > level.right && player.y + 100 >= level.up) return -1;
    if (player.x + 30 > level.right && player.y + 100 >= level.up) return -1;
    return 0
}

player.jump = function () {
    

    player.velX = t;
    player.velY = -t;

    var iid = setInterval(function () {
        player.x += player.velX;
        player.y += player.velY;
        player.velY += 0.5;
        clearCanvas();
        initDraw();
        let ret = player.collide();
        if (ret == 1 || ret == -1) {
            clearInterval(iid);
            console.log(ret);
        }
        window.requestAnimationFrame(player.draw);
    }, 40); // FPS = 25
}

var level = Object();

level.draw = function () {
    ctx.strokeRect(level.left, level.up, level.right - level.left, 1000 - level.up);
}

level.drawFill = function () {
    ctx.fillRect(level.left, level.up, level.right - level.left, 1000 - level.up);
}

level.createRandom = function () {
    let te = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(200, 500, 1000, 1000);
    ctx.fillStyle = te;
    level.left = randomInt(300, 500);
    level.right = level.left + randomInt(150, 250);
    level.up = randomInt(800, 950);
}

// 主游戏进程
init();

window.requestAnimationFrame(player.draw);
player.collide = function () {
    if (player.x - 30 >= level.left && player.x + 30 <= level.right && player.y + 100 >= level.up) return 1;
    if (player.x + 30 >= level.left && player.y + 100 >= level.up) return -1;
    if (player.x - 30 <= level.right && player.x + 30 > level.right && player.y + 100 >= level.up) return -1;
    if (player.x + 30 > level.right && player.y + 100 >= level.up) return -1;
    return 0
}

player.jump = function () {
    // player.x = 130 + 5 * t
    // player.y = 800 - t ^ 2 + 2 * t + 1

    player.velX = t;
    player.velY = -t;

    var iid = setInterval(function () {
        player.x += player.velX;
        player.y += player.velY;
        player.velY += 0.5;
        clearCanvas();
        initDraw();
        let ret = player.collide();
        if (ret == 1 || ret == -1) {
            clearInterval(iid);
            console.log(ret);
            setTimeout(function () {
                if (ret == 1) {
                    ++score;
                    init();
                } else {
                    score = 0;
                    init();
                }
            }, 2000);
        }
        window.requestAnimationFrame(player.draw);
    }, 40); // FPS = 25
}

var level = Object();

level.draw = function () {
    ctx.strokeRect(level.left, level.up, level.right - level.left, 1000 - level.up);
}

level.drawFill = function () {
    ctx.fillRect(level.left, level.up, level.right - level.left, 1000 - level.up);
}

level.createRandom = function () {
    let te = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(200, 500, 1000, 1000);
    ctx.fillStyle = te;
    level.left = randomInt(300, 500);
    level.right = level.left + randomInt(150, 250);
    level.up = randomInt(800, 950);
}

// 主游戏进程
init();

window.requestAnimationFrame(player.draw);