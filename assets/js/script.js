'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Tambahkan di bagian atas script.js Anda (setelah 'use strict';)

// EMAILJS CONFIGURATION
const EMAILJS_CONFIG = {
    publicKey: 'fj5flAOCzRXM04Xch',      // Ganti dengan public key Anda
    serviceId: 'service_fi2xr7p',      // Ganti dengan service ID
    templateId: 'template_9s3yo4e'     // Ganti dengan template ID
};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// Update bagian contact form di script.js yang sudah ada
// contact form variables - UPDATED WITH EMAILJS
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Status message functions
function createStatusMessage() {
    let statusDiv = document.getElementById('statusMessage');
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.id = 'statusMessage';
        statusDiv.style.cssText = `
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 500;
            display: none;
        `;
        form.parentNode.insertBefore(statusDiv, form);
    }
    return statusDiv;
}

function showStatus(message, type) {
    const statusDiv = createStatusMessage();
    statusDiv.innerHTML = message;
    
    if (type === 'success') {
        statusDiv.style.cssText += `
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgb(34, 197, 94);
            color: rgb(34, 197, 94);
            display: block;
        `;
    } else if (type === 'error') {
        statusDiv.style.cssText += `
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgb(239, 68, 68);
            color: rgb(239, 68, 68);
            display: block;
        `;
    }
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 5000);
}

function setLoadingState(isLoading) {
    const btnSpan = formBtn.querySelector('span');
    const btnIcon = formBtn.querySelector('ion-icon');
    
    if (isLoading) {
        formBtn.disabled = true;
        formBtn.style.opacity = '0.7';
        btnSpan.textContent = 'Sending...';
        if (btnIcon) btnIcon.style.display = 'none';
        
        // Add spinner
        let spinner = formBtn.querySelector('.spinner');
        if (!spinner) {
            spinner = document.createElement('div');
            spinner.className = 'spinner';
            spinner.style.cssText = `
                border: 2px solid transparent;
                border-top: 2px solid var(--orange-yellow-crayola);
                border-radius: 50%;
                width: 16px;
                height: 16px;
                animation: spin 1s linear infinite;
                display: inline-block;
                margin-left: 10px;
            `;
            formBtn.appendChild(spinner);
        }
    } else {
        formBtn.disabled = false;
        formBtn.style.opacity = '1';
        btnSpan.textContent = 'Send Message';
        if (btnIcon) btnIcon.style.display = 'inline-block';
        
        // Remove spinner
        const spinner = formBtn.querySelector('.spinner');
        if (spinner) spinner.remove();
    }
}

// Form validation
function validateForm() {
    const name = form.fullname.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    
    if (!name || !email || !message) {
        showStatus('Please fill in all fields!', 'error');
        return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address!', 'error');
        return false;
    }
    
    return true;
}

// Handle form submission - UPDATED
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Set loading state
    setLoadingState(true);
    
    // Prepare template parameters
    const templateParams = {
        from_name: form.fullname.value,
        from_email: form.email.value,
        message: form.message.value,
        to_name: 'Anas Wicaksono',
    };
    
    // Send email using EmailJS
    emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
    ).then(function(response) {
        console.log('Email sent successfully:', response);
        showStatus('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        
        // Reset form validation state
        formBtn.setAttribute('disabled', '');
        
    }, function(error) {
        console.error('Email send failed:', error);
        showStatus('❌ Failed to send message. Please try again or contact me directly.', 'error');
    }).finally(function() {
        setLoadingState(false);
    });
});

// Real-time form validation - UPDATED
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
        // Check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
}

// Add CSS for spinner animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// LEAFLET MAP - FIXED VERSION
let map;
let isMapInitialized = false;

