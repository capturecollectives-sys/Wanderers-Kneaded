const data = window.WK_SITE_DATA;
const $ = (selector) => document.querySelector(selector);

const eventBenefits = data.eventBenefits || [
  { tag: "Speed", title: "Fast service without killing the quality", text: "High-volume wood-fired service designed to keep queues moving while every pizza still feels made with care." },
  { tag: "Guests", title: "A proper crowd-pleaser", text: "Sourdough pizza works for weddings, students, staff parties, festivals and late-night food." },
  { tag: "Setup", title: "Self-contained mobile setup", text: "We bring the oven, crew, prep, service system and event-ready operation so organisers have less to worry about." },
  { tag: "Presence", title: "Looks good on site", text: "A food offer that adds atmosphere, smell, theatre and visual energy as well as dinner." },
  { tag: "Menus", title: "Flexible menus", text: "Classic favourites, vegetarian and vegan options, specials and event-specific menus." },
  { tag: "Scale", title: "Experienced with real crowds", text: "Built for parks, public events, festivals, private parties and city-centre trading." }
];

function injectAuditStyles() {
  if (document.querySelector("#wk-audit-styles")) return;
  const style = document.createElement("style");
  style.id = "wk-audit-styles";
  style.textContent = `
    .hero h1{max-width:13ch;font-size:clamp(2.9rem,7.3vw,6.9rem)}
    .hero-proof{display:flex;flex-wrap:wrap;gap:.45rem;margin:1.2rem 0 1.35rem;max-width:54rem}.hero-proof span{padding:.45rem .65rem;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.9);font-size:.82rem;font-weight:850;backdrop-filter:blur(10px)}
    .live-updated{display:block;color:var(--muted);font-weight:750}.route-section{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;background:#fffaf1;padding-top:clamp(1rem,3vw,2rem)}
    .route-card{min-height:21rem;display:flex;flex-direction:column;justify-content:flex-end;gap:.85rem;padding:clamp(1.25rem,3vw,2.2rem);border-radius:.5rem;color:#fff;text-decoration:none;overflow:hidden;position:relative;box-shadow:var(--shadow);isolation:isolate}.route-card:before{content:"";position:absolute;inset:0;z-index:-1;transition:transform .3s ease,filter .3s ease}.route-card:after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(12,9,7,.05),rgba(12,9,7,.84))}.route-card:hover:before{transform:scale(1.06);filter:saturate(1.18) contrast(1.08)}
    .find-route:before{background:url("https://static.wixstatic.com/media/e9cf4f_18c6102c66164272b39fcd4a5d675958~mv2.jpg/v1/crop/x_0,y_271,w_1440,h_898/fill/w_900,h_680,al_c,q_82,usm_0.66_1.00_0.01,enc_avif,quality_auto/284041799_5764117473604961_6597428100485549405_n.jpg") center/cover}.book-route:before{background:url("https://static.wixstatic.com/media/e9cf4f_760335b489ba43b496e1bcb25a2e0f3d~mv2.jpg/v1/crop/x_29,y_0,w_1098,h_1445/fill/w_720,h_900,al_c,q_82,usm_0.66_1.00_0.01,enc_avif,quality_auto/18366104149024333.jpg") center/cover}
    .route-card span{width:fit-content;padding:.4rem .65rem;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);font-weight:900;font-size:.8rem;text-transform:uppercase}.route-card h2{max-width:13ch;font-size:clamp(2rem,4vw,4rem)}.route-card p{max-width:32rem;margin:0;color:rgba(255,255,255,.82)}
    .event-section{background:var(--char);color:#fff}.event-section .section-heading p{color:rgba(255,255,255,.74)}.event-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.event-grid article{min-height:15rem;padding:1.2rem;color:var(--ink);background:var(--cream);border:1px solid var(--line);border-radius:.5rem;box-shadow:0 16px 45px rgba(28,20,12,.07);transition:transform .22s ease,box-shadow .22s ease}.event-grid article:hover{transform:translateY(-.35rem);box-shadow:var(--shadow)}.event-grid span{color:var(--tomato);font-weight:850;font-size:.78rem;text-transform:uppercase}.event-grid h3{margin:.65rem 0 .5rem;font-size:1.35rem}.event-grid p{color:var(--muted)}
    .proof-showcase{display:grid;grid-template-columns:.8fr .8fr 1.4fr;gap:1rem;margin:0 0 1rem}.proof-showcase article{padding:1.1rem;border-radius:.5rem;background:var(--char);color:#fff;box-shadow:var(--shadow)}.proof-showcase span{color:var(--gold);font-weight:900;font-size:.78rem;text-transform:uppercase}.proof-showcase strong{display:block;margin:.25rem 0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.2rem,4vw,4.4rem);line-height:.95}.proof-showcase p{margin:0;color:rgba(255,255,255,.72)}
    .menu-modes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-bottom:1rem}.menu-modes article{padding:1rem;border-radius:.5rem;background:var(--char);color:#fff}.menu-modes span{display:block;margin-bottom:.35rem;color:var(--gold);font-weight:900;text-transform:uppercase;font-size:.78rem}.menu-modes p{margin:0;color:rgba(255,255,255,.74)}
    .today-details{grid-template-columns:repeat(5,minmax(0,1fr))}.mobile-sticky-find{display:none}
    @media(max-width:980px){.route-section{grid-template-columns:1fr}.event-grid,.proof-showcase{grid-template-columns:repeat(2,minmax(0,1fr))}.today-details{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:640px){.event-grid,.proof-showcase,.menu-modes,.today-details{grid-template-columns:1fr}.route-card{min-height:18rem}.mobile-sticky-find{position:fixed;z-index:12;right:1rem;bottom:1rem;display:inline-flex;align-items:center;justify-content:center;min-height:3rem;padding:.75rem 1rem;border-radius:999px;background:var(--tomato);color:#fff;font-weight:900;text-decoration:none;box-shadow:0 16px 45px rgba(185,52,36,.36)}}
  `;
  document.head.appendChild(style);
}

