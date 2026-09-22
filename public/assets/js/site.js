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

  // Deep links to a class tab: #keep-fit, #zumba, #legs-bums-tums, #stretch, #hula-hooping, #chair-exercise.
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
