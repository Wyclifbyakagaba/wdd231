const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lm = document.getElementById('lastModified');
if (lm) lm.textContent = 'Last modified: ' + document.lastModified;