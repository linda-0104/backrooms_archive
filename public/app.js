async function loadCards(collection) {
  const cards = document.getElementById('cards');
  const items = await fetch(`/api/${collection}`).then(response => response.json());
  cards.innerHTML = items.map(item => {
    const title = item.name || item.title;
    const label = item.risk || item.threat || item.classification;
    const text = item.description || item.excerpt;
    return `<article class="card"><span class="tag">${item.id}</span><span class="risk">${label}</span><h2>${title}</h2><p>${text}</p></article>`;
  }).join('');
}
