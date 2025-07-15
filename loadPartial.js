function includePartial(id, url) {
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${url}`);
      return res.text();
    })
    .then(html => {
      const container = document.getElementById(id);
      if (container) container.innerHTML = html;
    })
    .catch(console.error);
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('site-header')) {
    includePartial('site-header', '/partials/header.html');
  }
  if (document.getElementById('site-footer')) {
    includePartial('site-footer', '/partials/footer.html');
  }
});
