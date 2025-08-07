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



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

let map;

function initMap() {
  // Inisialisasi peta dengan koordinat kampus yang lebih akurat
  const campusLat = -7.275643371086998;
  const campusLng = 112.79380041044202;
  map = L.map('map').setView([campusLat, campusLng], 15);

  // Tambahkan tile layer dari OpenStreetMap
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

  // Tambahkan marker di lokasi kampus
  const marker = L.marker([campusLat, campusLng], { icon: customIcon })
    .addTo(map)
    .bindPopup(`
      <div style="text-align: center; padding: 10px;">
        <h3 style="color: #667eea; margin-bottom: 10px;">📍 Lokasi Kampus</h3>
        <p><strong>Politeknik Elektronika Negeri Surabaya</strong></p>
        <p>Koordinat: ${campusLat.toFixed(6)}, ${campusLng.toFixed(6)}</p>
      </div>
    `).openPopup();

  // Tambahkan circle untuk menunjukkan area sekitar kampus
  L.circle([campusLat, campusLng], {
    color: '#667eea',
    fillColor: '#667eea',
    fillOpacity: 0.2,
    radius: 1000
  }).addTo(map);

  // Perbaikan render peta saat tab Contact aktif
  setTimeout(() => {
    map.invalidateSize();
    map.setView([campusLat, campusLng], 15);
  }, 300);
}

// Fungsi untuk mendapatkan lokasi saat ini
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        // Pindahkan peta ke lokasi user
        map.setView([userLat, userLng], 15);
        
        // Tambahkan marker baru untuk lokasi user
        L.marker([userLat, userLng], { 
          icon: L.icon({
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDEwYzAgNS4yNSA3IDEzIDcgMTNzNy03Ljc1IDctMTNjMC00Ljg3LTMuMTMtOC03LTh6bTAgMTFhMyAzIDAgMSAxIDAtNiAzIDMgMCAwIDEgMCA2eiIgZmlsbD0iI2ZmNjM0NyIvPgo8L3N2Zz4=',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
          })
        })
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center; padding: 10px;">
            <h3 style="color: #ff6347; margin-bottom: 10px;">📍 Lokasi Anda</h3>
            <p><strong>Lat: ${userLat.toFixed(4)}</strong></p>
            <p><strong>Lng: ${userLng.toFixed(4)}</strong></p>
            <p style="font-size: 0.9em; color: #666;">Lokasi terkini Anda</p>
          </div>
        `).openPopup();
      },
      function(error) {
        alert('Tidak dapat mengakses lokasi: ' + error.message);
      }
    );
  } else {
    alert('Geolocation tidak didukung oleh browser ini');
  }
}

// Inisialisasi peta saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  // Cek apakah elemen map ada
  if (document.getElementById('map')) {
    initMap();
  }

  // Fungsi untuk memperbaiki render peta saat tab Contact aktif
  function fixMapRender() {
    setTimeout(() => {
      if (map) {
        map.invalidateSize();
        // Set ulang view ke koordinat kampus agar peta tampil benar
        map.setView([-7.275643371086998, 112.79380041044202], 15);
      }
    }, 200);
  }

  // Jika Anda menggunakan sistem navigasi berbasis tombol, tambahkan event listener untuk tombol Contact
  const contactNavBtn = document.querySelector('button[data-nav-link]:nth-child(5)');
  if (contactNavBtn) {
    contactNavBtn.addEventListener('click', () => {
      fixMapRender();
    });
  }

  // Jika halaman Contact sudah aktif saat load, panggil fixMapRender
  const contactArticle = document.querySelector('article.contact.active');
  if (contactArticle) {
    fixMapRender();
  }
});
