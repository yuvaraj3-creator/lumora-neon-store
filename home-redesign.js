(() => {
  if (location.pathname !== '/' && !location.pathname.endsWith('/index.html')) return;

  const oldHero = document.querySelector('.main-media img');
  const oldThumbs = [...document.querySelectorAll('.thumb img')].map(x => x.src);
  const HERO = window.LUMORA_GTI_HERO || oldHero?.src || oldThumbs[1] || 'assets/bmw_red.webp';
  const DETAIL = window.LUMORA_GTI_LIGHT || oldThumbs[1] || oldThumbs[0] || 'assets/demon-eye.jpg';

  const products = [
    ['GTI FRONT','Red Performance','GTI_HEAD','shop.html'],
    ['GTI LIGHTS','Signature LED Eyes','GTI_LIGHT','shop.html'],
    ['NIGHT DRIVE','Midnight Presence','GTI_HEAD','shop.html'],
    ['DETAILS','Close-Up Precision','GTI_LIGHT','shop.html'],
    ['LUMORA BUILD','Red & Black Attitude','GTI_HEAD','shop.html']
  ];

  const cars = [
    ['Red GTI — Midnight','GTI_HEAD'],
    ['GTI Headlight Detail','GTI_LIGHT'],
    ['Red Performance Build','GTI_HEAD'],
    ['Signature LED Eyes','GTI_LIGHT']
  ];

  const css = document.createElement('style');
  css.textContent = `
    :root{--r:#ff1e2d;--r2:#ff4650;--black:#050505;--panel:#0b0b0d;--line:#252529;--muted:#a2a2aa;--white:#f8f8f8}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#050505;color:var(--white);font-family:Inter,Arial,sans-serif}
    body:before{content:"";position:fixed;inset:0;pointer-events:none;background:radial-gradient(circle at 75% 15%,rgba(255,24,38,.08),transparent 32%),radial-gradient(circle at 20% 80%,rgba(255,24,38,.035),transparent 28%);z-index:-1}
    .lum-nav{height:84px;position:absolute;top:0;left:0;right:0;z-index:20;display:flex;align-items:center;padding:0 clamp(24px,4.7vw,72px);background:linear-gradient(180deg,rgba(0,0,0,.82),rgba(0,0,0,.35),transparent);border-bottom:1px solid rgba(255,255,255,.06)}
    .lum-logo{font-size:28px;letter-spacing:.28em;font-weight:500;color:#fff;text-decoration:none}.lum-logo sup{font-size:8px;letter-spacing:0;vertical-align:top;margin-left:3px}
    .lum-links{display:flex;gap:46px;margin:auto}.lum-links a{color:#eee;text-decoration:none;font-size:14px;transition:.2s}.lum-links a:hover,.lum-links a.active{color:var(--r)}
    .lum-actions{display:flex;gap:23px;align-items:center}.lum-actions a{color:#fff;text-decoration:none;font-size:23px}.lum-cart{position:relative}.lum-cart i{position:absolute;right:-8px;top:-7px;width:15px;height:15px;border-radius:50%;display:grid;place-items:center;background:var(--r);font:700 9px Inter;color:#fff;font-style:normal}
    .lum-hero{min-height:760px;height:clamp(700px,47vw,860px);position:relative;overflow:hidden;background:#050608}
    .lum-hero:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(2,4,7,.94) 0%,rgba(2,4,7,.76) 28%,rgba(2,4,7,.15) 62%,rgba(2,4,7,.25) 100%),linear-gradient(0deg,rgba(0,0,0,.7),transparent 45%,rgba(0,0,0,.15))}
    .lum-hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(1.1) contrast(1.08)}
    .lum-red-glow{position:absolute;width:44vw;height:44vw;right:3%;top:10%;border-radius:50%;background:radial-gradient(circle,rgba(255,25,38,.22),transparent 64%);filter:blur(20px)}
    .lum-copy{position:absolute;left:clamp(28px,4.7vw,72px);top:50%;transform:translateY(-42%);max-width:520px;z-index:3}
    .lum-kicker{font-size:12px;letter-spacing:.5em;color:#c8c8ca;margin-bottom:18px}.lum-copy h1{margin:0;font-size:clamp(58px,7vw,108px);line-height:.88;letter-spacing:-.045em;font-weight:900;text-transform:uppercase}.lum-copy h1 span{display:block;color:var(--r);text-shadow:0 0 32px rgba(255,20,36,.18)}
    .lum-copy p{font-size:18px;line-height:1.55;color:#ddd;max-width:440px;margin:24px 0 28px}.lum-cta{display:inline-flex;align-items:center;gap:18px;padding:17px 31px;background:var(--r);color:#fff;text-decoration:none;font-weight:800;letter-spacing:.08em;font-size:13px;border-radius:3px;box-shadow:0 12px 40px rgba(255,24,40,.22)}.lum-cta:hover{background:#ff3442}
    .lum-side-note{position:absolute;right:3.5%;top:32%;font-family:cursive;font-size:35px;line-height:1.15;color:#ff3643;transform:rotate(-7deg);opacity:.9;text-align:center}
    .lum-trust{position:absolute;left:clamp(28px,4.7vw,72px);bottom:66px;display:flex;gap:0;z-index:3}.lum-trust .item{display:flex;align-items:center;gap:10px;padding:0 30px;border-right:1px solid rgba(255,255,255,.18)}.lum-trust .item:first-child{padding-left:0}.lum-trust b{display:block;font-size:10px;letter-spacing:.12em}.lum-trust span{font-size:25px}.lum-trust small{display:block;color:#b9b9bd;font-size:9px;margin-top:4px}
    .lum-dots{position:absolute;right:5%;bottom:48px;display:flex;gap:20px;z-index:4;color:#999;font-size:12px}.lum-dots .active{color:#fff;border-bottom:2px solid #fff;padding-bottom:12px}
    .lum-section{padding:0 clamp(24px,4.7vw,72px);background:#050505}.lum-cats{display:grid;grid-template-columns:repeat(5,1fr);gap:20px;position:relative;margin-top:-4px;z-index:5}.lum-cat{height:172px;position:relative;overflow:hidden;border:1px solid #28282b;border-radius:9px;background:#0b0b0d;text-decoration:none;color:#fff}.lum-cat img{width:100%;height:100%;object-fit:cover;filter:brightness(.48) saturate(.9);transition:.4s}.lum-cat:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.9),transparent 70%)}.lum-cat:hover img{transform:scale(1.06);filter:brightness(.7)}.lum-cat-copy{position:absolute;left:22px;right:15px;bottom:17px;z-index:2}.lum-cat-copy b{font-size:14px;letter-spacing:.03em}.lum-cat-copy small{display:block;color:#bbb;margin-top:5px;font-size:12px}.lum-cat-copy em{position:absolute;right:0;bottom:0;font-style:normal;font-size:22px}
    .lum-featured{padding:68px 0 30px;display:flex;justify-content:space-between;align-items:end}.lum-eyebrow{font-size:11px;letter-spacing:.4em;color:var(--r);margin-bottom:10px}.lum-title{margin:0;font-size:30px;letter-spacing:.03em;text-transform:uppercase}.lum-view{color:#ccc;text-decoration:none;font-size:13px}
    .lum-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.lum-card{background:#0b0b0d;border:1px solid #232327;border-radius:8px;overflow:hidden}.lum-card-media{height:220px;overflow:hidden;background:#111}.lum-card-media img{width:100%;height:100%;object-fit:cover;transition:.4s}.lum-card:hover img{transform:scale(1.04)}.lum-card-body{padding:17px}.lum-card-body small{color:var(--r);letter-spacing:.15em;font-size:9px}.lum-card-body h3{margin:7px 0 4px;font-size:15px}.lum-card-body p{margin:0;color:#888;font-size:11px}
    .lum-strip{margin-top:70px;border-top:1px solid #202024;border-bottom:1px solid #202024;padding:30px 0;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.lum-stat{display:flex;align-items:center;gap:14px}.lum-stat strong{font-size:22px}.lum-stat small{display:block;color:#85858b;font-size:10px;margin-top:3px}.lum-stat span{font-size:25px;color:var(--r)}
    .lum-footer{margin-top:70px;padding:45px 0 55px;border-top:1px solid #1c1c20;display:flex;justify-content:space-between;gap:40px;color:#85858b}.lum-footer b{font-size:24px;letter-spacing:.25em;color:#fff}.lum-footer p{font-size:11px;max-width:360px;line-height:1.7}.lum-footer-links{display:flex;gap:25px}.lum-footer a{color:#aaa;text-decoration:none;font-size:11px}.lum-footer a:hover{color:#fff}
    @media(max-width:950px){.lum-links{gap:18px}.lum-links a{font-size:12px}.lum-side-note{display:none}.lum-cats{grid-template-columns:repeat(3,1fr)}.lum-cards{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:650px){.lum-nav{height:68px;padding:0 18px}.lum-logo{font-size:21px}.lum-links{display:none}.lum-actions{margin-left:auto;gap:13px}.lum-hero{height:720px;min-height:720px}.lum-hero-bg{object-position:62% center;opacity:.72}.lum-copy{top:39%;left:20px;right:20px}.lum-copy h1{font-size:56px}.lum-copy p{font-size:14px;max-width:320px}.lum-trust{left:20px;bottom:32px;right:20px;display:grid;grid-template-columns:repeat(3,1fr)}.lum-trust .item{padding:0 9px;border-right:1px solid rgba(255,255,255,.14)}.lum-trust span{font-size:18px}.lum-trust b{font-size:8px}.lum-trust small{font-size:7px}.lum-dots{display:none}.lum-section{padding:0 16px}.lum-cats{grid-template-columns:repeat(2,1fr);gap:9px}.lum-cat{height:145px}.lum-cat-copy{left:13px}.lum-cat-copy b{font-size:11px}.lum-cat-copy small{font-size:9px}.lum-featured{padding:48px 0 22px}.lum-title{font-size:22px}.lum-cards{grid-template-columns:1fr 1fr;gap:9px}.lum-card-media{height:145px}.lum-card-body{padding:11px}.lum-card-body h3{font-size:12px}.lum-strip{grid-template-columns:1fr 1fr;gap:22px}.lum-footer{display:block}.lum-footer-links{margin-top:25px;flex-wrap:wrap}}
  `;
  document.head.appendChild(css);

  const resolveImg = key => key === 'GTI_LIGHT' ? DETAIL : HERO;
  const catHTML = products.map(([a,b,img,href]) => `<a class="lum-cat" href="${href}"><img src="${resolveImg(img)}" alt="${b}"><div class="lum-cat-copy"><b>${a}</b><small>${b}</small><em>→</em></div></a>`).join('');
  const cardHTML = cars.map(([name,img],i) => `<article class="lum-card"><div class="lum-card-media"><img src="${resolveImg(img)}" alt="${name}"></div><div class="lum-card-body"><small>FEATURED ${String(i+1).padStart(2,'0')}</small><h3>${name}</h3><p>Premium automotive lighting collection</p></div></article>`).join('');

  document.body.innerHTML = `
    <header class="lum-nav">
      <a class="lum-logo" href="index.html">LUMORA<sup>®</sup></a>
      <nav class="lum-links"><a class="active" href="index.html">Home</a><a href="shop.html">Shop</a><a href="car-models.html">Collections</a><a href="about.html">About</a><a href="contact.html">Contact</a></nav>
      <div class="lum-actions"><a href="shop.html" aria-label="Search">⌕</a><a href="contact.html" aria-label="Account">♙</a><a class="lum-cart" href="cart.html" aria-label="Cart">♧<i id="lumCount">0</i></a></div>
    </header>
    <main>
      <section class="lum-hero">
        <img class="lum-hero-bg" src="${HERO}" alt="Red performance car at night">
        <div class="lum-red-glow"></div>
        <div class="lum-copy">
          <div class="lum-kicker">VOLKSWAGEN GTI • NIGHT EDITION</div>
          <h1>RED<br><span>IGNITES</span></h1>
          <p>Sharp LED eyes. Glossy red performance. A LUMORA build made to own the night.</p>
          <a class="lum-cta" href="shop.html">SHOP NOW <span>→</span></a>
        </div>
        <div class="lum-side-note">More<br>Than<br>A Drive<br><small>GTI EDITION</small></div>
        <div class="lum-trust">
          <div class="item"><span>◇</span><div><b>PREMIUM</b><small>QUALITY</small></div></div>
          <div class="item"><span>▣</span><div><b>FAST & SECURE</b><small>DELIVERY</small></div></div>
          <div class="item"><span>⟳</span><div><b>HASSLE-FREE</b><small>RETURNS</small></div></div>
        </div>
        <div class="lum-dots"><span class="active">01</span><span>02</span><span>03</span></div>
      </section>
      <section class="lum-section">
        <div class="lum-cats">${catHTML}</div>
        <div class="lum-featured"><div><div class="lum-eyebrow">FEATURED PRODUCTS</div><h2 class="lum-title">Curated For Enthusiasts</h2></div><a class="lum-view" href="shop.html">View All&nbsp;&nbsp;→</a></div>
        <div class="lum-cards">${cardHTML}</div>
        <div class="lum-strip">
          <div class="lum-stat"><span>◇</span><div><strong>100%</strong><small>PREMIUM FINISH</small></div></div>
          <div class="lum-stat"><span>◈</span><div><strong>IP67</strong><small>WEATHER READY</small></div></div>
          <div class="lum-stat"><span>⚡</span><div><strong>24/7</strong><small>ROAD READY STYLE</small></div></div>
          <div class="lum-stat"><span>↗</span><div><strong>PLUG</strong><small>& PLAY INSTALLATION</small></div></div>
        </div>
        <footer class="lum-footer"><div><b>LUMORA</b><p>Lights that look back. Premium Demon Eye styling and automotive essentials built for enthusiasts.</p></div><div class="lum-footer-links"><a href="shop.html">SHOP</a><a href="car-models.html">COLLECTIONS</a><a href="about.html">ABOUT</a><a href="contact.html">CONTACT</a></div></footer>
      </section>
    </main>
  `;

  try {
    const c = JSON.parse(localStorage.getItem('lumoraCart') || '[]');
    const el = document.getElementById('lumCount');
    if (el) el.textContent = c.reduce((s,x)=>s + (x.q || 0), 0);
  } catch {}
})();