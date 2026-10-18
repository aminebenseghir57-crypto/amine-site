document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  document.getElementById('prepared-request').value = `Bonjour Le Garagiste,\nJe souhaite prendre rendez-vous pour : ${data.get('service')}.\nVéhicule : ${data.get('car')}\n${data.get('message') || ''}\nNom : ${data.get('name')}\nTéléphone : ${data.get('phone')}`;
  const result = document.getElementById('form-result');
  result.hidden = false;
  document.getElementById('copy-status').textContent = '';
  result.scrollIntoView({behavior: 'smooth', block: 'nearest'});
});
document.getElementById('copy-request').addEventListener('click', async () => {
  const request = document.getElementById('prepared-request');
  try {
    await navigator.clipboard.writeText(request.value);
    document.getElementById('copy-status').textContent = ' Demande copiée !';
  } catch {
    request.focus();
    request.select();
    document.getElementById('copy-status').textContent = ' Sélectionnez « Copier » dans votre navigateur.';
  }
});
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-nav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
  navigation.classList.remove('open');
}
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
  navigation.classList.toggle('open', !isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.querySelectorAll('[data-service]').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelector('select[name="service"]').value = card.dataset.service;
  });
});
