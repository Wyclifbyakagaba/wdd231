/* =====================================================================
   home.js — Homepage specific behavior
   Handles: localStorage visit counter, sports grid, featured athletes
===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── LOCALSTORAGE: visit counter + last visit date ──
  const countEl = document.getElementById('visit-count');
  const lastEl  = document.getElementById('last-visit');

  if (countEl && lastEl) {
    const COUNT_KEY = 'fumuVisitCount';
    const LAST_KEY  = 'fumuLastVisit';

    const prevCount = parseInt(localStorage.getItem(COUNT_KEY) || '0', 10);
    const newCount  = prevCount + 1;
    localStorage.setItem(COUNT_KEY, String(newCount));

    const prevVisit = localStorage.getItem(LAST_KEY);
    const now = new Date();

    countEl.textContent = `You have visited this site ${newCount} time${newCount === 1 ? '' : 's'}.`;

    if (!prevVisit) {
      lastEl.textContent = 'Welcome — this is your first visit!';
    } else {
      const prevDate = new Date(parseInt(prevVisit, 10));
      lastEl.textContent = `Last visit: ${prevDate.toLocaleDateString()} ${prevDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    localStorage.setItem(LAST_KEY, String(now.getTime()));
  }

  // ── SPORTS GRID + FEATURED ATHLETES from JSON ──
  const sportsGrid   = document.getElementById('sports-grid');
  const athletesGrid = document.getElementById('athletes-grid');

  const sportIcons = {
    football: '⚽', basketball: '🏀', boxing: '🥊', athletics: '🏃'
  };

  fetch('data/members.json')
    .then(res => res.json())
    .then(data => {

      if (sportsGrid && data.sports) {
        sportsGrid.innerHTML = data.sports.map(sport => `
          <a class="sport-card" href="about-us.html">
            <img src="${sport.image}" alt="${sport.alt}" loading="lazy" width="500" height="340" />
            <span class="sport-label">
              <span class="sport-icon" aria-hidden="true">${sportIcons[sport.id] || '🏅'}</span>
              <span class="name">${sport.name}</span>
            </span>
          </a>
        `).join('');
      }

      if (athletesGrid && data.athletes) {
        athletesGrid.innerHTML = data.athletes.map(a => `
          <article class="athlete-card">
            <img src="${a.image}" alt="${a.name}, ${a.sport} athlete" loading="lazy" width="300" height="300" />
            <h3>${a.name}</h3>
            <p class="sport-tag">${a.sport}</p>
          </article>
        `).join('');
      }
    })
    .catch(err => console.error('Could not load members.json', err));

});
