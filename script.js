// ==========================================
// 1. VARIABLE GLOBAL
// ==========================================
let autoScrollID = null;
let isAutoScrolling = false;
const scrollSpeed = 0.8; //

// ==========================================
// 2. INISIALISASI SAAT DOM SIAP
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Ambil nama tamu dari URL parameter (?to=NamaTamu)
  const urlParams = new URLSearchParams(window.location.search);
  const namaTamu = urlParams.get("to");

  if (namaTamu) {
    const elemenNamaTamu = document.getElementById("nama-tamu-cover");
    if (elemenNamaTamu) {
      elemenNamaTamu.innerText = namaTamu;
    }
  }

  // Bind event tombol Buka Undangan
  const btnBuka =
    document.getElementById("btn-buka") || document.querySelector(".btn-buka");
  if (btnBuka) {
    btnBuka.addEventListener("click", bukaUndangan);
  }
});

// ==========================================
// 3. FUNGSI MUSIK
// ==========================================
const bgMusic = document.getElementById("bg-music");
const btnMusik = document.getElementById("btn-musik");

function playMusic() {
  if (bgMusic) {
    bgMusic
      .play()
      .catch((err) => console.log("Autoplay diblokir browser: ", err));
    if (btnMusik) btnMusik.classList.add("play");
  }
}

function pauseMusic() {
  if (bgMusic) {
    bgMusic.pause();
    if (btnMusik) btnMusik.classList.remove("play");
  }
}

