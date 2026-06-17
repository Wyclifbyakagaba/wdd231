/* =====================================================================
   directory.js — Directory page behavior
   Handles: load members from JSON, grid/list toggle, search + filter
===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const container  = document.getElementById('directory-container');
  const gridBtn     = document.getElementById('grid-view-btn');
  const listBtn     = document.getElementById('list-view-btn');
  const searchInput = document.getElementById('search-input');
  const sportFilter = document.getElementById('sport-filter');

  let members = [];

  function levelLabel(level) {
    if (level === 'gold') return '🥇 Gold';
    if (level === 'silver') return '🥈 Silver';
    return '🥉 Bronze';
  }

  function render(list) {
    if (!container) return;
    if (list.length === 0) {
      container.innerHTML = '<p>No members match your search.</p>';
      return;
    }
    container.innerHTML = list.map(m => `
      <article class="member-card">
        <img src="${m.image}" alt="${m.name}" loading="lazy" width="90" height="90" />
        <span class="level-badge level-${m.level}">${levelLabel(m.level)}</span>
        <h3>${m.name}</h3>
        <p class="role">${m.role}</p>
        <p class="contact-line">📞 <a href="tel:${m.phone.replace(/\s+/g, '')}">${m.phone}</a></p>
        <p class="contact-line">✉️ <a href="mailto:${m.email}">${m.email}</a></p>
      </article>
    `).join('');
  }

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const sport = sportFilter ? sportFilter.value : '';
    const filtered = members.filter(m => {
      const matchesQuery = !query || m.name.toLowerCase().includes(query) || m.role.toLowerCase().includes(query);
      const matchesSport = !sport || m.sport === sport;
      return matchesQuery && matchesSport;
    });
    render(filtered);
  }

  // ── Grid / List toggle ──
  if (gridBtn && listBtn && container) {
    gridBtn.addEventListener('click', () => {
      container.classList.remove('list-view');
      container.classList.add('grid-view');
      gridBtn.setAttribute('aria-pressed', 'true');
      listBtn.setAttribute('aria-pressed', 'false');
    });
    listBtn.addEventListener('click', () => {
      container.classList.remove('grid-view');
      container.classList.add('list-view');
      listBtn.setAttribute('aria-pressed', 'true');
      gridBtn.setAttribute('aria-pressed', 'false');
    });
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (sportFilter) sportFilter.addEventListener('change', applyFilters);

  // ── Load data ──
  fetch('data/members.json')
    .then(res => res.json())
    .then(data => {
      members = data.directory || [];
      render(members);

      if (sportFilter) {
        const sports = [...new Set(members.map(m => m.sport))].sort();
        sportFilter.innerHTML = '<option value="">All Sports</option>' +
          sports.map(s => `<option value="${s}">${s}</option>`).join('');
      }
    })
    .catch(err => {
      if (container) container.innerHTML = '<p>Could not load directory data. Please refresh.</p>';
      console.error('Could not load members.json', err);
    });

});
