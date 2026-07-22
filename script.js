document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. LIGHTBOX / POP-UP PENTRU GALERIE FOTO
  // ==========================================
  const galleryItems = document.querySelectorAll('.g-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          // Luăm calea imaginii (src) din cardul pe care s-a apasat click
          const imageSource = img.getAttribute('src');
          
          if (imageSource) {
            lightboxImg.src = imageSource;
            lightboxImg.alt = img.alt || 'Imagine marită';
            lightbox.classList.add('open');
          }
        }
      });
    });

    // Închidere pe butonul X
    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('open');
      });
    }

    // Închidere la click în afara imaginii (pe fundalul întunecat)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
      }
    });

    // Închidere când se apasă tasta ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        lightbox.classList.remove('open');
      }
    });
  }

  // ==========================================
  // 2. FILTRARE CATEGORII GALERIE
  // ==========================================
  const galTabs = document.querySelectorAll('.gal-tabs .tab-btn');
  
  if (galTabs.length > 0) {
    galTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Schimbăm clasa activă pe butoane
        galTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-cat') === filterValue) {
            item.classList.remove('hidden-cat');
          } else {
            item.classList.add('hidden-cat');
          }
        });
      });
    });
  }

  // ==========================================
  // 3. MENIU MOBIL (BURGER MENU)
  // ==========================================
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('nav.links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Închidem meniul mobil când se dă click pe un link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 4. MODAL COMANDĂ (ORDER MODAL)
  // ==========================================
  const orderModal = document.querySelector('.order-modal');
  const orderBtns = document.querySelectorAll('.order-btn, .btn-primary');
  const orderModalClose = document.querySelector('.order-modal-close');

  if (orderModal) {
    orderBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Deschidem modalul doar dacă butonul nu este de tip submit simplu
        if (btn.tagName === 'BUTTON' || btn.classList.contains('order-btn')) {
          e.preventDefault();
          orderModal.classList.add('open');
        }
      });
    });

    if (orderModalClose) {
      orderModalClose.addEventListener('click', () => {
        orderModal.classList.remove('open');
      });
    }

    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) {
        orderModal.classList.remove('open');
      }
    });
  }

  // ==========================================
  // 5. REACȚII RECENZII (LIKE / DISLIKE)
  // ==========================================
  const revCards = document.querySelectorAll('.rev-card');

  revCards.forEach((card, index) => {
    const likeBtn = card.querySelector('.react-btn.like');
    const dislikeBtn = card.querySelector('.react-btn.dislike');
    
    if (likeBtn && dislikeBtn) {
      // Cheie unică în memoria browserului pentru fiecare card
      const storageKey = `voted_recenzie_${index}`;
      const savedVote = localStorage.getItem(storageKey);

      // Verificăm dacă utilizatorul a votat deja această recenzie în trecut
      if (savedVote) {
        likeBtn.disabled = true;
        dislikeBtn.disabled = true;
        
        if (savedVote === 'like') likeBtn.classList.add('active');
        if (savedVote === 'dislike') dislikeBtn.classList.add('active');
      }

      // Event Click pe butonul Like
      likeBtn.addEventListener('click', () => {
        if (!likeBtn.disabled) {
          const countSpan = likeBtn.querySelector('.count');
          if (countSpan) {
            countSpan.textContent = parseInt(countSpan.textContent || '0', 10) + 1;
          }
          
          likeBtn.classList.add('active');
          likeBtn.disabled = true;
          dislikeBtn.disabled = true;

          localStorage.setItem(storageKey, 'like');
        }
      });

      // Event Click pe butonul Dislike
      dislikeBtn.addEventListener('click', () => {
        if (!dislikeBtn.disabled) {
          const countSpan = dislikeBtn.querySelector('.count');
          if (countSpan) {
            countSpan.textContent = parseInt(countSpan.textContent || '0', 10) + 1;
          }
          
          dislikeBtn.classList.add('active');
          likeBtn.disabled = true;
          dislikeBtn.disabled = true;

          localStorage.setItem(storageKey, 'dislike');
        }
      });
    }
  });

});
