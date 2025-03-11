var anzhiyu = {
    // 音乐节目切换背景
    changeMusicBg: function (isChangeBg = true) {
      const aplayerIconMenu = document.querySelector(".aplayerFixed");
      const fps = document.getElementById("fps");
      if (window.location.pathname != "/life/music/") {
        if (aplayerIconMenu?.style) {
          aplayerIconMenu.style.display="block"
        }
        if (fps?.style) {
          fps.style.display="block"
        }
        return;
      }
      const anMusicBg = document.getElementById("an_music_bg");
  
      if (isChangeBg) {
        // player listswitch 会进入此处
        const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
        if (anMusicBg?.style) {
            anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
        }
      } else {
        // 第一次进入，绑定事件，改背景
        let timer = setInterval(() => {
          const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
          if (aplayerIconMenu?.style) {
            aplayerIconMenu.style.display="none"
          }
          if (fps?.style) {
            fps.style.display="none"
          }
          if (musiccover) {
            clearInterval(timer);
            if (anMusicBg?.style) {
                anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
            }
            // 绑定事件
            anzhiyu.addEventListenerChangeMusicBg();
  
            // 暂停nav的音乐
            if (
              document.querySelector("#nav-music meting-js")?.aplayer &&
              !document.querySelector("#nav-music meting-js")?.aplayer.audio.paused
            ) {
              anzhiyu.musicToggle();
            }
          }
        }, 100);
      }
    },
    addEventListenerChangeMusicBg: function () {
      const anMusicPage = document.getElementById("anMusic-page");
      const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");
      anMusicPage.querySelector("meting-js").aplayer.on("loadeddata", function () {
        anzhiyu.changeMusicBg();
      });
  
      aplayerIconMenu.addEventListener("click", function () {
        document.getElementById("menu-mask").style.display = "block";
        document.getElementById("menu-mask").style.animation = "0.5s ease 0s 1 normal none running to_show";
      });
  
      document.getElementById("menu-mask").addEventListener("click", function () {
        if (window.location.pathname != "/life/music/") return;
        anMusicPage.querySelector(".aplayer-list").classList.remove("aplayer-list-hide");
      });
    },
  };
  
  // 调用
  anzhiyu.changeMusicBg(false);




var percentFlag = false; // 节流阀
function essayScroll() {
  let a = document.documentElement.scrollTop || window.pageYOffset; // 卷去高度
  const waterfallResult = a % document.documentElement.clientHeight; // 卷去一个视口
  waterfallResult <= 99 || (waterfallResult = 99);

  if (
    !percentFlag &&
    waterfallResult + 100 >= document.documentElement.clientHeight &&
    document.querySelector("#waterfall")
  ) {
    // console.info(waterfallResult, document.documentElement.clientHeight);
    setTimeout(() => {
      waterfall("#waterfall");
    }, 500);
  } else {
    setTimeout(() => {
      document.querySelector("#waterfall") && waterfall("#waterfall");
    }, 500);
  }

  const r = window.scrollY + document.documentElement.clientHeight;

  let p = document.getElementById("post-comment") || document.getElementById("footer");

  (p.offsetTop + p.offsetHeight / 2 < r || 90 < waterfallResult) && (percentFlag = true);
}

function replaceAll(e, n, t) {
  return e.split(n).join(t);
}

