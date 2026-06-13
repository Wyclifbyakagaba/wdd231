/**
 * directory.js
 * Scripts for Fumu Sports Foundation Chamber — Directory Page (directory.html)
 * Handles: member cards from JSON, grid/list toggle, search/filter
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. HAMBURGER NAV ──
  const menuBtn = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ── 2. FOOTER ──
  const yearEl = document.getElementById('year');
  const modEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) modEl.textContent = 'Last modified: ' + document.lastModified;

  // ── 3. GRID / LIST TOGGLE ──
  const gridBtn = document.getElementById('grid-view');
  const listBtn = document.getElementById('list-view');
  const container = document.getElementById('members-container');

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

  // ── 4. LOAD MEMBERS FROM JSON ──
  let allMembers = [];

  async function loadMembers() {
    try {
      const res = await fetch('data/members.json');
      if (!res.ok) throw new Error('Fetch failed');
      allMembers = await res.json();
      renderMembers(allMembers);
    } catch (err) {
      if (container) container.innerHTML = '<p class="error">Could not load member data. Please refresh.</p>';
      console.error('Directory load error:', err);
    }
  }

  function renderMembers(members) {
    if (!container) return;
    container.innerHTML = '';
    if (members.length === 0) {
      container.innerHTML = '<p class="no-results">No members found.</p>';
      return;
    }
    members.forEach(m => {
      const card = document.createElement('article');
      card.className = 'member-card';
      const level = m.membershipLevel || 1;
      card.dataset.level = level;

      const imgTag = m.image ? `<img src="${encodeURI('images/' + m.image)}" alt="${m.name} logo" width="80" height="80" loading="lazy" />` : '';
      const websiteHref = m.website || '#';
      const websiteLabel = m.website ? m.website.replace(/^https?:\/\//, '') : '';

      card.innerHTML = `
        ${imgTag}
        <div class="member-info">
          <h2>${m.name}</h2>
          <p class="member-tagline">${m.tagline || ''}</p>
          <p>📍 ${m.address || ''}</p>
          <p>📞 <a href="tel:${m.phone || ''}">${m.phone || ''}</a></p>
          ${websiteLabel ? `<p>🌐 <a href="${websiteHref}" target="_blank" rel="noopener">${websiteLabel}</a></p>` : ''}
          <span class="level-badge level-${level}">
            ${level === 3 ? '🥇 Gold' : level === 2 ? '🥈 Silver' : '🥉 Bronze'}
          </span>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // ── 5. SEARCH / FILTER ──
  const searchInput = document.getElementById('search-input');
  const filterLevel = document.getElementById('filter-level');

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const level = filterLevel ? parseInt(filterLevel.value, 10) : 0;
    const filtered = allMembers.filter(m => {
      const matchesSearch = !query ||
        m.name.toLowerCase().includes(query) ||
        (m.tagline && m.tagline.toLowerCase().includes(query)) ||
        m.address.toLowerCase().includes(query);
      const matchesLevel = !level || m.membershipLevel === level;
      return matchesSearch && matchesLevel;
    });
    renderMembers(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (filterLevel) filterLevel.addEventListener('change', applyFilters);

  // ── INIT ──
  loadMembers();

});
