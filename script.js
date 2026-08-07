// ➕ Buat variabel kosong di luar fungsi untuk menyimpan mesin timer auto-scroll
let autoScrollTimer;

// 🛠️ FUNGSI BARU: Mesin penggerak layar otomatis ke bawah perlahan
// Variabel status untuk memantau apakah auto scroll sedang aktif atau mati
let isScrolling = false;

// Fungsi penggerak layar otomatis ke bawah perlahan
function startAutoScroll() {
  clearInterval(autoScrollTimer);
  isScrolling = true; // Setel status aktif

  autoScrollTimer = setInterval(function () {
    window.scrollBy(0, 1);

    // Cek jika gulungan layar sudah mentok sampai paling dasar halaman
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      stopAutoScroll(); // Otomatis matikan total jika sudah mentok bawah
    }
  }, 30);
}

// 🛠️ FUNGSI BARU: Untuk mematikan mesin gulung layar dan meriset tombol
function stopAutoScroll() {
  clearInterval(autoScrollTimer);
  isScrolling = false; // Setel status mati

  const scrollIcon = document.getElementById("scroll-icon");
  const scrollText = document.getElementById("scroll-text");

  if (scrollIcon) scrollIcon.innerText = "▶";
  if (scrollText) scrollText.innerText = "Play";
}

// 🛠️ FUNGSI BARU: Pemicu tombol Jeda / Jalankan kembali dari Navbar
function toggleAutoScroll() {
  const scrollIcon = document.getElementById("scroll-icon");
  const scrollText = document.getElementById("scroll-text");

  if (isScrolling) {
    // Jika sedang jalan -> Matikan
    stopAutoScroll();
  } else {
    // Jika sedang mati -> Jalankan lagi
    startAutoScroll();
    if (scrollIcon) scrollIcon.innerText = "⏸";
    if (scrollText) scrollText.innerText = "Stop";
  }
}

// Fungsi tombol navigasi menu untuk loncat antar bab secara halus
function scrollToSection(sectionId) {
  // 1. Matikan dulu auto scroll sementara agar tidak bentrok saat layar meluncur
  clearInterval(autoScrollTimer);

  // 2. Luncurkan layar ke bab/section yang dituju secara halus
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }

  // 3. 🛠️ UTAMA: Jika yang diklik adalah 'home', nyalakan kembali auto scroll setelah layar sampai di atas
  if (
    (sectionId === "home",
    "main-page",
    "program",
    "story1",
    "our-moment",
    "ucapandoa",
    "gift")
  ) {
    // Tunggu 1 detik (1000ms) sampai animasi meluncur naik ke home selesai total
    setTimeout(function () {
      startAutoScroll(); // Jalankan kembali auto scroll secara otomatis

      // Kembalikan ikon navbar menjadi simbol Stop (🛑)
      const scrollIcon = document.getElementById("scroll-icon");
      const scrollText = document.getElementById("scroll-text");
      if (scrollIcon) scrollIcon.innerText = "🛑";
      if (scrollText) scrollText.innerText = "Stop";
    }, 1000);
  } else {
    // Jika yang diklik adalah menu lain (seperti Mempelai/Ayat), auto scroll tetap mati demi kenyamanan membaca
    stopAutoScroll();
  }
}

// 🛠️ FUNGSI BARU: Menyembunyikan atau memunculkan navbar ke samping kiri layar
function toggleNavbarView() {
  const mainNavbar = document.getElementById("main-navbar");
  const toggleIcon = document.querySelector(".nav-toggle-btn span");

  if (mainNavbar) {
    // Toggle class 'open-mode' untuk menarik keluar/menyembunyikan menu
    mainNavbar.classList.toggle("open-mode");

    // Ubah arah panah secara dinamis sesuai pergerakan menu
    if (mainNavbar.classList.contains("open-mode")) {
      if (toggleIcon) toggleIcon.innerText = "⟨"; // Menghadap kiri saat menu terbuka
    } else {
      if (toggleIcon) toggleIcon.innerText = "⟩"; // Menghadap kanan saat menu tersembunyi
    }
  }
}