if (btnMusik) {
  btnMusik.addEventListener("click", function () {
    if (bgMusic.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });
}

// ==========================================
// 4. FUNGSI BUKA UNDANGAN
// ==========================================
function bukaUndangan() {
  // 1. Sembunyikan tombol "Buka Undangan"
  const btnBuka =
    document.getElementById("btn-buka") || document.querySelector(".btn-buka");
  if (btnBuka) {
    btnBuka.style.display = "none";
  }

  // 2. Aktifkan overflow body untuk scrolling
  document.body.style.overflow = "auto";

  // 3. Tampilkan Konten Utama
  const kontenUtama = document.getElementById("konten-utama");
  if (kontenUtama) {
    kontenUtama.classList.add("tampil");

    // Smooth scroll langsung menuju konten utama
    kontenUtama.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // 4. Tampilkan Footer Creator
  const footerCreator = document.querySelector(".footer-creator");
  if (footerCreator) {
    footerCreator.classList.add("active");
  }

  // 5. Putar Musik
  playMusic();

  // 6. Jalankan Auto Scroll
  setTimeout(() => {
    startAutoScroll();
  }, 1000);
}

// ==========================================
// 5. AUTO SCROLL CONTROLLER (TAHAN SCROLL MANUAL)
// ==========================================
function startAutoScroll() {
  if (isAutoScrolling) return;
  isAutoScrolling = true;
  updateAutoScrollIcon(true);

  function renderStep() {
    if (!isAutoScrolling) return;

    // Berhenti hanya jika sudah di bagian paling bawah
    const isBottom =
      window.innerHeight + Math.ceil(window.scrollY) >=
      document.body.offsetHeight - 5;
    if (isBottom) {
      stopAutoScroll();
      return;
    }

    // Scroll bertahap di setiap frame
    window.scrollBy(0, scrollSpeed);

    // Minta frame animasi berikutnya dari browser
    autoScrollID = requestAnimationFrame(renderStep);
  }

  autoScrollID = requestAnimationFrame(renderStep);
}

function stopAutoScroll() {
  isAutoScrolling = false;
  if (autoScrollID) {
    cancelAnimationFrame(autoScrollID);
    autoScrollID = null;
  }
  updateAutoScrollIcon(false);
}

function toggleAutoScroll() {
  if (isAutoScrolling) {
    stopAutoScroll();
  } else {
    startAutoScroll();
  }
}

function updateAutoScrollIcon(isPlaying) {
  const btnScroll = document.getElementById("btn-toggle-autoscroll");
  if (!btnScroll) return;

  if (isPlaying) {
    btnScroll.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
    btnScroll.setAttribute("title", "Pause Auto Scroll");
  } else {
    btnScroll.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
    btnScroll.setAttribute("title", "Play Auto Scroll");
  }
}

// ==========================================
// 6. NAVIGASI SCROLL TO SECTION (TOMBOL BOTTOM NAV)
// ==========================================
function scrollToSection(sectionId) {
  if (sectionId === "cover" || sectionId === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    console.warn("Elemen dengan ID '" + sectionId + "' tidak ditemukan!");
  }
}

function toggleNavMenu() {
  const bottomNav = document.getElementById("bottom-nav-container");
  if (bottomNav) {
    bottomNav.classList.toggle("hidden");
  }
}

// ==========================================
// 7. COUNTDOWN TIMER
// ==========================================
const tanggalAcara = new Date(2026, 9, 31, 8, 0, 0).getTime();

const timer = setInterval(function () {
  const sekarang = new Date().getTime();
  const selisih = tanggalAcara - sekarang;

  const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
  const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
  const detik = Math.floor((selisih % (1000 * 60)) / 1000);

  const elHari = document.getElementById("hari");
  const elJam = document.getElementById("jam");
  const elMenit = document.getElementById("menit");
  const elDetik = document.getElementById("detik");

  if (elHari) elHari.innerText = hari < 10 ? "0" + hari : hari;
  if (elJam) elJam.innerText = jam < 10 ? "0" + jam : jam;
  if (elMenit) elMenit.innerText = menit < 10 ? "0" + menit : menit;
  if (elDetik) elDetik.innerText = detik < 10 ? "0" + detik : detik;

  if (selisih < 0) {
    clearInterval(timer);
    const elCountdown = document.getElementById("countdown");
    if (elCountdown) {
      elCountdown.innerHTML =
        "<p style='font-weight: bold; color: #3b1101;'>Acara Telah Berlangsung</p>";
    }
  }
}, 1000);

// ==========================================
// 8. GALERI SLIDESHOW
// ==========================================
const daftarFoto = [
  "images/foto-pose1.jpg",
  "images/foto-pose2.jpg",
  "images/foto-pose3.jpg",
  "images/foto-pose4.jpg",
  "images/foto-pose5.jpg",
];

let indexFoto = 0;
const elemenFoto = document.getElementById("foto-galeri");

function gantiFoto() {
  if (!elemenFoto) return;
  elemenFoto.classList.remove("active");

  setTimeout(() => {
    indexFoto = (indexFoto + 1) % daftarFoto.length;
    elemenFoto.src = daftarFoto[indexFoto];
    elemenFoto.classList.add("active");
  }, 200);
}

if (elemenFoto) {
  setInterval(gantiFoto, 3000);
}

// ==========================================
// 9. FORM RSVP & GOOGLE SHEETS INTEGRATION
// ==========================================
// PASTE URL WEB APP KAMU DI SINI:
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyltoHDVJhQPoM6L3jBkkpl4giIh3Ny7nLB2bYGxahcf365Czn5ufrSM1Q3QtmpoRXSbQ/exec";

const formRSVP = document.getElementById("form-rsvp");
const listPesan = document.getElementById("list-pesan");
const totalPesan = document.getElementById("total-pesan");

// Muat semua ucapan dari Google Sheets saat halaman pertama kali dibuka
document.addEventListener("DOMContentLoaded", muatUcapan);

function muatUcapan() {
  if (!SCRIPT_URL || SCRIPT_URL === "https://script.google.com/macros/s/AKfycbyltoHDVJhQPoM6L3jBkkpl4giIh3Ny7nLB2bYGxahcf365Czn5ufrSM1Q3QtmpoRXSbQ/exec") return;

  fetch(SCRIPT_URL)
    .then((res) => res.json())
    .then((data) => {
      if (listPesan) listPesan.innerHTML = "";
      if (totalPesan) totalPesan.innerText = data.length;

      // Tampilkan data dari Google Sheets
      data.reverse().forEach((item) => {
        tambahElemenPesan(item.nama, item.status, item.pesan);
      });
    })
    .catch((err) => console.error("Gagal memuat data ucapan:", err));
}

if (formRSVP) {
  formRSVP.addEventListener("submit", function (e) {
    e.preventDefault();

    const btnSubmit = formRSVP.querySelector("button[type='submit']");
    const teksAsli = btnSubmit.innerText;

    // Ubah teks tombol saat proses mengirim
    btnSubmit.innerText = "Mengirim...";
    btnSubmit.disabled = true;

    const nama = document.getElementById("nama-tamu").value;
    const status = document.getElementById("status-kehadiran").value;
    const pesan = document.getElementById("pesan-ucapan").value;

    const payload = { nama, status, pesan };

    // Kirim data ke Google Sheets
    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        // Tampilkan pesan baru di bagian paling atas
        tambahElemenPesan(nama, status, pesan);

        // Update jumlah counter ucapan
        if (totalPesan) {
          totalPesan.innerText = parseInt(totalPesan.innerText || 0) + 1;
        }

        formRSVP.reset();
      })
      .catch((err) => {
        alert("Gagal mengirim ucapan, silakan coba lagi!");
        console.error("Error:", err);
      })
      .finally(() => {
        btnSubmit.innerText = teksAsli;
        btnSubmit.disabled = false;
      });
  });
}

function tambahElemenPesan(nama, status, pesan) {
  let statusClass = "status-hadir";
  if (status === "Tidak Hadir") statusClass = "status-tidak-hadir";
  else if (status === "Ragu-ragu") statusClass = "status-ragu";

  const itemBaru = document.createElement("div");
  itemBaru.className = "item-pesan";
  itemBaru.innerHTML = `
    <div class="header-pesan">
      <span class="nama-pengirim">${nama}</span>
      <span class="badge-status ${statusClass}">${status}</span>
    </div>
    <p class="isi-pesan">${pesan}</p>
  `;

  if (listPesan) {
    listPesan.insertBefore(itemBaru, listPesan.firstChild);
  }
}

function salinRekening(elementId, btnElement) {
  const el = document.getElementById(elementId);
  if (!el) return;

  navigator.clipboard.writeText(el.innerText).then(() => {
    const teksAsli = btnElement.innerText;
    btnElement.innerText = "Tersalin!";
    btnElement.classList.add("berhasil");

    setTimeout(() => {
      btnElement.innerText = teksAsli;
      btnElement.classList.remove("berhasil");
    }, 2000);
  });
}
