const COPYRIGHT_TEXT = '©' + new Date().getFullYear() + ' by LOTN OPC';
document.querySelector('#copyright').innerText = COPYRIGHT_TEXT;

const footerNavContainer = document.querySelector('footer nav');

// const footerSubdomain = '';
const footerSubdomain = '/lotndayton.com';

footerNavContainer.innerHTML = `
  <ul>
  <li><a href="${footerSubdomain}/about" data-discover="true">About</a></li>
  <li><a href="${footerSubdomain}/sermons" data-discover="true">Sermons</a></li>
  <li><a href="${footerSubdomain}/ministries" data-discover="true">Ministries</a></li>
  <li><a href="${footerSubdomain}/give" data-discover="true">Give</a></li>
  <li><a href="${footerSubdomain}/visit" data-discover="true">Visit</a></li>
  </ul>`;

// Add active class to currently active link
let currentPageFooterLink = footerNavContainer.querySelector(
  'a[href="' + window.location.pathname.slice(0, -1) + '"]',
);
currentPageFooterLink?.classList.add('active');
currentPageFooterLink?.setAttribute('aria-current', 'page');
