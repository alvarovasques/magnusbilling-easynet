/* =====================================================================
   Easynet Telefônica — Camada A (marca, runtime)
   Carregado no <head>, depois do index.php. Não altera lógica do app;
   só troca marca visível que o CSS não alcança:
     - variáveis nativas de whitelabel (nameCustom/productCustom/logoCustom)
     - texto do splash de carregamento
     - logo branca no topo da tela de login
     - neutraliza links e textos "MagnusBilling" remanescentes (About/Help)
   Idempotente e defensivo: se algo não existir, apenas ignora.
   ===================================================================== */
(function () {
  "use strict";

  var BRAND = {
    name: "Easynet",
    product: "Easynet Telefônica",
    tagline: "Sistema de Telefonia",
    mark: "resources/images/easynet-mark.png",     // splash / About
    white: "resources/images/easynet-white.png",   // login (fundo navy)
    helpUrl: "https://www.easynet.com.br"           // destino neutro p/ links antigos
  };

  /* 1) Variáveis nativas de whitelabel — lidas pelo app em runtime
        (janela "Sobre", título do produto). Definir cedo cobre tudo. */
  window.nameCustom = BRAND.name;
  window.productCustom = BRAND.product;
  window.logoCustom = BRAND.mark;

  /* 2) Título da aba */
  try { document.title = BRAND.product; } catch (e) {}

  /* 3) Splash: nome, submensagem e logo do carregamento */
  function fixSplash() {
    var n = document.getElementById("name-system");
    if (n) n.textContent = BRAND.product;
    var tm = document.getElementById("text-msg");
    if (tm) tm.textContent = BRAND.tagline;
    var gif = document.getElementById("loadinggif");
    if (gif) { gif.src = BRAND.mark; gif.removeAttribute("width"); gif.style.maxWidth = "200px"; }
  }

  /* 4) Logo branca no topo do card de login (injeta uma <img> uma vez) */
  function injectLoginBrand(root) {
    var win = root.querySelector(".auth-locked-window .x-window-body")
           || root.querySelector(".auth-locked-window");
    if (!win || win.querySelector(".ez-login-brand")) return;
    var img = document.createElement("img");
    img.className = "ez-login-brand";
    img.src = BRAND.white;
    img.alt = BRAND.product;
    win.insertBefore(img, win.firstChild);
  }

  /* 5) Neutraliza marca remanescente em nós adicionados dinamicamente:
        - links para magnusbilling.org -> Easynet (ou removidos)
        - texto "MagnusBilling ..." -> "Easynet ..." */
  var TOKEN = /MagnusBilling(\s+System)?/g;
  function scrub(node) {
    if (!node) return;
    // links
    if (node.querySelectorAll) {
      var links = node.querySelectorAll('a[href*="magnusbilling"]');
      for (var i = 0; i < links.length; i++) {
        var a = links[i];
        a.href = BRAND.helpUrl;
        if (/magnusbilling/i.test(a.textContent)) a.textContent = BRAND.name;
      }
      // iframes de facebook/credits do magnus
      var ifr = node.querySelectorAll('iframe[src*="magnusbilling"]');
      for (var k = 0; k < ifr.length; k++) ifr[k].parentNode && ifr[k].parentNode.removeChild(ifr[k]);
    }
    // textos
    var tw = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    var t;
    while ((t = tw.nextNode())) {
      if (t.nodeValue && t.nodeValue.indexOf("MagnusBilling") !== -1) {
        t.nodeValue = t.nodeValue.replace(TOKEN, function (m, sys) {
          return sys ? BRAND.product : BRAND.name;
        });
      }
    }
  }

  function onReady() {
    fixSplash();
    scrub(document.body);
    injectLoginBrand(document.body);

    var obs = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var added = muts[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          if (added[j].nodeType === 1) {
            scrub(added[j]);
            injectLoginBrand(added[j].ownerDocument ? document.body : added[j]);
          }
        }
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
  // reforço no load completo (Ext monta a tela depois do DOMContentLoaded)
  window.addEventListener("load", function () { fixSplash(); scrub(document.body); injectLoginBrand(document.body); });
})();
