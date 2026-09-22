/* Get fit with Sonia — small enhancements. The page works fully without this. */
(function () {
  'use strict';

  // Mark today's classes in the hero card and the timetable.
  var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var today = days[new Date().getDay()];
  var todays = document.querySelectorAll('[data-day="' + today + '"]');
  for (var i = 0; i < todays.length; i++) todays[i].classList.add('is-today');

  // Print button for the timetable (print styles hide everything else).
  var print = document.getElementById('print');
  if (print && typeof window.print === 'function') {
    print.hidden = false;
    print.addEventListener('click', function () { window.print(); });
  }

  // Footer year.
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Deep links to a class tab: #zumba, #keep-fit, #chair-exercise, #legs-bums-tums, #hoop-core, #line-dancing.
  function openTab() {
    var id = window.location.hash.replace('#', '');
    if (!id) return;
    var input = document.getElementById('t-' + id);
    if (!input || input.type !== 'radio') return;
    input.checked = true;
    var classes = document.getElementById('classes');
    if (classes) classes.scrollIntoView();
  }
  openTab();
  window.addEventListener('hashchange', openTab);
})();

/* Lightbox: any link with class "zoom" opens its image large, in a dialog.
   Links in the same data-group step through each other with the arrows. */
(function () {
  'use strict';
  if (typeof HTMLDialogElement !== 'function') return;
  var links = Array.prototype.slice.call(document.querySelectorAll('a.zoom'));
  if (!links.length) return;

  var dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Photo');
  var close = button('lightbox__close', 'Close');
  var prev = button('lightbox__prev', 'Previous');
  var next = button('lightbox__next', 'Next');
  var fig = document.createElement('figure');
  var img = document.createElement('img');
  var cap = document.createElement('figcaption');
  fig.appendChild(img); fig.appendChild(cap);
  dlg.appendChild(close); dlg.appendChild(prev); dlg.appendChild(fig); dlg.appendChild(next);
  document.body.appendChild(dlg);

  var group = [], index = 0, opener = null;

  function button(cls, text) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = cls; b.textContent = text;
    return b;
  }
  function groupOf(link) {
    var name = link.getAttribute('data-group') || '';
    return links.filter(function (l) { return (l.getAttribute('data-group') || '') === name; });
  }
  function show(i) {
    index = (i + group.length) % group.length;
    var link = group[index];
    var thumb = link.querySelector('img');
    var figure = link.parentNode && link.parentNode.querySelector ? link.parentNode.querySelector('figcaption') : null;
    img.src = link.getAttribute('href');
    img.alt = thumb ? thumb.alt : '';
    cap.textContent = figure ? figure.textContent : (thumb ? thumb.alt : '');
    prev.hidden = next.hidden = group.length < 2;
    if (!dlg.open) dlg.showModal();
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      opener = link;
      group = groupOf(link);
      show(group.indexOf(link));
    });
  });
  close.addEventListener('click', function () { dlg.close(); });
  prev.addEventListener('click', function () { show(index - 1); });
  next.addEventListener('click', function () { show(index + 1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' && group.length > 1) { e.preventDefault(); show(index - 1); }
    if (e.key === 'ArrowRight' && group.length > 1) { e.preventDefault(); show(index + 1); }
  });
  dlg.addEventListener('close', function () {
    img.removeAttribute('src');
    if (opener) opener.focus();
  });
})();