// 🛠️ UTAMA: Atur tanggal target pernikahan Anda di bawah ini (Format: Bulan Tanggal, Tahun Jam:Menit:Detik)
const targetWeddingDate = new Date("August 04, 2027 08:00:00").getTime();

// Jalankan mesin hitung mundur setiap 1 detik (1000 milidetik)
const countdownInterval = setInterval(function () {
  // 1. Ambil waktu saat ini
  const now = new Date().getTime();

  // 2. Hitung jarak selisih antara tanggal target dengan waktu sekarang
  const difference = targetWeddingDate - now;

  // 3. Rumus matematika untuk mengubah milidetik menjadi Hari, Jam, Menit, dan Detik
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  // 4. Masukkan hasil angka ke dalam elemen HTML secara otomatis
  document.getElementById("days").innerText = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText =
    minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText =
    seconds < 10 ? "0" + seconds : seconds;

  // 5. Jika waktu hitung mundur sudah habis (Acara sudah lewat)
  if (difference < 0) {
    clearInterval(countdownInterval);
    document.querySelector(".countdown-container").innerHTML =
      "<p style='color:#f704e2; font-weight:bold; font-size:1.2rem;'>Acara Telah Berlangsung 🎉</p>";
  }
}, 1000);

// 🛠️ FUNGSI BARU: Membuka Google Maps saat tombol lokasi diklik
function bukaPeta() {
  // Cari lokasi koordinat atau alamat gedung di Google Maps, lalu paste link-nya di dalam tanda kutip bawah ini
  const urlGoogleMaps =
    "https://www.google.com/maps/place/Makassar,+Kalukuang,+Kec.+Tallo,+Kota+Makassar,+Sulawesi+Selatan/@-5.1278075,119.4264802,17z/data=!3m1!4b1!4m6!3m5!1s0x2dbefd5caec5846d:0x3b09af8836f75821!8m2!3d-5.1278075!4d119.4290551!16s%2Fg%2F11ltj9bczx?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D";

  // Perintah untuk membuka link Google Maps di tab lembaran baru agar undangan tidak tertutup
  window.open(urlGoogleMaps, "_blank");
}

// 🛠️ UTAMA: Variabel penyimpan posisi nomor foto yang sedang aktif saat ini (Mulai dari 0)
let indexFotoSekarang = 0;
let galeriAutoPlayTimer;

// ➕ 2. FUNGSI BARU: Mesin penggerak foto otomatis setiap 3 detik
function jalankanGaleriOtomatis() {
  // Bersihkan timer lama jika ada agar tidak terjadi bentrokan ganda
  clearInterval(galeriAutoPlayTimer);

  // Jalankan perintah geser ke kanan (+1) setiap 3000 milidetik (3 detik)
  galeriAutoPlayTimer = setInterval(function () {
    geserFoto(1);
  }, 3000);
}

// Sensor Pengintai Scroll Khusus untuk Rangkaian Acara di Halaman Weddings
document.addEventListener("DOMContentLoaded", function () {
  // 🛠️ PERBAIKAN UTAMA: Persempit target pencarian hanya untuk Program-item yang berada di dalam section weddings
  const semuaProgramAcara = document.querySelectorAll(
    ".weddings .Program-item",
  );

  if (semuaProgramAcara.length > 0) {
    const programObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Ketika kotak acara dilihat -> Munculkan!
            entry.target.classList.add("muncul-up");
          } else {
            // Ketika kotak acara ditinggalkan -> Sembunyikan kembali!
            entry.target.classList.remove("muncul-up");
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    // Jalankan mesin pengintai hanya pada elemen Akad, Resepsi, dan Lokasi
    semuaProgramAcara.forEach(function (program) {
      programObserver.observe(program);
    });
  }
});

