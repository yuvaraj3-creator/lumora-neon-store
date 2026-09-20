(() => {
  if (location.pathname !== '/' && !location.pathname.endsWith('/index.html')) return;

  const HERO = 'assets/gti-garage.jpg';
  const NIGHT = 'assets/gti-night.jpg';
  const DETAIL = 'assets/gti-headlight.jpg';
  const FALLBACK = NIGHT;

  const colors = [
    ['Red','#ff1e2d',HERO],
    ['Blue','#168cff',NIGHT],
    ['White','#fff',DETAIL],
    ['Amber','#ffb000',NIGHT],
    ['Green','#18e66b',HERO],
    ['Purple','#a238ff',DETAIL]
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

  const css = document.createElement('style');
  css.textContent = `
    *{box-sizing:border-box}
    html,body{margin:0;background:#050505;color:#fff;font-family:Inter,Arial,sans-serif}
    body{overflow-x:hidden}
    a,button{ -webkit-tap-highlight-color:transparent }

    .lum-nav{height:78px;position:absolute;inset:0 0 auto;z-index:50;display:flex;align-items:center;padding:0 clamp(18px,4.5vw,70px);background:linear-gradient(180deg,rgba(0,0,0,.92),transparent);border-bottom:1px solid #ffffff12}
    .lum-logo{font-size:27px;font-weight:900;letter-spacing:.2em;color:#fff;text-decoration:none;white-space:nowrap}
    .lum-logo small{display:block;font-size:7px;letter-spacing:.34em;color:#999;margin-top:4px}
    .lum-links{display:flex;gap:30px;margin:auto}
    .lum-links a{color:#aaa;text-decoration:none;font-size:12px;font-weight:800;transition:.2s}
    .lum-links a:hover,.lum-links a.active{color:#ff1e2d}
    .lum-actions{display:flex;align-items:center;gap:14px}
    .lum-actions a{color:#fff;text-decoration:none;font-size:20px}
    .lum-cart{position:relative}
    .lum-cart i{position:absolute;right:-7px;top:-7px;background:#ff1e2d;width:15px;height:15px;border-radius:50%;display:grid;place-items:center;font:700 9px Arial;font-style:normal}
    .lum-menu{display:none;background:none;border:0;color:#fff;font-size:22px;cursor:pointer}

    .lum-hero{min-height:650px;height:min(760px,62vw);position:relative;overflow:hidden;background:#050505}
    .lum-hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(1.08) contrast(1.08)}
    .lum-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#050505f7 0%,#050505d9 25%,#05050535 58%,#05050570 100%),linear-gradient(0deg,#050505 0%,transparent 32%,#0005 100%)}
    .lum-copy{position:absolute;z-index:3;left:clamp(22px,5vw,74px);top:50%;transform:translateY(-48%);max-width:560px}
    .lum-kicker,.lum-eyebrow{color:#ff1e2d;font-size:10px;font-weight:900;letter-spacing:.4em;margin-bottom:12px}
    .lum-copy h1{font-size:clamp(54px,7vw,96px);line-height:.84;letter-spacing:-.055em;margin:0;font-weight:950}
    .lum-copy h1 span{color:#ff1e2d}
    .lum-copy p{font-size:16px;color:#c9c9cc;line-height:1.65;max-width:430px;margin:22px 0}
    .lum-cta,.lum-btn{display:inline-flex;align-items:center;justify-content:center;padding:15px 28px;background:#ff1e2d;color:#fff;text-decoration:none;border:0;font-size:12px;font-weight:900;letter-spacing:.1em;border-radius:3px;box-shadow:0 12px 35px #ff1e2d33;cursor:pointer}
    .lum-btn.secondary{background:#141416;border:1px solid #333}
    .lum-features{display:flex;gap:10px;flex-wrap:wrap;margin:22px 0}
    .lum-features span{border:1px solid #ffffff2a;background:#08080aaa;padding:9px 12px;border-radius:99px;font-size:10px;color:#eee}

    .lum-section{padding:0 clamp(16px,4.5vw,70px)}
    .lum-thumbs{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-top:-1px;position:relative;z-index:5;padding-top:12px}
    .lum-thumb{height:92px;border:1px solid #29292e;border-radius:9px;overflow:hidden;background:#0b0b0d;cursor:pointer;padding:0}
    .lum-thumb.active{border:2px solid #ff1e2d;box-shadow:0 0 22px #ff1e2d22}
    .lum-thumb img{width:100%;height:100%;object-fit:cover}
    .lum-title-row{display:flex;justify-content:space-between;align-items:end;padding:62px 0 20px}
    .lum-title{font-size:30px;margin:0;text-transform:uppercase;letter-spacing:.02em}
    .lum-view{color:#aaa;text-decoration:none;font-size:12px}
    .lum-view:hover{color:#fff}

    .lum-colors{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}
    .lum-color{border:1px solid #29292e;border-radius:12px;overflow:hidden;background:#0b0b0d;color:#fff;padding:0;cursor:pointer;text-align:left;transition:.25s}
    .lum-color:hover{transform:translateY(-4px)}
    .lum-color.active{border-color:#ff1e2d;box-shadow:0 0 28px #ff1e2d1f}
    .lum-color-img{height:155px;position:relative;overflow:hidden}
    .lum-color-img img{position:relative;width:100%;height:100%;object-fit:cover;display:block}
    .lum-color-img:after{content:"";position:absolute;inset:22% 12%;background:var(--glow);filter:blur(25px);opacity:.22;pointer-events:none}
    .lum-color-label{padding:12px 14px 15px;font-size:12px;font-weight:900}
    .lum-color-line{width:28px;height:3px;background:var(--glow);margin-top:8px;border-radius:9px}

    .lum-featured{margin-top:65px;border:1px solid #29292e;background:linear-gradient(135deg,#0b0b0d,#070708);border-radius:16px;overflow:hidden;display:grid;grid-template-columns:1.1fr .9fr}
    .lum-featured-media{min-height:500px;position:relative;background:#080808;overflow:hidden}
    .lum-featured-media img{width:100%;height:100%;object-fit:cover;display:block}
    .lum-featured-media:after{content:"";position:absolute;inset:auto 0 0;height:42%;background:linear-gradient(0deg,#050505,transparent)}
    .lum-best{position:absolute;z-index:2;left:20px;top:20px;background:#ff1e2d;color:#fff;font-size:9px;font-weight:900;letter-spacing:.12em;padding:8px 11px;border-radius:3px}
    .lum-featured-info{padding:clamp(28px,4vw,55px);display:flex;flex-direction:column;justify-content:center}
    .lum-featured-info h2{font-size:clamp(30px,4vw,52px);line-height:.95;margin:8px 0 15px}
    .lum-featured-info h2 span{display:block;color:#ff1e2d}
    .lum-featured-info p{color:#999;line-height:1.7;font-size:13px}
    .lum-rating{color:#ffb000;font-size:13px;margin:12px 0}
    .lum-price{display:flex;align-items:center;gap:12px;margin:18px 0}
    .lum-price strong{font-size:30px}.lum-old{text-decoration:line-through;color:#666}.lum-off{color:#18e66b;font-size:11px;font-weight:900}
    .lum-feature-list{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0 22px}
    .lum-feature-list div{border:1px solid #222;padding:12px;color:#bbb;font-size:11px}
    .lum-buy-row{display:flex;gap:10px;flex-wrap:wrap}

    .lum-trust{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid #222;border-left:1px solid #222;margin-top:0}
    .lum-trust-item{padding:22px 18px;border-right:1px solid #222;background:#080809}
    .lum-trust-item b{display:block;font-size:12px;margin-bottom:5px}.lum-trust-item span{font-size:10px;color:#777}

    .lum-models{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
    .lum-model{border:1px solid #29292e;border-radius:10px;overflow:hidden;background:#0b0b0d;text-decoration:none;color:#fff;transition:.25s}
    .lum-model:hover{transform:translateY(-4px);border-color:#555}
    .lum-model-img{height:170px;overflow:hidden}
    .lum-model-img img{width:100%;height:100%;object-fit:cover;transition:.4s}
    .lum-model:hover img{transform:scale(1.04)}
    .lum-model-body{padding:13px}.lum-model-body small{color:#888;font-size:10px}.lum-model-body b{display:block;margin-top:5px;font-size:13px}.lum-model-body span{display:block;color:#ff1e2d;font-size:11px;margin-top:6px;font-weight:900}

    .lum-promo{display:grid;grid-template-columns:1.2fr .8fr;gap:14px;margin-top:60px}
    .lum-promo-card{min-height:290px;position:relative;overflow:hidden;border:1px solid #29292e;border-radius:12px;background:#0b0b0d}
    .lum-promo-card img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0}
    .lum-promo-card:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#050505ee 0%,#05050555 60%,transparent 100%)}
    .lum-promo-copy{position:absolute;z-index:2;left:24px;bottom:25px}.lum-promo-copy b{display:block;font-size:24px}.lum-promo-copy span{display:block;color:#aaa;font-size:11px;margin:7px 0 15px}
    .lum-before-after{display:grid;grid-template-columns:1fr 1fr;height:100%}
    .lum-before-after img{position:relative;grid-row:1;width:100%;height:100%;object-fit:cover}
    .lum-before-after:after{content:"";position:absolute;left:50%;top:0;bottom:0;width:1px;background:#ff1e2d}
    .lum-ba-label{position:absolute;z-index:3;top:18px;background:#050505cc;padding:7px 10px;font-size:9px;font-weight:900}.lum-ba-left{left:15px}.lum-ba-right{right:15px}

    .lum-stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #222;border-bottom:1px solid #222;margin-top:65px;padding:30px 0}
    .lum-stat{display:flex;align-items:center;gap:12px;border-right:1px solid #29292d;padding:0 24px}.lum-stat:last-child{border:0}
    .lum-stat i{font-style:normal;color:#ff1e2d;font-size:22px}.lum-stat strong{font-size:18px}.lum-stat small{display:block;color:#888;font-size:9px;margin-top:4px}

    .lum-why{padding:65px 0 15px}.lum-why-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    .lum-why-card{border:1px solid #29292e;border-radius:12px;padding:28px;background:#09090a}.lum-why-card h3{margin:0 0 12px;font-size:17px}.lum-why-card p{color:#888;font-size:12px;line-height:1.7}.lum-quote{font-size:30px;line-height:1.1;font-weight:900}.lum-quote span{color:#ff1e2d}
    .lum-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px}.lum-metric{border:1px solid #222;padding:18px;text-align:center}.lum-metric b{font-size:22px}.lum-metric small{display:block;color:#777;margin-top:5px;font-size:9px}

    .lum-footer{padding:55px 0 55px;display:flex;justify-content:space-between;gap:30px;border-top:1px solid #222;margin-top:50px}
    .lum-footer b{font-size:23px;letter-spacing:.2em}.lum-footer p{color:#888;font-size:11px;max-width:380px;line-height:1.7}
    .lum-footer-links{display:flex;gap:24px;flex-wrap:wrap}.lum-footer-links a{color:#aaa;text-decoration:none;font-size:10px;font-weight:800}.lum-footer-links a:hover{color:#fff}

    @media(max-width:900px){
      .lum-links{gap:14px}.lum-colors{grid-template-columns:repeat(3,1fr)}.lum-models{grid-template-columns:repeat(2,1fr)}
      .lum-featured{grid-template-columns:1fr}.lum-featured-media{min-height:390px}.lum-promo{grid-template-columns:1fr}.lum-why-grid{grid-template-columns:1fr}
    }
    @media(max-width:650px){
      .lum-nav{height:65px;padding:0 16px}.lum-logo{font-size:20px}.lum-links{display:none;position:absolute;top:65px;left:0;right:0;background:#09090a;border-bottom:1px solid #222;padding:12px 16px;flex-direction:column;gap:0}.lum-links.mobile-open{display:flex}
      .lum-links a{padding:13px 5px;border-bottom:1px solid #151515}.lum-menu{display:block}
      .lum-actions>a:first-child,.lum-actions>a:nth-child(2){display:none}
      .lum-hero{height:690px;min-height:690px}.lum-hero-bg{object-position:62% center;opacity:.72}.lum-copy{left:20px;right:20px;top:42%}.lum-copy h1{font-size:54px}.lum-copy p{font-size:13px}
      .lum-features{gap:6px}.lum-features span{font-size:8px;padding:8px}.lum-thumbs{grid-template-columns:repeat(3,1fr)}.lum-thumb{height:72px}
      .lum-title-row{padding-top:44px}.lum-title{font-size:22px}.lum-colors{grid-template-columns:repeat(2,1fr);gap:9px}.lum-color-img{height:125px}
      .lum-models{grid-template-columns:repeat(2,1fr);gap:9px}.lum-model-img{height:125px}
      .lum-featured-media{min-height:300px}.lum-feature-list{grid-template-columns:1fr}.lum-buy-row>*{width:100%}
      .lum-trust{grid-template-columns:1fr 1fr}.lum-trust-item{padding:17px 12px}.lum-promo{gap:9px}.lum-promo-card{min-height:230px}
      .lum-stats{grid-template-columns:repeat(2,1fr);gap:20px}.lum-stat{padding:0 8px}.lum-metrics{grid-template-columns:1fr 1fr}
      .lum-footer{display:block}.lum-footer-links{margin-top:22px}
    }
  `;
  document.head.appendChild(css);

  const safe = s => String(s).replace(/'/g,"&#39;");

  const colorCards = colors.map(([name,glow,src],i) =>
    `<button class="lum-color ${i===0?'active':''}" data-color="${name.toLowerCase()}" style="--glow:${glow}" onclick="window.lumoraColor(this,'${name.toLowerCase()}')">
      <div class="lum-color-img"><img src="${src}" alt="${name} neon front light"></div>
      <div class="lum-color-label">${name}<div class="lum-color-line"></div></div>
    </button>`
  ).join('');

  const thumbs = colors.map(([name,,src],i) =>
    `<button class="lum-thumb ${i===0?'active':''}" data-color="${name.toLowerCase()}" onclick="window.lumoraColor(this,'${name.toLowerCase()}')"><img src="${src}" alt="${name}"></button>`
  ).join('');

  const modelCards = models.map(([name,sub]) =>
    `<a class="lum-model" href="shop.html"><div class="lum-model-img"><img src="${NIGHT}" alt="${safe(name)}"><div class="lum-model-body"><small>${safe(sub)}</small><b>${safe(name)}</b><span>NEON FRONT LIGHT →</span></div></div></a>`
  ).join('');

  const trust = `
    <div class="lum-trust">
      <div class="lum-trust-item"><b>⚡ Premium Quality</b><span>1 Year Warranty</span></div>
      <div class="lum-trust-item"><b>⚙ Easy Installation</b><span>Plug & Play positioning</span></div>
      <div class="lum-trust-item"><b>◈ Safe & Reliable</b><span>Low power styling setup</span></div>
      <div class="lum-trust-item"><b>▣ Pan India Shipping</b><span>Fast dispatch support</span></div>
    </div>`;

  document.body.innerHTML = `
    <header class="lum-nav">
      <a class="lum-logo" href="index.html">LUMORA<small>LIGHTS THAT LOOK BACK</small></a>
      <nav class="lum-links" id="lumLinks">
        <a class="active" href="index.html">Home</a>
        <a href="shop.html">Shop</a>
        <a href="car-models.html">Collections</a>
        <a href="gallery.html">Gallery</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>
      <div class="lum-actions">
        <a href="shop.html" aria-label="Shop">⌕</a>
        <a href="contact.html" aria-label="Contact">♙</a>
        <a class="lum-cart" href="cart.html" aria-label="Cart">♧<i id="lumCount">0</i></a>
        <button class="lum-menu" type="button" aria-label="Open menu" onclick="document.getElementById('lumLinks').classList.toggle('mobile-open')">☰</button>
      </div>
    </header>

    <main>
      <section class="lum-hero">
        <img class="lum-hero-bg" src="${HERO}" alt="Red Volkswagen GTI with neon headlights">
        <div class="lum-copy">
          <div class="lum-kicker">PREMIUM LIGHTING</div>
          <h1>NEON BLINKING<br><span>FRONT LIGHT</span></h1>
          <p>Make your car stand out. Stylish. Bright. Premium. Available for all models.</p>
          <div class="lum-features"><span>⚡ Bright LED Output</span><span>⚙ Easy Installation</span><span>◈ Universal Fitment</span></div>
          <a class="lum-cta" href="shop.html">SHOP NOW →</a>
        </div>
      </section>

      <section class="lum-section">
        <div class="lum-thumbs">${thumbs}</div>

        <div class="lum-title-row">
          <div><div class="lum-eyebrow">COLOR OPTIONS</div><h2 class="lum-title">CHOOSE YOUR STYLE</h2></div>
          <a class="lum-view" href="shop.html">View All →</a>
        </div>
        <div class="lum-colors">${colorCards}</div>

        <div class="lum-featured">
          <div class="lum-featured-media">
            <span class="lum-best">🔥 BEST SELLER</span>
            <img src="${DETAIL}" alt="LUMORA headlight detail">
          </div>
          <div class="lum-featured-info">
            <div class="lum-eyebrow">TURN HEADS. LITERALLY.</div>
            <h2>NEON BLINKING <span>FRONT LIGHT</span></h2>
            <div class="lum-rating">★★★★★ <span style="color:#888">4.9 • Premium lighting</span></div>
            <p>Give your car a bold, aggressive night look with LUMORA lighting. Choose your glow colour and create your own signature setup.</p>
            <div class="lum-feature-list">
              <div>◉ Animated Neon Effect</div><div>☼ High Brightness</div>
              <div>♢ Weather Resistant</div><div>✣ Plug & Play Positioning</div>
            </div>
            <div class="lum-price"><strong>₹6,999</strong><span class="lum-old">₹8,999</span><span class="lum-off">22% OFF</span></div>
            <div class="lum-buy-row">
              <button class="lum-btn secondary" type="button" onclick="addToCart(0)">ADD TO CART</button>
              <button class="lum-btn" type="button" onclick="startRazorpay(0)">PAY SECURELY WITH RAZORPAY</button>
            </div>
          </div>
        </div>
        ${trust}

        <div class="lum-title-row">
          <div><div class="lum-eyebrow">FITMENT</div><h2 class="lum-title">AVAILABLE FOR ALL MODELS</h2></div>
          <a class="lum-view" href="car-models.html">Check Fitment →</a>
        </div>
        <div class="lum-models">${modelCards}</div>

        <div class="lum-promo">
          <div class="lum-promo-card">
            <div class="lum-before-after"><img src="${HERO}" alt="LUMORA lighting before"><img src="${NIGHT}" alt="LUMORA lighting after"></div>
            <span class="lum-ba-label lum-ba-left">BEFORE</span><span class="lum-ba-label lum-ba-right">AFTER</span>
            <div class="lum-promo-copy"><b>MAKE YOUR CAR DIFFERENT.</b><span>Ordinary look → LUMORA night signature</span></div>
          </div>
          <div class="lum-promo-card">
            <img src="${DETAIL}" alt="LUMORA headlight detail">
            <div class="lum-promo-copy"><b>MAKE IT YOURS.</b><span>Different colours. Same attitude.</span><a class="lum-cta" href="shop.html">EXPLORE COLORS →</a></div>
          </div>
        </div>

        <div class="lum-stats">
          <div class="lum-stat"><i>◇</i><div><strong>100%</strong><small>PREMIUM FINISH</small></div></div>
          <div class="lum-stat"><i>◈</i><div><strong>IP67</strong><small>WEATHER READY</small></div></div>
          <div class="lum-stat"><i>⚡</i><div><strong>24/7</strong><small>ROAD READY STYLE</small></div></div>
          <div class="lum-stat"><i>↗</i><div><strong>PLUG</strong><small>& PLAY POSITIONING</small></div></div>
        </div>

        <section class="lum-why">
          <div class="lum-title-row" style="padding-top:0">
            <div><div class="lum-eyebrow">THE LUMORA STANDARD</div><h2 class="lum-title">WHY CHOOSE LUMORA?</h2></div>
          </div>
          <div class="lum-why-grid">
            <div class="lum-why-card">
              <div class="lum-quote">Not just lights.<br><span>It's an attitude.</span></div>
              <p>Designed around a clean cinematic look, easy product discovery and model-specific fitment information.</p>
            </div>
            <div class="lum-why-card">
              <h3>What you get</h3>
              <p>✓ Animated neon styling effect</p>
              <p>✓ Multiple colour choices</p>
              <p>✓ Weather-resistant positioning</p>
              <p>✓ Model-specific product options</p>
            </div>
          </div>
          <div class="lum-metrics">
            <div class="lum-metric"><b>10K+</b><small>HAPPY CUSTOMERS</small></div>
            <div class="lum-metric"><b>15+</b><small>CAR MODELS</small></div>
            <div class="lum-metric"><b>4.8★</b><small>AVG. RATING</small></div>
            <div class="lum-metric"><b>1 YEAR</b><small>WARRANTY</small></div>
          </div>
        </section>

        <footer class="lum-footer">
          <div><b>LUMORA</b><p>Lights that look back. Premium neon front-light styling for enthusiasts.</p></div>
          <div class="lum-footer-links">
            <a href="index.html">HOME</a><a href="shop.html">SHOP</a><a href="car-models.html">COLLECTIONS</a><a href="gallery.html">GALLERY</a><a href="about.html">ABOUT</a><a href="contact.html">CONTACT</a><a href="cart.html">CART</a>
          </div>
        </footer>
      </section>
    </main>`;

  const heroImage=document.querySelector('.lum-hero-bg');
  if(heroImage){
    heroImage.addEventListener('error',()=>{
      if(heroImage.dataset.fallbackApplied!=='1'){
        heroImage.dataset.fallbackApplied='1';
        heroImage.src=FALLBACK;
      }
    });
    heroImage.setAttribute('loading','eager');
    heroImage.setAttribute('fetchpriority','high');
  }

  document.querySelectorAll('.lum-thumb img,.lum-color-img img,.lum-model-img img,.lum-featured-media img,.lum-promo-card img').forEach(img=>{
    img.addEventListener('error',()=>{
      if(img.dataset.fallbackApplied!=='1'){
        img.dataset.fallbackApplied='1';
        img.src=FALLBACK;
      }
    });
  });

  document.querySelectorAll('.lum-links a,.lum-actions a,.lum-cta,.lum-view,.lum-model,.lum-footer a').forEach(a=>{
    a.addEventListener('click',()=>{
      const href=a.getAttribute('href');
      if(href && !href.startsWith('#')) window.location.href=href;
    });
  });

  window.lumoraColor=(el,color)=>{
    document.querySelectorAll('.lum-color,.lum-thumb').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('[data-color="'+color+'"]').forEach(x=>x.classList.add('active'));
    const map={red:'none',blue:'hue-rotate(205deg) saturate(1.45) brightness(1.08)',white:'grayscale(1) brightness(1.65)',amber:'hue-rotate(38deg) saturate(1.5) brightness(1.15)',green:'hue-rotate(105deg) saturate(1.5) brightness(1.05)',purple:'hue-rotate(275deg) saturate(1.65) brightness(1.05)'};
    const hero=document.querySelector('.lum-hero-bg');
    if(hero) hero.style.filter='saturate(1.08) contrast(1.08) '+(map[color]&&map[color]!=='none'?map[color]:'');
  };

  try{
    const c=JSON.parse(localStorage.getItem('lumoraCart')||'[]');
    const e=document.getElementById('lumCount');
    if(e)e.textContent=c.reduce((s,x)=>s+(x.q||0),0);
  }catch{}
})();