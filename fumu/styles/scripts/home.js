/**
 * home.js
 * Scripts for Fumu Sports Foundation Chamber — Home Page (index.html)
 * Handles: hamburger nav, localStorage visit banner, weather widget,
 *          member spotlight cards from JSON
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. HAMBURGER NAVIGATION ──
  const menuBtn = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ── 2. FOOTER: year & last modified ──
  const yearEl = document.getElementById('year');
  const modEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) modEl.textContent = 'Last modified: ' + document.lastModified;

  // ── 3. LOCALSTORAGE — visit message ──
  const visitMsgEl = document.getElementById('visit-msg');
  if (visitMsgEl) {
    const KEY = 'fumuLastVisit';
    const now = Date.now();
    const last = localStorage.getItem(KEY);

    if (!last) {
      visitMsgEl.innerHTML = '👋 <strong>Welcome!</strong> This is your first visit — glad you are here.';
    } else {
      const days = Math.floor((now - parseInt(last, 10)) / 86400000);
      if (days < 1) {
        visitMsgEl.innerHTML = '🌟 <strong>Back so soon!</strong> Great to see you again today.';
      } else if (days === 1) {
        visitMsgEl.innerHTML = '✅ <strong>Welcome back!</strong> You last visited <em>1 day ago</em>.';
      } else {
        visitMsgEl.innerHTML = `✅ <strong>Welcome back!</strong> You last visited <em>${days} days ago</em>.`;
      }
    }
    localStorage.setItem(KEY, String(now));
  }

  // ── 4. WEATHER WIDGET ──
  // Replace YOUR_API_KEY with your OpenWeatherMap API key
  // Location: Kampala, Uganda  (lat: 0.3163, lon: 32.5822)
  const WEATHER_API_KEY = 'YOUR_API_KEY';
  const LAT = 0.3163;
  const LON = 32.5822;
  const weatherEl = document.getElementById('weather-widget');

  if (weatherEl && WEATHER_API_KEY !== 'YOUR_API_KEY') {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${WEATHER_API_KEY}&units=metric`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        const temp = Math.round(data.main.temp);
        const feels = Math.round(data.main.feels_like);
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;
        const humidity = data.main.humidity;
        const speed = data.wind.speed;
        weatherEl.innerHTML = `
          <img
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="${desc}"
            width="60" height="60"
          />
          <div class="weather-info">
            <p class="weather-temp">${temp}°C <span>Feels like ${feels}°C</span></p>
            <p class="weather-desc">${desc}</p>
            <p class="weather-detail">Humidity: ${humidity}% &nbsp;|&nbsp; Wind: ${speed} m/s</p>
            <p class="weather-loc">📍 Kampala, Uganda</p>
          </div>
        `;
      })
      .catch(() => {
        weatherEl.textContent = 'Weather data unavailable.';
      });
  } else if (weatherEl) {
    weatherEl.textContent = 'Add your OpenWeatherMap API key in home.js to enable weather.';
  }

  // ── 5. SPOTLIGHT CARDS from members.json ──
  const spotlightGrid = document.getElementById('spotlight-grid');
  if (spotlightGrid) {
    fetch('data/members.json')
      .then(r => r.json())
      .then(members => {
        // Filter gold (level 3) or silver (level 2) members
        const eligible = members.filter(m => m.membershipLevel >= 2);
        // Pick 3 random ones
        const shuffled = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);
        spotlightGrid.innerHTML = '';
        shuffled.forEach(m => {
          const card = document.createElement('article');
          card.className = 'spotlight-card';
          const level = m.membershipLevel || 1;
          const imgTag = m.image ? `<img src="${encodeURI('images/' + m.image)}" alt="${m.name} logo" width="80" height="80" loading="lazy" />` : '';
          const websiteHref = m.website || '#';
          const websiteLabel = m.website ? 'Visit Website' : '';
          card.innerHTML = `
            ${imgTag}
            <h3>${m.name}</h3>
            <p class="spotlight-tag">${level === 3 ? '🥇 Gold' : level === 2 ? '🥈 Silver' : '🥉 Bronze'} Member</p>
            <p>${m.address || ''}</p>
            <p>${m.phone ? `<a href="tel:${m.phone}">${m.phone}</a>` : ''}</p>
            ${websiteLabel ? `<a href="${websiteHref}" target="_blank" rel="noopener">${websiteLabel}</a>` : ''}
          `;
          spotlightGrid.appendChild(card);
        });
      })
      .catch(err => console.error('Spotlight load error:', err));
  }

});