function ensureDesignCredit() {
  const footer = document.querySelector(".site-footer");
  if (!footer || footer.querySelector(".design-credit")) return;
  const credit = document.createElement("p");
  credit.className = "design-credit";
  credit.textContent = "Created and designed by Pete Patel.";
  footer.insertBefore(credit, footer.querySelector("a"));
}

function ensurePremiumStructure() {
  injectAuditStyles();

  const nav = document.querySelector(".nav");
  if (nav) {
    nav.innerHTML = `
      <a href="#today">Find us today</a>
      <a href="#events">Events & catering</a>
      <a href="#menu">Menu</a>
      <a href="#who">Our story</a>
      <a href="#proof">Proof</a>
      <a href="#gallery">Gallery</a>
      <a href="#instagram">Instagram</a>
    `;
  }
  const headerAction = document.querySelector(".header-action");
  if (headerAction) headerAction.textContent = "Book us";

  const heroHeading = document.querySelector(".hero h1");
  if (heroHeading) heroHeading.textContent = "Wood-fired pizza for Edinburgh streets, weddings, festivals and hungry crowds.";
  const heroText = document.querySelector(".hero-text");
  if (heroText) heroText.textContent = "Award-winning mobile pizza trucks serving slow-fermented sourdough across The Meadows, Portobello, weddings, brand activations and high-volume public events across Scotland.";
  const heroCopy = document.querySelector(".hero-copy");
  if (heroCopy && !heroCopy.querySelector(".hero-proof")) {
    const proof = document.createElement("div");
    proof.className = "hero-proof";
    proof.setAttribute("aria-label", "Wanderers Kneaded proof points");
    proof.innerHTML = "<span>3 mobile units</span><span>20k+ Instagram following</span><span>British Street Food People's Choice</span><span>4.7+ public rating</span>";
    heroCopy.insertBefore(proof, heroCopy.querySelector(".hero-actions"));
  }

  const statusPill = document.querySelector("#statusPill");
  if (statusPill && /checking/i.test(statusPill.textContent)) statusPill.textContent = "Opening soon";
  const todayLocation = document.querySelector("#todayLocation");
  if (todayLocation && /loading/i.test(todayLocation.textContent)) todayLocation.textContent = `${data.today.name} - ${data.today.address}`;
  if (!document.querySelector("#lastUpdated")) {
    const liveCard = document.querySelector(".live-card dl");
    if (liveCard) liveCard.insertAdjacentHTML("afterend", '<small class="live-updated" id="lastUpdated">Last updated today</small>');
  }

  const hero = document.querySelector(".hero");
  if (hero && !document.querySelector(".route-section")) {
    hero.insertAdjacentHTML("afterend", `
      <section class="section route-section" aria-label="Choose what you need">
        <a class="route-card find-route reveal" href="#today"><span>Find the van today</span><h2>Hungry now? Get the live location, opening times and map.</h2><p>The Meadows, Portobello and pop-up services should be quick to check, especially on mobile.</p></a>
        <a class="route-card book-route reveal" href="#quote"><span>Book us for an event</span><h2>Planning a wedding, festival, brand event or staff party?</h2><p>Tell us where to park the oven and we will come back with availability, options and a quote path.</p></a>
      </section>
    `);
  }

  const todayDetails = document.querySelector(".today-details");
  if (todayDetails && !document.querySelector("#nextService")) {
    todayDetails.insertAdjacentHTML("beforeend", '<article><span>Next service</span><strong id="nextService">Back tomorrow</strong></article><article><span>Last updated</span><strong id="todayUpdated">Today</strong></article>');
  }
  const todayActions = document.querySelector(".today-actions");
  if (todayActions && !todayActions.querySelector('a[href*="instagram.com"]')) todayActions.insertAdjacentHTML("beforeend", '<a class="button ghost" href="https://www.instagram.com/wandererskneaded/" target="_blank" rel="noreferrer">Check Instagram</a>');

  const proof = document.querySelector("#proof");
  if (proof && !document.querySelector("#events")) {
    proof.insertAdjacentHTML("beforebegin", `
      <section id="events" class="section event-section"><div class="section-kicker">Events & catering</div><div class="section-heading"><h2>Why event organisers book us.</h2><p>Event organisers do not just need pizza. They need reliable service, confident crews, good-looking units and food that keeps guests happy without slowing the night down.</p></div><div class="event-grid" id="eventGrid"></div></section>
    `);
  }

  const proofHeading = document.querySelector("#proof .section-heading");
  if (proofHeading) {
    const h2 = proofHeading.querySelector("h2");
    const p = proofHeading.querySelector("p");
    if (h2) h2.textContent = "Loved on the street. Trusted at events.";
    if (p) p.textContent = "From everyday queues in Edinburgh to private parties, brand events and major gatherings, Wanderers Kneaded has built its reputation on proper dough, fast service and pizza people come back for.";
    if (!proofHeading.querySelector(".proof-gallery-link")) proofHeading.insertAdjacentHTML("beforeend", '<a class="button primary proof-gallery-link" href="#gallery">View gallery</a>');
  }
  const marquee = document.querySelector("#proof .marquee");
  if (marquee && !document.querySelector(".proof-showcase")) {
    marquee.insertAdjacentHTML("afterend", '<div class="proof-showcase"><article><span>Social pull</span><strong>20k+</strong><p>Instagram following around the van, the food and the events.</p></article><article><span>Street proof</span><strong>4.7+</strong><p>Public rating strength built from fast service and proper pizza.</p></article><article><span>Trusted for</span><strong>Weddings, festivals, brands</strong><p>Mobile units and crews built for parks, venues, offices and large public events.</p></article></div>');
  }

  const whyText = document.querySelector("#why .why-layout p");
  if (whyText) whyText.textContent = "Proof is in the queue: heat from the oven, dough that has had time to develop, toppings people recognise, and the smell that pulls a crowd before the first order is called.";

  const menuSection = document.querySelector(".menu-section");
  if (menuSection) {
    menuSection.id = "menu";
    const heading = menuSection.querySelector(".section-heading h2");
    const copy = menuSection.querySelector(".section-heading p");
    if (heading) heading.textContent = "The kind of menu people actually want to eat.";
    if (copy) copy.textContent = "Menus vary by location and event, but always centre around slow-fermented sourdough, wood-fired cooking and proper toppings.";
    if (!menuSection.querySelector(".menu-modes")) {
      const grid = menuSection.querySelector("#menuGrid");
      grid?.insertAdjacentHTML("beforebegin", '<div class="menu-modes" aria-label="Menu types"><article><span>Street menu</span><p>Fast-selling favourites, veggie and vegan options, specials and slices built for public trading.</p></article><article><span>Event menu</span><p>Tailored service for weddings, corporate lunches, festivals, late-night food and brand activations.</p></article></div>');
    }
  }

  const quoteCopy = document.querySelector(".quote-copy");
  if (quoteCopy) quoteCopy.innerHTML = '<div class="section-kicker">Catering</div><h2>Tell us where to park the oven.</h2><p>Give us the basics and we will come back with availability, service options and a rough quote. No waffle. No hard sell. Just a clear next step.</p>';
  const form = document.querySelector(".quote-form");
  if (form) form.innerHTML = '<label>Name <input type="text" placeholder="Your name"></label><label>Phone <input type="tel" placeholder="Best number"></label><label>Email <input type="email" placeholder="you@example.com"></label><label>Event type <select><option>Wedding</option><option>Corporate event</option><option>Festival or public event</option><option>Private party</option></select></label><label>Event date <input type="date"></label><label>Venue or postcode <input type="text" placeholder="Edinburgh, Glasgow, Scotland..."></label><label>Guest numbers <input type="number" min="20" placeholder="150"></label><label>Indoor / outdoor <select><option>Outdoor</option><option>Indoor</option><option>Both / not sure</option></select></label><label>Power available? <select><option>Not sure</option><option>Yes</option><option>No</option></select></label><label>Service style <select><option>Evening food</option><option>Main meal</option><option>Staff lunch</option><option>Festival pitch</option><option>Brand activation</option></select></label><label>Tell us the shape of the day <textarea rows="4" placeholder="Timings, service style, dietary needs, access notes"></textarea></label><button class="button primary" type="button">Prepare quote brief</button>';

  if (!document.querySelector(".mobile-sticky-find")) document.body.insertAdjacentHTML("beforeend", '<a class="mobile-sticky-find" href="#today">Find us today</a>');
}

