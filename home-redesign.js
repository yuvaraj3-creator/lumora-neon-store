(() => {
  if (location.pathname !== '/' && !location.pathname.endsWith('/index.html')) return;

  const HERO = 'assets/lumora-car-front.svg';
  const DETAIL = 'assets/neon-red.svg';
  const colors = [
    ['Red','#ff1e2d','none'],
    ['Blue','#168cff','hue-rotate(205deg) saturate(1.45) brightness(1.08)'],
    ['White','#fff','grayscale(1) brightness(1.65)'],
    ['Amber','#ffb000','hue-rotate(38deg) saturate(1.5) brightness(1.15)'],
    ['Green','#18e66b','hue-rotate(105deg) saturate(1.5) brightness(1.05)'],
    ['Purple','#a238ff','hue-rotate(275deg) saturate(1.65) brightness(1.05)']
  ];
  const models = [
    ['BMW 3 Series','BMW 3 Series F30 / F31 / F34'],
    ['Audi A4','Audi A4 B8 / B9'],
    ['Mercedes C-Class','Mercedes C-Class W205'],
    ['Toyota Fortuner','Toyota Fortuner'],
    ['Mahindra Thar','Mahindra Thar'],
    ['Hyundai Creta','Hyundai Creta'],
    ['Volkswagen Virtus','Volkswagen Virtus'],
    ['Skoda Slavia','Skoda Slavia']
  ];

  const css=document.createElement('style');
  css.textContent=`
    *{box-sizing:border-box}html,body{margin:0;background:#050505;color:#fff;font-family:Inter,Arial,sans-serif}
    body{overflow-x:hidden}.lum-nav{height:78px;position:absolute;inset:0 0 auto;z-index:20;display:flex;align-items:center;padding:0 clamp(18px,4.5vw,70px);background:linear-gradient(180deg,rgba(0,0,0,.9),transparent);border-bottom:1px solid #ffffff12}
    .lum-logo{font-size:27px;font-weight:900;letter-spacing:.2em;color:#fff;text-decoration:none}.lum-logo small{display:block;font-size:7px;letter-spacing:.34em;color:#999;margin-top:4px}
    .lum-links{display:flex;gap:38px;margin:auto}.lum-links a{color:#aaa;text-decoration:none;font-size:13px;font-weight:700}.lum-links a:hover,.lum-links a.active{color:#ff1e2d}
    .lum-actions{display:flex;gap:16px}.lum-actions a{color:#fff;text-decoration:none;font-size:21px}.lum-cart{position:relative}.lum-cart i{position:absolute;right:-7px;top:-7px;background:#ff1e2d;width:15px;height:15px;border-radius:50%;display:grid;place-items:center;font:700 9px Arial;font-style:normal}
    .lum-hero{min-height:650px;height:min(760px,62vw);position:relative;overflow:hidden;background:#050505}.lum-hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(1.08) contrast(1.08)}
    .lum-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#050505f5 0%,#050505d9 25%,#05050535 58%,#05050570 100%),linear-gradient(0deg,#050505 0%,transparent 32%,#0005 100%)}
    .lum-copy{position:absolute;z-index:3;left:clamp(22px,5vw,74px);top:50%;transform:translateY(-48%);max-width:560px}.lum-kicker{color:#ff1e2d;font-size:11px;font-weight:900;letter-spacing:.45em;margin-bottom:14px}
    .lum-copy h1{font-size:clamp(54px,7vw,96px);line-height:.84;letter-spacing:-.055em;margin:0;font-weight:950}.lum-copy h1 span{color:#ff1e2d}.lum-copy p{font-size:16px;color:#c9c9cc;line-height:1.65;max-width:430px;margin:22px 0}.lum-cta{display:inline-flex;padding:15px 28px;background:#ff1e2d;color:#fff;text-decoration:none;font-size:12px;font-weight:900;letter-spacing:.1em;border-radius:3px;box-shadow:0 12px 35px #ff1e2d33}
    .lum-features{display:flex;gap:10px;flex-wrap:wrap;margin:22px 0}.lum-features span{border:1px solid #ffffff2a;background:#08080aaa;padding:9px 12px;border-radius:99px;font-size:10px;color:#eee}
    .lum-section{padding:0 clamp(16px,4.5vw,70px)}.lum-thumbs{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-top:-1px;position:relative;z-index:5;padding-top:12px}.lum-thumb{height:92px;border:1px solid #29292e;border-radius:9px;overflow:hidden;background:#0b0b0d;cursor:pointer}.lum-thumb.active{border:2px solid #ff1e2d;box-shadow:0 0 22px #ff1e2d22}.lum-thumb img{width:100%;height:100%;object-fit:cover}
    .lum-title-row{display:flex;justify-content:space-between;align-items:end;padding:62px 0 20px}.lum-eyebrow{font-size:10px;font-weight:900;letter-spacing:.35em;color:#ff1e2d;margin-bottom:8px}.lum-title{font-size:30px;margin:0;text-transform:uppercase;letter-spacing:.02em}.lum-view{color:#aaa;text-decoration:none;font-size:12px}
    .lum-colors{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}.lum-color{border:1px solid #29292e;border-radius:12px;overflow:hidden;background:#0b0b0d;color:#fff;padding:0;cursor:pointer;text-align:left;transition:.25s}.lum-color:hover{transform:translateY(-4px)}.lum-color.active{border-color:#ff1e2d;box-shadow:0 0 28px #ff1e2d1f}.lum-color-img{height:155px;position:relative;overflow:hidden}.lum-color-img:after{content:"";position:absolute;inset:22% 12%;background:var(--glow);filter:blur(25px);opacity:.25}.lum-color-img img{position:relative;width:100%;height:100%;object-fit:cover;display:block}.lum-color-label{padding:12px 14px 15px;font-size:12px;font-weight:900}.lum-color-line{width:28px;height:3px;background:var(--glow);margin-top:8px;border-radius:9px}
    .lum-models{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.lum-model{border:1px solid #29292e;border-radius:10px;overflow:hidden;background:#0b0b0d;text-decoration:none;color:#fff}.lum-model-img{height:170px;overflow:hidden}.lum-model-img img{width:100%;height:100%;object-fit:cover}.lum-model-body{padding:13px}.lum-model-body small{color:#888;font-size:10px}.lum-model-body b{display:block;margin-top:5px;font-size:13px}.lum-model-body span{display:block;color:#ff1e2d;font-size:11px;margin-top:6px;font-weight:900}
    .lum-stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #222;border-bottom:1px solid #222;margin-top:65px;padding:30px 0}.lum-stat{display:flex;align-items:center;gap:12px;border-right:1px solid #29292d;padding:0 24px}.lum-stat:last-child{border:0}.lum-stat i{font-style:normal;color:#ff1e2d;font-size:22px}.lum-stat strong{font-size:18px}.lum-stat small{display:block;color:#888;font-size:9px;margin-top:4px}
    .lum-footer{padding:45px 0 55px;display:flex;justify-content:space-between;gap:30px}.lum-footer b{font-size:23px;letter-spacing:.2em}.lum-footer p{color:#888;font-size:11px;max-width:380px;line-height:1.7}.lum-footer-links{display:flex;gap:24px}.lum-footer-links a{color:#aaa;text-decoration:none;font-size:10px;font-weight:800}.lum-footer-links a:hover{color:#fff}
    @media(max-width:900px){.lum-links{gap:15px}.lum-colors{grid-template-columns:repeat(3,1fr)}.lum-models{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:650px){.lum-nav{height:65px;padding:0 16px}.lum-logo{font-size:20px}.lum-links{display:none}.lum-actions{margin-left:auto}.lum-hero{height:690px;min-height:690px}.lum-hero-bg{object-position:62% center;opacity:.72}.lum-copy{left:20px;right:20px;top:42%}.lum-copy h1{font-size:54px}.lum-copy p{font-size:13px}.lum-features{gap:6px}.lum-features span{font-size:8px;padding:8px}.lum-thumbs{grid-template-columns:repeat(3,1fr)}.lum-thumb{height:72px}.lum-title-row{padding-top:44px}.lum-title{font-size:22px}.lum-colors{grid-template-columns:repeat(2,1fr);gap:9px}.lum-color-img{height:125px}.lum-models{grid-template-columns:repeat(2,1fr);gap:9px}.lum-model-img{height:125px}.lum-stats{grid-template-columns:repeat(2,1fr);gap:20px}.lum-stat{padding:0 8px}.lum-footer{display:block}.lum-footer-links{margin-top:22px;flex-wrap:wrap}}
  `;
  document.head.appendChild(css);

  const colorCards=colors.map(([name,glow,src],i)=>`<button class="lum-color ${i===0?'active':''}" data-color="${name.toLowerCase()}" style="--glow:${glow}" onclick="window.lumoraColor(this,'${name.toLowerCase()}')"><div class="lum-color-img"><img src="${src}" alt="${name} neon front light"></div><div class="lum-color-label">${name}<div class="lum-color-line"></div></div></button>`).join('');
  const thumbs=colors.map(([name,,src],i)=>`<button class="lum-thumb ${i===0?'active':''}" data-color="${name.toLowerCase()}" onclick="window.lumoraColor(this,'${name.toLowerCase()}')"><img src="${src}" alt="${name}"></button>`).join('');
  const modelCards=models.map(([name,sub])=>`<a class="lum-model" href="shop.html"><div class="lum-model-img"><img src="${HERO}" alt="${name}"></div><div class="lum-model-body"><small>${sub}</small><b>${name}</b><span>NEON FRONT LIGHT →</span></div></a>`).join('');

  document.body.innerHTML=`
    <header class="lum-nav"><a class="lum-logo" href="index.html">LUMORA<small>LIGHTS THAT LOOK BACK</small></a><nav class="lum-links"><a class="active" href="index.html">Home</a><a href="shop.html">Shop</a><a href="car-models.html">Collections</a><a href="about.html">About</a><a href="contact.html">Contact</a></nav><div class="lum-actions"><a href="shop.html">⌕</a><a href="contact.html">♙</a><a class="lum-cart" href="cart.html">♧<i id="lumCount">0</i></a></div></header>
    <main>
      <section class="lum-hero"><img class="lum-hero-bg" src="${HERO}" alt="Red Volkswagen GTI with neon headlights"><div class="lum-copy"><div class="lum-kicker">PREMIUM LIGHTING</div><h1>NEON BLINKING<br><span>FRONT LIGHT</span></h1><p>Make your car stand out. Stylish. Bright. Premium. Available for all models.</p><div class="lum-features"><span>⚡ Bright LED Output</span><span>⚙ Easy Installation</span><span>◈ Universal Fitment</span></div><a class="lum-cta" href="shop.html">SHOP NOW →</a></div></section>
      <section class="lum-section"><div class="lum-thumbs">${thumbs}</div>
        <div class="lum-title-row"><div><div class="lum-eyebrow">COLOR OPTIONS</div><h2 class="lum-title">CHOOSE YOUR STYLE</h2></div><a class="lum-view" href="shop.html">View All →</a></div>
        <div class="lum-colors">${colorCards}</div>
        <div class="lum-title-row"><div><div class="lum-eyebrow">FITMENT</div><h2 class="lum-title">AVAILABLE FOR ALL MODELS</h2></div><a class="lum-view" href="car-models.html">Check Fitment →</a></div>
        <div class="lum-models">${modelCards}</div>
        <div class="lum-stats"><div class="lum-stat"><i>◇</i><div><strong>100%</strong><small>PREMIUM FINISH</small></div></div><div class="lum-stat"><i>◈</i><div><strong>IP67</strong><small>WEATHER READY</small></div></div><div class="lum-stat"><i>⚡</i><div><strong>24/7</strong><small>ROAD READY STYLE</small></div></div><div class="lum-stat"><i>↗</i><div><strong>PLUG</strong><small>& PLAY POSITIONING</small></div></div></div>
        <footer class="lum-footer"><div><b>LUMORA</b><p>Lights that look back. Premium neon front-light styling for enthusiasts.</p></div><div class="lum-footer-links"><a href="shop.html">SHOP</a><a href="car-models.html">COLLECTIONS</a><a href="about.html">ABOUT</a><a href="contact.html">CONTACT</a></div></footer>
      </section>
    </main>`;

  window.lumoraColor=(el,color)=>{
    document.querySelectorAll('.lum-color,.lum-thumb').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('[data-color="'+color+'"]').forEach(x=>x.classList.add('active'));
    const map={red:'none',blue:'hue-rotate(205deg) saturate(1.45) brightness(1.08)',white:'grayscale(1) brightness(1.65)',amber:'hue-rotate(38deg) saturate(1.5) brightness(1.15)',green:'hue-rotate(105deg) saturate(1.5) brightness(1.05)',purple:'hue-rotate(275deg) saturate(1.65) brightness(1.05)'};
    const hero=document.querySelector('.lum-hero-bg'); if(hero) hero.style.filter='saturate(1.08) contrast(1.08)';
  };
  try{const c=JSON.parse(localStorage.getItem('lumoraCart')||'[]');const e=document.getElementById('lumCount');if(e)e.textContent=c.reduce((s,x)=>s+(x.q||0),0)}catch{}
})();