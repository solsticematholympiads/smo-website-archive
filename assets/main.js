const SITE_ROOT = new URL("..", document.currentScript.src);
const fromRoot = p => new URL(p, SITE_ROOT).href;
function fixLinks(container) {
  container.querySelectorAll("a[href], img[src]").forEach(el => {
    const attr = el.hasAttribute("href") ? "href" : "src";
    const v = el.getAttribute(attr);
    if (!/^(https?:|mailto:|tel:|#|\/\/)/.test(v)) el.setAttribute(attr, fromRoot(v));
  });
}

/* ==== HEADER ==== */
fetch(fromRoot("assets/includes/header.html"))
  .then(response => response.text())
  .then(html => {
    document.getElementById("header-container").innerHTML = html;
    fixLinks(document.getElementById("header-container"));
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  });

/* ==== FOOTER ==== */
fetch(fromRoot("assets/includes/footer.html"))
  .then(response => response.text())
  .then(html => {
    document.getElementById("footer-container").innerHTML = html;
    fixLinks(document.getElementById("footer-container"));
  });

/* ==== FAQ ==== */
function toggleFAQ(e){
  document.querySelectorAll('.faq-box').forEach(b=>{
    if(b !== e) {
      b.classList.remove('open');
      b.classList.remove('closing');
    }
  });
  if (e.classList.contains('open')) {
    e.classList.add('closing');
  }
  e.classList.toggle('open');
}

/* ==== OBSERVERS ==== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));
