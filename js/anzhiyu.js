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
        document.body.dataset.type = 'WEI'
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
          document.body.dataset.type = 'music'
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