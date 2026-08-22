async function init() {
  const res = await fetch('links.json');
  const data = await res.json();

  document.getElementById('site-title').textContent = data.siteTitle || 'Link Repository';
  document.getElementById('site-description').textContent = data.siteDescription || '';
  document.title = data.siteTitle || 'Link Repository';

  const nav = document.getElementById('section-nav');
  const content = document.getElementById('content');

  data.sections.forEach(section => {
    // Nav link
    const a = document.createElement('a');
    a.href = `#${section.id}`;
    a.textContent = section.title;
    nav.appendChild(a);

    // Section block
    const sectionEl = document.createElement('section');
    sectionEl.className = 'section';
    sectionEl.id = section.id;

    const heading = document.createElement('h2');
    heading.textContent = section.title;
    sectionEl.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'link-grid';

    section.links.forEach(link => {
      const card = document.createElement('a');
      card.className = 'link-card';
      card.href = link.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.dataset.search = (link.name + ' ' + (link.description || '')).toLowerCase();

      card.innerHTML = `
        <div class="name">${escapeHtml(link.name)}</div>
        <div class="url">${escapeHtml(link.url)}</div>
        <div class="description">${escapeHtml(link.description || '')}</div>
      `;
      grid.appendChild(card);
    });

    sectionEl.appendChild(grid);
    content.appendChild(sectionEl);
  });

  // Live filter
  document.getElementById('search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.section').forEach(sectionEl => {
      let visibleCount = 0;
      sectionEl.querySelectorAll('.link-card').forEach(card => {
        const match = card.dataset.search.includes(q);
        card.classList.toggle('hidden', !match);
        if (match) visibleCount++;
      });
      sectionEl.classList.toggle('hidden', visibleCount === 0 && q !== '');
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

init();
