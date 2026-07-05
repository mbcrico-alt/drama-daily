/* 드라마 반응 리포트 — 공유 버튼 (카카오 전용 카드 + 일반 공유)
   ▸ 카카오 키는 아래 KAKAO_JS_KEY 한 줄만 바꾸면 모든 리포트에 즉시 반영됩니다.
   ▸ 카카오 개발자 콘솔에서 Web 플랫폼 사이트 도메인(https://mbcrico-alt.github.io)을 등록해야 카카오 공유가 동작합니다. */
(function () {
  var KAKAO_JS_KEY = "PASTE_KAKAO_JS_KEY"; // ← 카카오 JavaScript 키
  var SHARE_DESC = "국내 드라마 기사·SNS·커뮤니티 반응과 화제성을 한눈에 보는 리포트.";

  // ---- 스타일 ----
  var css =
    ".dshare-wrap{position:fixed;right:16px;bottom:16px;bottom:calc(16px + env(safe-area-inset-bottom));" +
    "display:flex;flex-direction:column;gap:8px;align-items:flex-end;z-index:50}" +
    ".dshare-btn{display:inline-flex;align-items:center;gap:7px;border:none;cursor:pointer;" +
    "font-family:Pretendard,'Apple SD Gothic Neo',system-ui,sans-serif;font-size:14px;font-weight:700;" +
    "padding:11px 17px;border-radius:999px;box-shadow:0 4px 14px rgba(0,0,0,.18)}" +
    ".dshare-btn svg{width:16px;height:16px}" +
    ".dshare-generic{background:#6D30C4;color:#fff}.dshare-generic:hover{background:#5a26a5}" +
    ".dshare-generic svg{fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round}" +
    ".dshare-kakao{background:#FEE500;color:#191600}.dshare-kakao:hover{background:#f2da00}" +
    ".dshare-kakao svg{fill:#191600}" +
    ".dshare-toast{position:fixed;left:50%;bottom:92px;transform:translateX(-50%) translateY(8px);" +
    "background:#1A1722;color:#fff;font-size:13px;font-weight:600;padding:9px 15px;border-radius:8px;" +
    "opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:51;white-space:nowrap}" +
    ".dshare-toast.on{opacity:1;transform:translateX(-50%) translateY(0)}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // ---- 버튼 UI ----
  var kakaoIcon = '<svg viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 6.58 2 11c0 2.86 1.9 5.37 4.76 6.76-.21.73-.75 2.64-.86 3.05-.13.5.19.5.39.36.16-.1 2.55-1.73 3.6-2.44.68.1 1.38.15 2.11.15 5.52 0 10-3.58 10-8S17.52 3 12 3z"/></svg>';
  var shareIcon = '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="10.6" x2="15.4" y2="6.4"/><line x1="8.6" y1="13.4" x2="15.4" y2="17.6"/></svg>';

  var wrap = document.createElement("div"); wrap.className = "dshare-wrap";
  wrap.innerHTML =
    '<button class="dshare-btn dshare-kakao" type="button" style="display:none" aria-label="카카오톡 공유">' + kakaoIcon + '카카오톡</button>' +
    '<button class="dshare-btn dshare-generic" type="button" aria-label="공유하기">' + shareIcon + '공유하기</button>';
  var toast = document.createElement("div"); toast.className = "dshare-toast"; toast.textContent = "링크가 복사되었어요";
  document.body.appendChild(wrap); document.body.appendChild(toast);

  var kakaoBtn = wrap.querySelector(".dshare-kakao");
  var genBtn = wrap.querySelector(".dshare-generic");

  function showToast() { toast.classList.add("on"); setTimeout(function () { toast.classList.remove("on"); }, 1800); }

  function genericShare() {
    var url = location.href, title = document.title || "드라마 반응 리포트";
    if (navigator.share) { navigator.share({ title: title, url: url }).catch(function () {}); }
    else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(showToast).catch(function () { window.prompt("이 링크를 복사하세요", url); });
    } else { window.prompt("이 링크를 복사하세요", url); }
  }
  genBtn.addEventListener("click", genericShare);

  // ---- 카카오 ----
  function keyReady() { return KAKAO_JS_KEY && KAKAO_JS_KEY.indexOf("PASTE_") !== 0; }

  function initKakao() {
    if (typeof Kakao === "undefined" || !keyReady()) return;
    try { if (!Kakao.isInitialized()) Kakao.init(KAKAO_JS_KEY); } catch (e) { return; }
    kakaoBtn.style.display = "";
  }

  kakaoBtn.addEventListener("click", function () {
    if (typeof Kakao === "undefined" || !Kakao.isInitialized()) { genericShare(); return; }
    var title = document.title || "드라마 반응 리포트";
    try {
      Kakao.Share.sendDefault({
        objectType: "text",
        text: title + "\n\n" + SHARE_DESC,
        link: { mobileWebUrl: location.href, webUrl: location.href },
        buttonTitle: "리포트 보기"
      });
    } catch (e) { genericShare(); }
  });

  if (keyReady()) {
    if (typeof Kakao === "undefined") {
      var s = document.createElement("script");
      s.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
      s.onload = initKakao; s.onerror = function () {};
      document.head.appendChild(s);
    } else { initKakao(); }
  }
})();