var icatessay = {
  diffDate: function (d, more = false) {
    const dateNow = new Date();
    const datePost = new Date(d);
    const dateDiff = dateNow.getTime() - datePost.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    let result;
    
    // Check if the suffix object and required properties exist
    const suffix = GLOBAL_CONFIG.date_suffix || {};
    const daySuffix = suffix.day || '天前';
    const hourSuffix = suffix.hour || '小时前';
    const minSuffix = suffix.min || '分钟前'; 

    if (more) {
      const monthCount = dateDiff / month;
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;

      if (monthCount >= 1) {
        result = datePost.toLocaleDateString().replace(/\//g, "-");
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + " " + daySuffix;
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + " " + hourSuffix;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + " " + minSuffix;
      } else {
        result = suffix.just;
      }
    } else {
      result = parseInt(dateDiff / day);
    }
    return result;
  },
  
  changeTimeInEssay: function () {
    document.querySelector("#icat-bber") &&
      document.querySelectorAll("#icat-bber time").forEach(function (e) {
        var t = e,
          datetime = t.getAttribute("datetime");
        (t.innerText = icatessay.diffDate(datetime, true)), (t.style.display = "inline");
      });
  },
  reflashEssayWaterFall: function () {
    document.querySelector("#waterfall") &&
      setTimeout(function () {
        waterfall("#waterfall");
        document.getElementById("waterfall").classList.add("show");
      }, 500);
  },
  commentText: function (e) {
    if (e == "undefined" || e == "null") e = "好棒！";
    var n = document.getElementsByClassName("el-textarea__inner")[0],
      t = document.createEvent("HTMLEvents");
    if (!n) return;
    t.initEvent("input", !0, !0);
    var o = replaceAll(e, "\n", "\n> ");
    (n.value = "> " + o + "\n\n"), n.dispatchEvent(t);
    var i = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, i - 80),
      n.focus(),
      n.setSelectionRange(-1, -1),
      document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show");
  },
};

icatessay.changeTimeInEssay();
icatessay.reflashEssayWaterFall();
// 逻辑

//影院
function selectVideo(id){
  var src=$("#video-item-"+id).attr("data-src");
  $("#video-select").html("<iframe id='video-iframe' src='"+src+"' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'> </iframe>");
  var iframe = document.getElementById("video-select")
  if (iframe) {
    if(iframe.attachEvent){
      iframe.attachEvent("onreadystatechange", function() {
        if (iframe.readyState === "complete" || iframe.readyState == "loaded") {
          iframe.detachEvent("onreadystatechange", arguments.callee);
        if (document.getElementsByClassName('video-mirror').length>0) {
          console.log("1true")
          $(".video-mirror").attr("style","transform:scaleX(-1);")
          }
        }
      });
    }else{
      iframe.addEventListener("load", function() {
        this.removeEventListener("load", arguments.call, false);
      if (document.getElementsByClassName('video-mirror').length>0) {
        console.log("2true")
        $(".video-mirror").attr("style","transform:scaleX(-1);")
      }
      }, false);
    }
  }
}
selectVideo('0-0')

function danmu() {
  if (location.pathname != '/comments/' || document.body.clientWidth < 768) return //判断是否是留言板页面
  const Danmaku = new EasyDanmaku({
    page: '/comments/', // 即留言板地址
    el: '#danmu', //弹幕挂载节点
    line: 10, //弹幕行数
    speed: 20, //弹幕播放速度
    hover: true,
    loop: true, //开启循环播放
  })
  let data = saveToLocal.get('danmu')
  if (data) Danmaku.batchSend(data, true);
  else {
    let ls = []
    fetch('https://wei-twikoo.weiguoguo.top/', { // 此处替换成自己的twikoo地址
      method: "POST",
      body: JSON.stringify({
        "event": "GET_RECENT_COMMENTS",
        "includeReply": false,
        "pageSize": 100
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(({ data }) => {
      data.forEach(i => {
        if (i.avatar == undefined) i.avatar = 'https://cravatar.cn/avatar/d615d5793929e8c7d70eab5f00f7f5f1?d=mp'
        ls.push({ avatar: i.avatar, content: i.nick + '：' + formatDanmaku(i.comment), url: i.url + '#' + i.id })
      });
      Danmaku.batchSend(ls, true);
      saveToLocal.set('danmu', ls, 0.02)
    });
    // 格式化评论
    function formatDanmaku(str) {
      str = str.replace(/<\/*br>|[\s\uFEFF\xA0]+/g, '');
      str = str.replace(/<img.*?>/g, '[图片]');
      str = str.replace(/<a.*?>.*?<\/a>/g, '[链接]');
      str = str.replace(/<pre.*?>.*?<\/pre>/g, '[代码块]');
      str = str.replace(/<.*?>/g, '');
      return str
    }
  }
  document.getElementById('danmuBtn').innerHTML = `<button class="hideBtn" onclick="document.getElementById('danmu').classList.remove('hidedanmu')">显示弹幕</button> <button class="hideBtn" onclick="document.getElementById('danmu').classList.add('hidedanmu')">隐藏弹幕</button>`
}
// danmu()
// document.addEventListener("pjax:complete", danmu)