// 🛠️ FUNGSI BARU: Mengintai pergerakan scroll untuk memicu animasi foto berulang-ulang
document.addEventListener("DOMContentLoaded", function () {
  const fotoStory = document.querySelector(".story-foto");

  if (fotoStory) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Ketika foto masuk ke area pandang -> Munculkan dari kiri!
            fotoStory.classList.add("muncul");
          } else {
            // Ketika foto keluar dari area pandang (di-scroll menjauh) -> Sembunyikan lagi!
            fotoStory.classList.remove("muncul");
          }
        });
      },
      {
        threshold: 0.15, // Foto akan terpicu jika minimal 15% badannya sudah mengintip di layar
      },
    );

    observer.observe(fotoStory);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fotoStory = document.querySelector(".image-text");

  if (fotoStory) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Ketika foto masuk ke area pandang -> Munculkan dari kiri!
            fotoStory.classList.add("muncul");
          } else {
            // Ketika foto keluar dari area pandang (di-scroll menjauh) -> Sembunyikan lagi!
            fotoStory.classList.remove("muncul");
          }
        });
      },
      {
        threshold: 0.15, // Foto akan terpicu jika minimal 15% badannya sudah mengintip di layar
      },
    );

    observer.observe(fotoStory);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fotoStory = document.querySelector(".image-text1");

  if (fotoStory) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Ketika foto masuk ke area pandang -> Munculkan dari kiri!
            fotoStory.classList.add("muncul");
          } else {
            // Ketika foto keluar dari area pandang (di-scroll menjauh) -> Sembunyikan lagi!
            fotoStory.classList.remove("muncul");
          }
        });
      },
      {
        threshold: 0.15, // Foto akan terpicu jika minimal 15% badannya sudah mengintip di layar
      },
    );

    observer.observe(fotoStory);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fotoStory = document.querySelector(".image-text2");

  if (fotoStory) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Ketika foto masuk ke area pandang -> Munculkan dari kiri!
            fotoStory.classList.add("muncul");
          } else {
            // Ketika foto keluar dari area pandang (di-scroll menjauh) -> Sembunyikan lagi!
            fotoStory.classList.remove("muncul");
          }
        });
      },
      {
        threshold: 0.15, // Foto akan terpicu jika minimal 15% badannya sudah mengintip di layar
      },
    );

    observer.observe(fotoStory);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fotoStory = document.querySelector(".text-kisah");

  if (fotoStory) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Ketika foto masuk ke area pandang -> Munculkan dari kiri!
            fotoStory.classList.add("muncul");
          } else {
            // Ketika foto keluar dari area pandang (di-scroll menjauh) -> Sembunyikan lagi!
            fotoStory.classList.remove("muncul");
          }
        });
      },
      {
        threshold: 0.15, // Foto akan terpicu jika minimal 15% badannya sudah mengintip di layar
      },
    );

    observer.observe(fotoStory);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fotoStory = document.querySelector(".text-kisah1");

  if (fotoStory) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Ketika foto masuk ke area pandang -> Munculkan dari kiri!
            fotoStory.classList.add("muncul");
          } else {
            // Ketika foto keluar dari area pandang (di-scroll menjauh) -> Sembunyikan lagi!
            fotoStory.classList.remove("muncul");
          }
        });
      },
      {
        threshold: 0.15, // Foto akan terpicu jika minimal 15% badannya sudah mengintip di layar
      },
    );

    observer.observe(fotoStory);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fotoStory = document.querySelector(".text-kisah2");

  if (fotoStory) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Ketika foto masuk ke area pandang -> Munculkan dari kiri!
            fotoStory.classList.add("muncul");
          } else {
            // Ketika foto keluar dari area pandang (di-scroll menjauh) -> Sembunyikan lagi!
            fotoStory.classList.remove("muncul");
          }
        });
      },
      {
        threshold: 0.15, // Foto akan terpicu jika minimal 15% badannya sudah mengintip di layar
      },
    );

    observer.observe(fotoStory);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fotoStory = document.querySelector(".mempelai-img");

  if (fotoStory) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Ketika foto masuk ke area pandang -> Munculkan dari kiri!
            fotoStory.classList.add("muncul");
          } else {
            // Ketika foto keluar dari area pandang (di-scroll menjauh) -> Sembunyikan lagi!
            fotoStory.classList.remove("muncul");
          }
        });
      },
      {
        threshold: 0.15, // Foto akan terpicu jika minimal 15% badannya sudah mengintip di layar
      },
    );

    observer.observe(fotoStory);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fotoStory = document.querySelector(".mempelai1-img");

  if (fotoStory) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Ketika foto masuk ke area pandang -> Munculkan dari kiri!
            fotoStory.classList.add("muncul");
          } else {
            // Ketika foto keluar dari area pandang (di-scroll menjauh) -> Sembunyikan lagi!
            fotoStory.classList.remove("muncul");
          }
        });
      },
      {
        threshold: 0.15, // Foto akan terpicu jika minimal 15% badannya sudah mengintip di layar
      },
    );

    observer.observe(fotoStory);
  }
});

