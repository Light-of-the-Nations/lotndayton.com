var acc = document.getElementsByClassName('accordion');

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      closeAccordion(this);
    } else {
      document.querySelectorAll('.accordion.active').forEach(closeAccordion);
      this.classList.add('active');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
}

function closeAccordion(accordion) {
  console.log(accordion);
  accordion.classList.remove('active');
  var panel = accordion.nextElementSibling;
  panel.style.maxHeight = null;
}
