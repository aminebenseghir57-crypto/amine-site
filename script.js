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
