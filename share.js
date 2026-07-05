/* 드라마 반응 리포트 — 공유 버튼 (일반 공유: 폰 공유창→카카오톡·문자·메일 등) */
(function () {
  var css =
    ".dshare-btn{position:fixed;right:16px;bottom:16px;bottom:calc(16px + env(safe-area-inset-bottom));" +
    "display:inline-flex;align-items:center;gap:7px;border:none;cursor:pointer;" +
    "font-family:Pretendard,'Apple SD Gothic Neo',system-ui,sans-serif;font-size:14px;font-weight:700;" +
    "padding:12px 18px;border-radius:999px;background:#6D30C4;color:#fff;" +
    "box-shadow:0 4px 14px rgba(109,48,196,.35);z-index:50}" +
    ".dshare-btn:hover{background:#5a26a5}" +
    ".dshare-btn svg{width:16px;height:16px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round}" +
    ".dshare-toast{position:fixed;left:50%;bottom:80px;transform:translateX(-50%) translateY(8px);" +
    "background:#1A1722;color:#fff;font-size:13px;font-weight:600;padding:9px 15px;border-radius:8px;" +
    "opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:51;white-space:nowrap}" +
    ".dshare-toast.on{opacity:1;transform:translateX(-50%) translateY(0)}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var btn = document.createElement("button");
  btn.type = "button"; btn.className = "dshare-btn"; btn.setAttribute("aria-label", "공유하기");
  btn.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>' +
    '<circle cx="18" cy="19" r="3"/><line x1="8.6" y1="10.6" x2="15.4" y2="6.4"/>' +
    '<line x1="8.6" y1="13.4" x2="15.4" y2="17.6"/></svg>공유하기';
  var toast = document.createElement("div");
  toast.className = "dshare-toast"; toast.textContent = "링크가 복사되었어요";
  document.body.appendChild(btn); document.body.appendChild(toast);

  function showToast() { toast.classList.add("on"); setTimeout(function () { toast.classList.remove("on"); }, 1800); }

  btn.addEventListener("click", function () {
    var url = location.href, title = document.title || "드라마 반응 리포트";
    if (navigator.share) { navigator.share({ title: title, url: url }).catch(function () {}); }
    else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(showToast).catch(function () { window.prompt("이 링크를 복사하세요", url); });
    } else { window.prompt("이 링크를 복사하세요", url); }
  });
})();