function ensureGalleryAndInstagramSections() {
  const proof = document.querySelector("#proof");
  const footer = document.querySelector(".site-footer");
  if (data.gallery && !document.querySelector("#gallery")) {
    const gallery = document.createElement("section");
    gallery.id = "gallery";
    gallery.className = "section gallery-section";
    gallery.innerHTML = '<div class="section-kicker">Gallery</div><div class="gallery-head"><div><h2>Trailers, food and where the fire has travelled.</h2><p>Use simple filenames in <code>assets/gallery</code>: trailer images as <code>t1.jpg</code>, <code>t2.jpg</code>, <code>t3.jpg</code>; food as <code>f1.jpg</code>, <code>f2.jpg</code>; places and past events as <code>p1.jpg</code>, <code>p2.jpg</code>. The page will show these once the files are uploaded.</p></div><a class="button primary" href="#quote">Ask about trailer hire</a></div><div class="gallery-grid" id="galleryGrid" aria-label="Trailer, food and event gallery"></div>';
    if (proof) proof.insertAdjacentElement("afterend", gallery);
    else document.body.insertBefore(gallery, footer);
  }
  if (data.instagram && !document.querySelector("#instagram")) {
    const instagram = document.createElement("section");
    instagram.id = "instagram";
    instagram.className = "section instagram-section";
    instagram.innerHTML = '<div class="section-kicker">Instagram Feed</div><div class="instagram-head"><div><h2>Live from @wandererskneaded.</h2><p>This area is reserved for the live Instagram feed. Paste a widget embed or API-powered feed markup into <code>site-data.js</code> under <code>instagram.widgetHtml</code>.</p></div><a class="button primary" href="https://www.instagram.com/wandererskneaded/" target="_blank" rel="noreferrer">Open Instagram</a></div><div class="instagram-live-slot" id="instagramLiveSlot" aria-label="Live Instagram feed area"></div>';
    const gallery = document.querySelector("#gallery");
    if (gallery) gallery.insertAdjacentElement("afterend", instagram);
    else document.body.insertBefore(instagram, footer);
  }
}

