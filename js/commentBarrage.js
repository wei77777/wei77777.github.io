
const commentBarrageConfig = {
    //浅色模式和深色模式颜色，务必保持一致长度，前面是背景颜色，后面是字体，随机选择，默认这个颜色还好
    lightColors: [
        ['var(--lyx-white-acrylic2)', 'var(--lyx-black)'],
    ],
    darkColors: [
        ['var(--lyx-black-acrylic2)', 'var(--lyx-white)'],
    ],
    //同时最多显示弹幕数
    maxBarrage: 1,
    //弹幕显示间隔时间，单位ms
    barrageTime: 5000,
    //twikoo部署地址（Vercel、私有部署），腾讯云的为环境ID
    twikooUrl: "https://wei-twikoo.weiguoguo.top/",
    //token获取见前文
    accessToken: "e807f1fcf82d132f9bb018ca6738a19f",
    pageUrl: window.location.pathname,
    barrageTimer: [],
    barrageList: [],
    barrageIndex: 0,
    // 没有设置过头像时返回的默认头像，见cravatar文档 https://cravatar.cn/developers/api，可以不改以免出错
    noAvatarType: "retro",
    dom: document.querySelector('.comment-barrage'),
    //是否默认显示留言弹幕
    displayBarrage: true,
    //头像cdn，默认cravatar
    avatarCDN: "cravatar.cn",
}

function isInViewPortOfOne(el) {
    if (el) {
        const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        const offsetTop = el.offsetTop
        const scrollTop = document.documentElement.scrollTop
        const top = offsetTop - scrollTop
        return top <= viewPortHeight
    }
}
document.onscroll = function () {
    if (commentBarrageConfig.displayBarrage) {
        if (isInViewPortOfOne(document.getElementById("post-comment"))) {
            document.getElementsByClassName("comment-barrage")[0].setAttribute("style", `display:none;`)
        }
        else {
            if (document.getElementsByClassName("comment-barrage")[0]) {
                document.getElementsByClassName("comment-barrage")[0].setAttribute("style", "")
            }
        }
    }
}
function initCommentBarrage() {
    var data = JSON.stringify({
        "event": "COMMENT_GET",
        "commentBarrageConfig.accessToken": commentBarrageConfig.accessToken,
        "url": commentBarrageConfig.pageUrl
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            commentBarrageConfig.barrageList = commentLinkFilter(JSON.parse(this.responseText).data);
            if (commentBarrageConfig.dom) {
                commentBarrageConfig.dom.innerHTML = '';
            }
        }
    });
    xhr.open("POST", commentBarrageConfig.twikooUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    setInterval(() => {
        if (commentBarrageConfig.barrageList.length) {
            popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
            commentBarrageConfig.barrageIndex += 1;
            commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
        }
        if (commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage ? commentBarrageConfig.maxBarrage : commentBarrageConfig.barrageList.length)) {
            removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
        }
    }, commentBarrageConfig.barrageTime)

}
function commentLinkFilter(data) {
    data.sort((a, b) => {
        return a.created - b.created;
    })
    let newData = [];
    data.forEach(item => {
        newData.push(...getCommentReplies(item));
    });
    return newData;
}
function getCommentReplies(item) {
    if (item.replies) {
        let replies = [item];
        item.replies.forEach(item => {
            replies.push(...getCommentReplies(item));
        })
        return replies;
    } else {
        return [];
    }
}
function popCommentBarrage(data) {
    let barrage = document.createElement('div');
    let width = commentBarrageConfig.dom.clientWidth;
    let height = commentBarrageConfig.dom.clientHeight;
    barrage.className = 'comment-barrage-item'
    let ran = Math.floor(Math.random() * commentBarrageConfig.lightColors.length)
    document.getElementById("barragesColor").innerHTML = `[data-theme='light'] .comment-barrage-item { background-color:${commentBarrageConfig.lightColors[ran][0]};color:${commentBarrageConfig.lightColors[ran][1]}}[data-theme='dark'] .comment-barrage-item{ background-color:${commentBarrageConfig.darkColors[ran][0]};color:${commentBarrageConfig.darkColors[ran][1]}}`;

    barrage.innerHTML = `
        <div class="barrageHead">
            <img class="barrageAvatar" src="https://${commentBarrageConfig.avatarCDN}/avatar/${data.mailMd5}?d=${commentBarrageConfig.noAvatarType}"/>
            <div class="barrageNick">${data.nick}</div>
            <a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
        </div>
        <div class="barrageContent">${data.comment}</div>
    `
    commentBarrageConfig.barrageTimer.push(barrage);
    commentBarrageConfig.dom.append(barrage);
}
function removeCommentBarrage(barrage) {
    barrage.className = 'comment-barrage-item out';

    if (commentBarrageConfig.maxBarrage != 1) {
        setTimeout(() => {
            commentBarrageConfig.dom.removeChild(barrage);
        }, 1000)
    } else {
        commentBarrageConfig.dom.removeChild(barrage);
    }
}
switchCommentBarrage = function () {
    localStorage.setItem("isBarrageToggle", Number(!Number(localStorage.getItem("isBarrageToggle"))))
    if (!isInViewPortOfOne(document.getElementById("post-comment"))) {
        let className = document.getElementsByClassName("comment-barrage")[0]
        let title, message,flag;
        if (className?.outerHTML.indexOf('display: none') != -1) {
            title = '成功打开开关弹幕🎉'
            message = '您现在可以在右下角弹框里查看评论弹幕啦！'
            flag='success' 
        } else {
            title = '成功关闭开关弹幕🎉'
            message = '亲，关闭了可就看不到评论啦，是想清静清静嘛！'
            flag='warning'
        }
        new Vue({
            data: function () {
                this.$notify({
                    title: title,
                    message: message,
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type:flag,
                    duration: 5000
                });
            }
        })
        commentBarrageConfig.displayBarrage = !(commentBarrageConfig.displayBarrage);
        let commentBarrage = document.querySelector('.comment-barrage');
        if (commentBarrage) {
            $(commentBarrage).fadeToggle()
        }

    }
}
let timer
$(".comment-barrage").hover(() => {
    clearInterval(timer);
}, function () {
    timer = setInterval(() => {
        if (commentBarrageConfig.barrageList.length) {
            popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
            commentBarrageConfig.barrageIndex += 1;
            commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
        }
        if (commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage ? commentBarrageConfig.maxBarrage : commentBarrageConfig.barrageList.length)) {
            removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
        }
    }, commentBarrageConfig.barrageTime)
})
if (localStorage.getItem("isBarrageToggle") == undefined) {
    localStorage.setItem("isBarrageToggle", "0");
} else if (localStorage.getItem("isBarrageToggle") == "1") {
    localStorage.setItem("isBarrageToggle", "0");
    switchCommentBarrage()
}
// initCommentBarrage()