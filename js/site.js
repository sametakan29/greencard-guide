// site.js — news loader and documents logic
document.addEventListener('DOMContentLoaded', () => {
  loadNews();
  setupDocuments();
});

function loadNews() {
  const container = document.getElementById('newsList');
  if (!container) return; // nothing to do on pages without news section
  fetch('data/news.json').then(r => {
    if (!r.ok) throw new Error('no news.json');
    return r.json();
  }).then(news => renderNews(news, container))
    .catch(() => {
      // fallback sample
      const sample = [
        {title: 'DV Lottery 2026 Başvuruları Yakında', date: '2025-10-01', body: 'Resmi tarihler için travel.state.gov adresini takip edin.'},
      ];
      renderNews(sample, container);
    });
}

function renderNews(items, container) {
  container.innerHTML = '';
  items.forEach(it => {
    const col = document.createElement('div'); col.className = 'col';
    col.innerHTML = `<div class="card h-100"><div class="card-body"><h5 class="card-title">${escapeHtml(it.title)}</h5><h6 class="card-subtitle mb-2 text-muted">${escapeHtml(it.date || '')}</h6><p class="card-text">${escapeHtml(it.body || '')}</p></div></div>`;
    container.appendChild(col);
  });
}

function setupDocuments() {
  const showBtn = document.getElementById('showDocs');
  
  if (!showBtn) return;
  
  showBtn.addEventListener('click', () => {
    const maritalEl = document.getElementById('marital');
    const educationEl = document.getElementById('education');
    const marital = maritalEl ? maritalEl.value : '';
    const education = educationEl ? educationEl.value : '';
    
    // Validation: check if user selected options
    if (!marital || !education) {
      alert('Lütfen tüm alanları doldurarak başlayınız.');
      return;
    }
    
    const childrenEl = document.getElementById('children');
    const children = childrenEl ? childrenEl.checked : false;
    
    // Parametrelerle belgeler-detay.html sayfasına yönlendir
    const params = new URLSearchParams({
      marital: marital,
      children: children,
      education: education
    });
    
    window.location.href = `belgeler-detay.html?${params.toString()}`;
  });
}

function updateChildrenField() {
  const marital = document.getElementById('marital').value;
  const childrenContainer = document.getElementById('childrenContainer');
  const children = document.getElementById('children');
  
  if (marital === 'single') {
    childrenContainer.style.display = 'none';
    children.checked = false;
  } else {
    childrenContainer.style.display = 'block';
  }
}

function buildDocsList({marital, children, education}) {
  const docs = [
    'Pasaport (geçerli ve okunabilir)',
    'Doğum belgesi (resmi, ülke kayıt ofisinden)',
    'Eğitim belgeleri (diploma, sertifika veya transkript)',
    'Kimlik belgesi fotokopisi'
  ];
  if (marital === 'married') {
    docs.push('Evlilik belgesi (resmi, Türk kayıt ofisinden)');
    docs.push('Eş adına geçerli pasaport fotokopisi');
  }
  if (marital === 'divorced') {
    docs.push('Boşanma kararı belgesi (resmi)');
    docs.push('Eski eş adına geçerli pasaport fotokopisi (varsa)');
  }
  if (children) {
    docs.push('Çocuğunuzun/çocuklarınızın resmi doğum belgeleri');
    docs.push('Çocukların geçerli pasaportları veya kimlik belgeleri fotokopisi');
  }
  if (education === 'elementary' || education === 'highschool') {
    docs.push('En az lise mezuniyet belgesi veya eşdeğeri');
  }
  docs.push('Sabıka/ceza kaydı belgesi (gerektiğinde)');
  docs.push('Sağlık belgeleri (tıbbi muayene raporu - varsa)');
  docs.push('Aşılama belgesi (COVID-19 + standart aşılar)');
  docs.push('İş deneyimi belgeleri (iş referans mektupları)');
  docs.push('Banka hesap özeti veya mali kaynak belgesi');
  return docs;
}

function listToHtml(arr) {
  return '<ul>' + arr.map(a => `<li>${escapeHtml(a)}</li>`).join('') + '</ul>';
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c] || c));
}