function parseTime(value, now = new Date()) {
  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date(now);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function formatDuration(ms) {
  if (ms <= 0) return "now";
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function getStatus() {
  const now = new Date();
  const open = parseTime(data.today.open, now);
  const close = parseTime(data.today.close, now);
  if (!data.today.isTradingToday) return { open: false, label: "Not trading today", timer: "At a private event or paused", next: "Paused" };
  if (now < open) return { open: false, label: "Opens today", timer: `Opens in ${formatDuration(open - now)}`, next: formatDuration(open - now) };
  if (now >= open && now < close) return { open: true, label: "Open now", timer: `Closes in ${formatDuration(close - now)}`, next: formatDuration(close - now) };
  return { open: false, label: "Closed now", timer: "Closed for today", next: "Tomorrow" };
}

function renderLiveStatus() {
  const status = getStatus();
  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" }).format(new Date());
  $("#statusPill").textContent = status.label;
  $("#statusPill").classList.toggle("is-open", status.open);
  $("#todayLocation").textContent = `${data.today.name} - ${data.today.address}`;
  $("#todayHours").textContent = `${data.today.open} - ${data.today.close}`;
  $("#countdown").textContent = status.next;
  $("#localTime").textContent = time;
  $("#todayHeadline").textContent = status.open ? `We are at ${data.today.name}` : `Find us at ${data.today.name}`;
  $("#todayNote").textContent = data.today.note;
  $("#todayAddress").textContent = data.today.address;
  $("#todayWindow").textContent = `${data.today.open} - ${data.today.close}`;
  $("#todayTimer").textContent = status.timer;
  $("#nextService").textContent = data.today.nextService || "Back tomorrow from 12:00, weather permitting";
  $("#todayUpdated").textContent = data.today.lastUpdated || `Today ${time}`;
  $("#lastUpdated").textContent = `Last updated ${data.today.lastUpdated || time}`;
  $("#mapLink").href = data.today.mapUrl;
  $("#todayMapsButton").href = data.today.mapUrl;
}

function card(template) {
  const node = document.createElement("article");
  node.innerHTML = template;
  return node;
}

function renderCollections() {
  const services = $("#serviceGrid");
  if (services) {
    services.innerHTML = "";
    data.services.forEach((item) => services.appendChild(card(`<span>${item.tag}</span><h3>${item.title}</h3><p>${item.text}</p>`)));
  }
  const events = $("#eventGrid");
  if (events) {
    events.innerHTML = "";
    eventBenefits.forEach((item) => events.appendChild(card(`<span>${item.tag}</span><h3>${item.title}</h3><p>${item.text}</p>`)));
  }
  const locations = $("#locationsStack");
  if (locations) {
    locations.innerHTML = "";
    data.locations.forEach((item) => locations.appendChild(card(`<span>${item.status}</span><h3>${item.name}</h3><p>${item.address}</p><small>${item.detail}</small>`)));
  }
  const partners = $("#partnerTrack");
  if (partners) {
    partners.innerHTML = "";
    [...data.partners, ...data.partners].forEach((partner) => {
      const pill = document.createElement("span");
      if (partner.logo) {
        const image = document.createElement("img");
        image.src = partner.logo;
        image.alt = partner.name;
        image.loading = "lazy";
        pill.appendChild(image);
      } else {
        pill.textContent = partner.name;
      }
      pill.setAttribute("aria-label", partner.name);
      partners.appendChild(pill);
    });
  }
  const proof = $("#proofGrid");
  if (proof) {
    proof.innerHTML = "";
    data.proof.forEach((item) => proof.appendChild(card(`<h3>${item.title}</h3><p>${item.text}</p>`)));
  }
  const reasons = $("#reasonList");
  if (reasons) {
    reasons.innerHTML = "";
    data.reasons.forEach((reason, index) => {
      const row = document.createElement("div");
      row.innerHTML = `<span>0${index + 1}</span><p>${reason}</p>`;
      reasons.appendChild(row);
    });
  }
  const menu = $("#menuGrid");
  if (menu) {
    menu.innerHTML = "";
    data.menu.forEach((item) => menu.appendChild(card(`<span>${item.label}</span><h3>${item.name}</h3><p>${item.ingredients}</p>`)));
  }
  const galleryGrid = $("#galleryGrid");
  if (galleryGrid && data.gallery) {
    galleryGrid.innerHTML = "";
    data.gallery.items.forEach((post) => {
      const item = document.createElement("a");
      item.href = "https://www.instagram.com/wandererskneaded/";
      item.target = "_blank";
      item.rel = "noreferrer";
      item.innerHTML = `<img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.onerror=null;this.src='${post.fallback}'"><span><small>${post.category} / ${post.code}</small>${post.title}</span>`;
      galleryGrid.appendChild(item);
    });
  }
  const instagramSlot = $("#instagramLiveSlot");
  if (instagramSlot && data.instagram) {
    instagramSlot.innerHTML = data.instagram.widgetHtml.trim() ? data.instagram.widgetHtml : `<strong>${data.instagram.handle}</strong><span>${data.instagram.fallbackText} Paste it into <code>site-data.js</code>.</span>`;
    instagramSlot.classList.toggle("has-widget", Boolean(data.instagram.widgetHtml.trim()));
  }
}

function placeGalleryNearProof() {
  const gallery = document.querySelector("#gallery");
  const instagram = document.querySelector("#instagram");
  const proof = document.querySelector("#proof");
  if (gallery && proof && proof.nextElementSibling !== gallery) proof.insertAdjacentElement("afterend", gallery);
  if (gallery && instagram && gallery.nextElementSibling !== instagram) gallery.insertAdjacentElement("afterend", instagram);
}

function setHeaderState() {
  const header = document.querySelector("[data-elevate]");
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
}

function enableReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.16 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

ensurePremiumStructure();
ensureGalleryAndInstagramSections();
ensureDesignCredit();
renderCollections();
placeGalleryNearProof();
renderLiveStatus();
enableReveal();
setHeaderState();
setInterval(renderLiveStatus, 30000);
window.addEventListener("scroll", setHeaderState, { passive: true });
