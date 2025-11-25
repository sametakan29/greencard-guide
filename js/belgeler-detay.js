// belgeler-detay.js — belgeler detay sayfası
document.addEventListener('DOMContentLoaded', () => {
  // URL parametrelerinden kullanıcı seçimlerini al
  const params = new URLSearchParams(window.location.search);
  const marital = params.get('marital');
  const children = params.get('children') === 'true';
  const education = params.get('education');
  
  // Parametreler geçerliyse belgelerini göster
  if (marital && education) {
    const docDetails = getDocumentDetails({marital, children, education});
    const resultDiv = document.getElementById('docsResult');
    if (resultDiv) {
      resultDiv.innerHTML = buildDocsDetailHtml(docDetails);
    }
  } else {
    // Parametreler eksikse geri yönlendir
    window.location.href = 'documents.html';
  }
});

// Detaylı belge bilgileri ve kurumlar
function getDocumentDetails({marital, children, education}) {
  const documentDatabase = {
    'pasaport': {
      title: 'Pasaport',
      description: 'Geçerli ve okunabilir pasaport',
      institutions: [
        { name: 'Emniyet Genel Müdürlüğü', url: 'https://www.egm.gov.tr/', phone: '' },
        { name: 'Yerel nüfus müdürlüğü', url: '', phone: '' }
      ]
    },
    'dogum': {
      title: 'Doğum Belgesi',
      description: 'Resmi doğum belgesi',
      institutions: [
        { name: 'Nüfus Müdürlüğü', url: 'https://www.nvi.gov.tr/', phone: '' },
        { name: 'E-Devlet üzerinden online', url: 'https://www.turkiye.gov.tr/', phone: '' }
      ]
    },
    'egitim': {
      title: 'Eğitim Belgeleri',
      description: 'Diploma, sertifika veya transkript',
      institutions: [
        { name: 'Mezun olduğunuz üniversitenin web sitesi', url: '', phone: '' },
        { name: 'Milli Eğitim Bakanlığı (MEB)', url: 'https://www.meb.gov.tr/', phone: '' }
      ]
    },
    'kimlik': {
      title: 'Kimlik Belgesi',
      description: 'TC Kimlik Kartı',
      institutions: [
        { name: 'Nüfus Müdürlüğü', url: 'https://www.nvi.gov.tr/', phone: '' },
        { name: 'E-Devlet üzerinden', url: 'https://www.turkiye.gov.tr/', phone: '' }
      ]
    },
    'evlilik': {
      title: 'Evlilik Belgesi',
      description: 'Resmi evlilik belgesi',
      institutions: [
        { name: 'Nüfus Müdürlüğü', url: 'https://www.nvi.gov.tr/', phone: '' },
        { name: 'E-Devlet', url: 'https://www.turkiye.gov.tr/', phone: '' }
      ]
    },
    'bosanma': {
      title: 'Boşanma Belgesi',
      description: 'Mahkeme onaylı boşanma belgesi',
      institutions: [
        { name: 'Aile Mahkemesi', url: 'https://www.adalet.gov.tr/', phone: '' },
        { name: 'Nüfus Müdürlüğü', url: 'https://www.nvi.gov.tr/', phone: '' }
      ]
    },
    'sabika': {
      title: 'Adli Sicil Belgesi',
      description: 'Sabıka kaydı belgesi',
      institutions: [
        { name: 'E-Devlet üzerinden online', url: 'https://www.turkiye.gov.tr/', phone: '' },
        { name: 'Adliye', url: 'https://www.adalet.gov.tr/', phone: '' }
      ]
    },
    'saglik': {
      title: 'Sağlık Belgeleri',
      description: 'Tıbbi muayene raporu',
      institutions: [
        { name: 'Devlet Hastanesi', url: 'https://www.saglik.gov.tr/', phone: '' },
        { name: 'Özel Hastane', url: '', phone: '' }
      ]
    },
    'asılama': {
      title: 'Aşı Belgesi',
      description: 'Aşı kayıt belgesi',
      institutions: [
        { name: 'E-Nabız sistemi', url: 'https://enabiz.gov.tr/', phone: '' },
        { name: 'Aile Sağlığı Merkezi', url: 'https://www.saglik.gov.tr/', phone: '' }
      ]
    },
    'is': {
      title: 'İş Belgeleri',
      description: 'Çalışma belgeleri ve referanslar',
      institutions: [
        { name: 'SGK Hizmet Dökümü', url: 'https://www.sgk.gov.tr/', phone: '' },
        { name: 'İşveren referans mektubu', url: '', phone: '' }
      ]
    },
    'mali': {
      title: 'Mali Belgeler',
      description: 'Banka hesap özeti',
      institutions: [
        { name: 'Bankanızın mobil uygulaması', url: '', phone: '' },
        { name: 'Banka şubesi', url: '', phone: '' }
      ]
    }
  };
  
  const selectedDocs = [];
  
  // Pasaport
  selectedDocs.push(documentDatabase['pasaport']);
  
  // Doğum belgesi
  selectedDocs.push(documentDatabase['dogum']);
  
  // Eğitim belgeleri
  selectedDocs.push(documentDatabase['egitim']);
  
  // Kimlik
  selectedDocs.push(documentDatabase['kimlik']);
  
  // Evlilik belgeleri
  if (marital === 'married') {
    selectedDocs.push(documentDatabase['evlilik']);
  }
  
  // Boşanma belgeleri
  if (marital === 'divorced') {
    selectedDocs.push(documentDatabase['bosanma']);
  }
  
  // Çocuk belgeleri
  if (children) {
    selectedDocs.push({
      title: 'Çocuk Belgeleri',
      description: 'Çocukların doğum belgeleri',
      institutions: [
        { name: 'Nüfus Müdürlüğü', url: 'https://www.nvi.gov.tr/', phone: '' },
        { name: 'E-Devlet', url: 'https://www.turkiye.gov.tr/', phone: '' }
      ]
    });
  }
  
  // Sabıka
  selectedDocs.push(documentDatabase['sabika']);
  
  // Sağlık
  selectedDocs.push(documentDatabase['saglik']);
  
  // Aşılama
  selectedDocs.push(documentDatabase['asılama']);
  
  // İş deneyimi
  selectedDocs.push(documentDatabase['is']);
  
  // Mali kaynak
  selectedDocs.push(documentDatabase['mali']);
  
  return selectedDocs;
}

function buildDocsDetailHtml(docDetails) {
  let html = '<div class="row g-4">';
  
  docDetails.forEach(doc => {
    html += '<div class="col-md-6 col-lg-4">';
    html += buildDocCard(doc);
    html += '</div>';
  });
  
  html += '</div>';
  
  return html;
}

function buildDocCard(doc) {
  let html = `
    <div class="card h-100 shadow-sm border-0">
      <div class="card-body">
        <h5 class="card-title text-primary mb-3">${escapeHtml(doc.title)}</h5>
        <p class="text-muted small mb-3">${escapeHtml(doc.description)}</p>
        
        <div class="border-top pt-3">
          <h6 class="text-secondary mb-2" style="font-size: 0.875rem;">Nereden Alınır:</h6>
  `;
  
  doc.institutions.forEach(inst => {
    html += '<div class="mb-2">';
    html += `<div class="fw-medium" style="font-size: 0.875rem;">${escapeHtml(inst.name)}</div>`;
    
    if (inst.url) {
      html += `<a href="${inst.url}" target="_blank" rel="noopener" class="text-decoration-none small">Web sitesi →</a>`;
    }
    
    html += '</div>';
  });
  
  html += `
        </div>
      </div>
    </div>
  `;
  
  return html;
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