// 🛠️ FUNGSI BARU: Animasi meluncur berantai untuk kotak input RSVP
document.addEventListener("DOMContentLoaded", function () {
  const rsvpBox = document.querySelector(".rsvp-bg-box");

  // 🛠️ PERBAIKAN: JavaScript dipaksa mencari seluruh input-group dan tombol kirim di dalam kotak pink
  const elemenAnimasi = document.querySelectorAll(
    ".rsvp-bg-box .input-group, .rsvp-bg-box .btn-send-wish",
  );

  if (rsvpBox && elemenAnimasi.length > 0) {
    const rsvpObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // ✨ SETIAP DIARAHKAN/DILIHAT: Berikan efek meluncur naik berurutan
            elemenAnimasi.forEach(function (element, indeks) {
              setTimeout(function () {
                element.classList.add("muncul-input");
              }, indeks * 180); // ⏱️ Jeda waktu 180 milidetik agar meluncur bergelombang dari atas ke bawah
            });
          } else {
            // 🔒 SETIAP DITINGGALKAN: Sembunyikan kembali ke bawah layar
            elemenAnimasi.forEach(function (element) {
              element.classList.remove("muncul-input");
            });
          }
        });
      },
      {
        threshold: 0.15, // Animasi aktif saat 15% area kotak buku tamu mulai terlihat
      },
    );

    rsvpObserver.observe(rsvpBox);
  }
});

function geserFoto(arah) {
  // 1. Ambil semua elemen foto yang terdaftar di dalam slider
  const daftarFoto = document.querySelectorAll(".slide-item");
  const totalFoto = daftarFoto.length;

  if (totalFoto === 0) return; // Jaga-jaga jika foto belum diisi

  // 2. Hilangkan class 'active' pada foto lama agar memudar hilang
  daftarFoto[indexFotoSekarang].classList.remove("active");

  // 3. Rumus matematika menghitung indeks tujuan berikutnya
  indexFotoSekarang = indexFotoSekarang + arah;

  // Jika menekan Next di foto terakhir -> Lompat kembali ke foto pertama (indeks 0)
  if (indexFotoSekarang >= totalFoto) {
    indexFotoSekarang = 0;
  }
  // Jika menekan Back di foto pertama -> Lompat langsung ke foto paling terakhir
  else if (indexFotoSekarang < 0) {
    indexFotoSekarang = totalFoto - 1;
  }

  // 4. Tambahkan kembali class 'active' pada foto baru agar memudar muncul ke panggung
  daftarFoto[indexFotoSekarang].classList.add("active");
}