function initMap() {
  // Jangan inisialisasi ulang jika sudah ada
  if (isMapInitialized) return;
  
  try {
    const campusLat = -7.276489296087012;
    const campusLng = 112.79410467606431;
    
    // Pastikan container map ada dan terlihat
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Map container not found');
      return;
    }
    
    // Inisialisasi peta
    map = L.map('map').setView([campusLat, campusLng], 15);
    
    // Tambahkan tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom icon untuk marker
    const customIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDEwYzAgNS4yNSA3IDEzIDcgMTNzNy03Ljc1IDctMTNjMC00Ljg3LTMuMTMtOC03LTh6bTAgMTFhMyAzIDAgMSAxIDAtNiAzIDMgMCAwIDEgMCA2eiIgZmlsbD0iIzY2N2VlYSIvPgo8L3N2Zz4=',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    // Tambahkan marker
    const marker = L.marker([campusLat, campusLng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center; padding: 10px;">
          <h3 style="color: #667eea; margin-bottom: 10px;">📍 Lokasi Kampus</h3>
          <p><strong>Politeknik Elektronika Negeri Surabaya</strong></p>
          <p>JOSS JISS BOLOO🤙🤙</p>
        </div>
      `);

    // Tambahkan circle
    L.circle([campusLat, campusLng], {
      color: '#667eea',
      fillColor: '#667eea',
      fillOpacity: 0.2,
      radius: 150
    }).addTo(map);

    isMapInitialized = true;
    
    // Trigger resize setelah inisialisasi
    setTimeout(() => {
      if (map) {
        map.invalidateSize();
      }
    }, 100);
    
  } catch (error) {
    console.error('Error initializing map:', error);
  }
}

// Fungsi untuk memperbaiki render peta
function fixMapRender() {
  if (!map) {
    initMap();
    return;
  }
  
  // Multiple attempts to fix map rendering
  const attempts = [100, 300, 500, 1000];
  
  attempts.forEach(delay => {
    setTimeout(() => {
      if (map) {
        map.invalidateSize();
        map.setView([-7.276489296087012, 112.79410467606431], 17);
      }
    }, delay);
  });
}

// page navigation variables - IMPROVED
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const clickedPage = this.innerHTML.toLowerCase();
    
    for (let j = 0; j < pages.length; j++) {
      if (clickedPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
        AOS.refresh(); // reset dan jalankan ulang animasi
        
        // KUNCI SOLUSI: Perbaiki map saat tab Contact diklik
        if (clickedPage === 'contact') {
          // Delay untuk memastikan CSS transition selesai
          setTimeout(() => {
            if (!isMapInitialized) {
              initMap();
            } else {
              fixMapRender();
            }
          }, 50);
        }
        
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Inisialisasi saat DOM loaded
document.addEventListener('DOMContentLoaded', function() {
  // Cek apakah halaman Contact sudah aktif saat load
  const contactArticle = document.querySelector('article[data-page="contact"]');
  
  if (contactArticle && contactArticle.classList.contains('active')) {
    // Jika halaman Contact sudah aktif saat load
    setTimeout(() => {
      initMap();
    }, 100);
  }
  
  // Event listener untuk window resize
  window.addEventListener('resize', () => {
    if (map && isMapInitialized) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  });
});

// Observer untuk memantau perubahan visibility
if (typeof IntersectionObserver !== 'undefined') {
  const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.id === 'map') {
        setTimeout(() => {
          if (!isMapInitialized) {
            initMap();
          } else if (map) {
            fixMapRender();
          }
        }, 100);
      }
    });
  }, { threshold: 0.1 });

  // Observe map container when it's available
  setTimeout(() => {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapObserver.observe(mapContainer);
    }
  }, 1000);
}

// ==== AOS INIT ====
AOS.init({
  once: false, // animasi hanya jalan sekali
  easing: 'ease-in-out',
});

// ==== GSAP INTRO ANIMATION ====
window.addEventListener("load", () => {
  const tl = gsap.timeline();

  tl.from(".avatar-box", {
    opacity: 0,
    duration: 1
  })
  .from(".info-content .name", {
    opacity: 0,
    y: 20,
    duration: 0.8
  }, "-=0.5")
  .from(".info-content .title", {
    opacity: 0,
    y: 20,
    duration: 0.8
  }, "-=0.6");
});