function openInvitation() {
  const loadingPhoto = document.getElementById("loading-photo");
  const penutup = document.getElementById("tutup-page");
  const giftpage = document.getElementById("gift");
  const weddings = document.getElementById("program");
  const mainPage = document.getElementById("main-page");
  const FotoDecor = document.getElementById("decoration");
  const story = document.getElementById("story1");
  const moment = document.getElementById("our-moment");
  const ucapandoa = document.getElementById(".rsvp");
  const transitionImg = document.querySelector(".mempelai-transition-img");
  const btnOpen = document.querySelector(".btn-open");
  // ... (Seluruh kode pembuka halaman/animasi cover lama Anda tetap dibiarkan utuh) ...
  const backgroundMusic = document.getElementById("background-music");
  const musicBtn = document.getElementById("music-control"); // Jika kamu pakai tombol melayang

  if (backgroundMusic) {
    backgroundMusic
      .play()
      .then(() => {
        console.log("Musik berhasil diputar");
        // Ubah ikon tombol musik jika ada
        if (musicBtn) musicBtn.innerHTML = "⏸";
      })
      .catch((error) => {
        console.log("Gagal memutar musik:", error);
      });
  }

  // 1. Tombol "Open Invitation" langsung hilang seketika saat diklik
  if (btnOpen) {
    btnOpen.style.display = "none";
  }

  // 2. Langsung buka kunci halaman utama agar aktif di browser
  if (FotoDecor) {
    FotoDecor.classList.add("show-page");
    FotoDecor.scrollIntoView({ behavior: "smooth" });
  }

  if (mainPage) {
    mainPage.classList.add("show-page");
  }

  if (weddings) {
    weddings.classList.add("show-page");
  }

  if (story) {
    story.classList.add("show-page");
  }

  if (moment) {
    moment.classList.add("show-page");
  }

  if (rsvp) {
    rsvp.classList.add("show-page");
  }

  if (giftpage) {
    giftpage.classList.add("show-page");
  }

  if (penutup) {
    penutup.classList.add("show-page");
  }

  // 3. Bersamaan dengan itu, munculkan foto transisi melayang di atasnya
  if (loadingPhoto) {
    loadingPhoto.classList.add("show-flex");
    setTimeout(function () {
      loadingPhoto.style.opacity = "1";
    }, 10);
  }

  // 4. ⏱️ JEDA FOTO TAMPIL SELAMA 3 DETIK (3000 milidetik)
  setTimeout(function () {
    // PROSES PUDAR: Foto dan latar belakang melarut hilang perlahan selama 1 detik
    if (loadingPhoto) {
      loadingPhoto.style.transition = "opacity 1s ease-in-out";
      loadingPhoto.style.opacity = "0";
    }

    if (transitionImg) {
      transitionImg.style.transition =
        "opacity 1s ease-in-out, transform 1s ease-in-out";
      transitionImg.style.opacity = "0";
      transitionImg.style.transform = "scale(0.95)";
    }

    // Tunggu hingga pudar selesai total (1 detik / 1000 milidetik)
    setTimeout(function () {
      if (loadingPhoto) {
        loadingPhoto.classList.remove("show-flex");
        loadingPhoto.style.display = "none";
      }

      // 5. Munculkan Floating-navbar setelah foto hilang
      const mainNavbar = document.getElementById("main-navbar");
      if (mainNavbar) {
        mainNavbar.classList.add("show-navbar");
      }

      // 🛠️ 6. UTAMA: JALANKAN FITUR AUTO SCROLL PERLAHAN DI SINI
      startAutoScroll();
    }, 1000);
  }, 1000);
  jalankanGaleriOtomatis();
}

function kirimUcapan(event) {
  event.preventDefault();

  const namaTamu = document.getElementById("guest-name-input").value;
  const pesanTamu = document.getElementById("guest-message-input").value;

  // 🛠️ AMBIL DATA BARU: Mengambil status kehadiran dari input select
  const statusTamu = document.getElementById("guest-status-input").value;

  const wadahList = document.getElementById("wishes-display-container");

  if (!namaTamu || !pesanTamu || !statusTamu) return;

  const inisialHuruf = namaTamu.charAt(0).toUpperCase();

  // 🛠️ BERIKAN WARNA KELAS BERBEDA: Untuk membedakan gaya teks label hadir/tidak hadir
  const classBadge = statusTamu === "Hadir" ? "badge-hadir" : "badge-absen";

  const kartuUcapanBaru = document.createElement("div");
  kartuUcapanBaru.classList.add("wish-card");

  kartuUcapanBaru.innerHTML = `
        <div class="wish-profile-avatar">
            <span>${inisialHuruf}</span>
        </div>
        <div class="wish-text-content">
            <div class="wish-header-meta">
                <h4 class="wish-sender-name">${namaTamu}</h4>
                <!-- 🛠️ TAMPILKAN DI SINI: Teks kecil label kehadiran di samping/bawah nama -->
                <span class="status-badge ${classBadge}">${statusTamu}</span>
            </div>
            <p class="wish-sender-message">${pesanTamu}</p>
        </div>
    `;

  if (wadahList.firstChild) {
    wadahList.insertBefore(kartuUcapanBaru, wadahList.firstChild);
  } else {
    wadahList.appendChild(kartuUcapanBaru);
  }

  // Bersihkan form kembali ke awal
  document.getElementById("guest-name-input").value = "";
  document.getElementById("guest-message-input").value = "";
  document.getElementById("guest-status-input").value = ""; // Reset pilihan select
}

// 🛠️ FUNGSI 1: Fitur otomatis salin nomor rekening atau alamat ke memori HP/Laptop
function salinNomor(idElemen, tombol) {
  const teksTujuan = document.getElementById(idElemen).innerText;

  navigator.clipboard
    .writeText(teksTujuan)
    .then(function () {
      // Simpan teks asli tombol sebelum diubah
      const teksAsli = tombol.innerHTML;

      // Ubah tampilan tombol sesaat sebagai tanda sukses disalin
      tombol.innerHTML = "✅ Berhasil Disalin!";
      tombol.style.backgroundColor = "#000000";

      // Kembalikan tombol ke wujud semula setelah 2 detik
      setTimeout(function () {
        tombol.innerHTML = teksAsli;
        tombol.style.backgroundColor = "#f704e2";
      }, 2000);
    })
    .catch(function () {
      alert("Gagal menyalin otomatis, silakan salin manual ya!");
    });
}

// 🛠️ FUNGSI 2: Sensor Scroll Aktif Bolak-Balik Khusus untuk Kartu Amplop Hadiah
document.addEventListener("DOMContentLoaded", function () {
  const wadahGift = document.querySelector(".gift-container");
  const semuaKartuGift = document.querySelectorAll(".gift-address-card");

  if (wadahGift && semuaKartuGift.length > 0) {
    const giftObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // ✨ SETIAP DILIHAT: Meluncur naik bergantian berurutan
            semuaKartuGift.forEach(function (kartu, indeks) {
              setTimeout(function () {
                kartu.classList.add("muncul-gift");
              }, indeks * 200); // Jeda 200ms agar kartu ke-2 menyusul setelah kartu ke-1
            });
          } else {
            // 🔒 SETIAP DITINGGALKAN: Sembunyikan kembali ke bawah layar kaca
            semuaKartuGift.forEach(function (kartu) {
              kartu.classList.remove("muncul-gift");
            });
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    giftObserver.observe(wadahGift);
  }
});

// 🛠️ FUNGSI BARU: Animasi meluncur dari kanan secara berantai untuk komponen Hadiah/Gift
document.addEventListener("DOMContentLoaded", function () {
  // JavaScript mengumpulkan semua baris rekening dan kotak alamat di bawahnya
  const elemenHadiah = document.querySelectorAll(
    ".gift-row-item, .gift-address-card",
  );

  if (elemenHadiah.length > 0) {
    const giftObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // ✨ SETIAP DIARAHKAN/DILIHAT: Berikan efek meluncur dari kanan berurutan (staggered)
            elemenHadiah.forEach(function (element, indeks) {
              setTimeout(function () {
                element.classList.add("muncul-right");
              }, indeks * 150); // ⏱️ Jeda waktu 150ms antar baris agar meluncur bergantian rapi
            });
          } else {
            // 🔒 SETIAP DITINGGALKAN/DI-SCROLL JAUH: Sembunyikan kembali ke kanan luar layar
            elemenHadiah.forEach(function (element) {
              element.classList.remove("muncul-right");
            });
          }
        });
      },
      {
        threshold: 0.15, // Animasi aktif saat 15% area bab hadiah mulai mengintip di layar kaca HP
      },
    );

    // Daftarkan sensor induk ke wadah utama gift
    const giftContainer =
      document.querySelector(".gift-single-box") || elemenHadiah[0];
    if (giftContainer) {
      giftObserver.observe(giftContainer);
    }
  }
});

// 🛠️ FUNGSI BARU: Menyalin Nomor HP Pembuat secara instan saat tombol ikon diklik
function salinNomorHp(nomorHp, tombol) {
  navigator.clipboard
    .writeText(nomorHp)
    .then(function () {
      // Tampilkan teks notifikasi melayang kecil di layar
      alert("Nomor HP Pembuat (" + nomorHp + ") berhasil disalin ke memori!");

      // Efek animasi bergetar sedikit pada tombol sebagai penanda sukses
      tombol.style.transform = "scale(0.85)";
      setTimeout(function () {
        tombol.style.transform = "none";
      }, 150);
    })
    .catch(function () {
      alert("Gagal menyalin otomatis, silakan catat nomor ini: " + nomorHp);
    });
}
