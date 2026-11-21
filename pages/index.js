import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  FaArrowDown,
  FaArrowRight,
  FaBars,
  FaBriefcase,
  FaCheck,
  FaDownload,
  FaEnvelope,
  FaGraduationCap,
  FaMoon,
  FaPhoneAlt,
  FaRegCalendarAlt,
  FaSun,
  FaTimes,
} from "react-icons/fa";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const navigation = [
  { label: "Tentang", href: "#tentang" },
  { label: "Pengalaman", href: "#pengalaman" },
  { label: "Pendidikan", href: "#pendidikan" },
  { label: "Keahlian", href: "#keahlian" },
  { label: "Kontak", href: "#kontak" },
];

const skillGroups = {
  Semua: [
    { name: "Microsoft Excel", detail: "Mengolah 150+ data", category: "Administrasi" },
    { name: "Administrasi dokumen", detail: "Pengarsipan & surat-menyurat", category: "Administrasi" },
    { name: "Pengelolaan data", detail: "Input & pencatatan data", category: "Administrasi" },
    { name: "Komunikasi", detail: "Komunikasi yang baik", category: "Kolaborasi" },
    { name: "Kolaborasi tim", detail: "Terbiasa bekerja bersama tim", category: "Kolaborasi" },
    { name: "Manajemen waktu", detail: "Bekerja sesuai deadline", category: "Kolaborasi" },
  ],
  Administrasi: [
    { name: "Microsoft Excel", detail: "Mengolah 150+ data", category: "Administrasi" },
    { name: "Administrasi dokumen", detail: "Pengarsipan & surat-menyurat", category: "Administrasi" },
    { name: "Pengelolaan data", detail: "Input & pencatatan data", category: "Administrasi" },
  ],
  Kolaborasi: [
    { name: "Komunikasi", detail: "Komunikasi yang baik", category: "Kolaborasi" },
    { name: "Kolaborasi tim", detail: "Terbiasa bekerja bersama tim", category: "Kolaborasi" },
    { name: "Manajemen waktu", detail: "Bekerja sesuai deadline", category: "Kolaborasi" },
  ],
};

const experience = [
  "Membantu penginputan dan pengelolaan data perpajakan.",
  "Melakukan pengecapan kwitansi pajak serta administrasi dokumen PBB dan BPHTB.",
  "Melakukan pengambilan dan pencatatan nomor surat.",
  "Membantu menyiapkan dokumen yang diperlukan dalam proses administrasi pajak.",
  "Membantu pemisahan dokumen untuk memudahkan pengarsipan.",
];

const trainings = [
  {
    name: "Sekolah Pasar Modal",
    organizer: "PT Bursa Efek Indonesia",
    date: "Juni 2024",
    description: "Dasar pasar modal, investasi saham, dan pengelolaan keuangan.",
    number: "01",
  },
  {
    name: "Pelatihan Risk Manajemen Era 5.0",
    organizer: "SUHA Consulting Group",
    date: "Mei 2023",
    description: "Manajemen risiko operasional dan perbankan. Nilai ujian: B.",
    number: "02",
  },
];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState("Semua");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0
      );
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      revealObserver.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      revealObserver.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-page">
      <Head>
        <title>Wirza Kurnia Ananda — Portofolio</title>
        <meta
          name="description"
          content="Portofolio Wirza Kurnia Ananda, lulusan Manajemen dengan pengalaman administrasi dan pengelolaan data."
        />
        <meta name="theme-color" content="#f5f4ef" />
        <link rel="icon" href={`${basePath}/images/favicon.png`} />
      </Head>

      <div
        className="reading-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      <header className="site-header">
        <a className="brand" href="#beranda" aria-label="Wirza, kembali ke beranda">
          <span className="brand-mark">W.</span>
          <span className="brand-name">WIRZA KURNIA ANANDA</span>
        </a>

        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Navigasi utama">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#kontak" onClick={closeMenu}>
            Mari terhubung <FaArrowRight aria-hidden="true" />
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={`Aktifkan tema ${isDark ? "terang" : "gelap"}`}
            title={`Aktifkan tema ${isDark ? "terang" : "gelap"}`}
          >
            {isDark ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
          </button>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"}
          >
            {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="beranda">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> TERBUKA UNTUK PELUANG BARU</p>
              <h1>
                Halo, saya
                <br />
                <span>Wirza</span> Kurnia
                <br />
                Ananda<span className="heading-period">.</span>
              </h1>
              <p className="hero-description">
                Lulusan Manajemen yang teliti, adaptif, dan siap membantu
                pekerjaan administrasi berjalan lebih rapi.
              </p>
              <div className="hero-actions">
                <a className="button button-dark" href="#pengalaman">
                  Lihat perjalanan saya <FaArrowDown aria-hidden="true" />
                </a>
                <a
                  className="text-link"
                  href={`${basePath}/cv-wirza-kurnia-ananda.pdf`}
                  download
                >
                  Unduh CV <FaDownload aria-hidden="true" />
                </a>
              </div>
              <div className="hero-note">
                <span className="note-line" />
                <span>Berbasis di Pekanbaru, Indonesia</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="portrait-frame">
                <Image
                  src={`${basePath}/images/wirza-portrait.jpg`}
                  alt="Potret profesional Wirza Kurnia Ananda"
                  className="portrait-image"
                  fill
                  priority
                  sizes="(max-width: 760px) 90vw, 410px"
                />
                <span className="portrait-index">01 / PROFIL</span>
              </div>
              <div className="portrait-stamp" aria-hidden="true">
                <span>MANAGEMENT</span>
                <strong>+</strong>
                <span>ADMINISTRATION</span>
              </div>
              <div className="hero-caption">
                <span>Rapi dalam detail.</span>
                <span>Siap untuk langkah berikutnya.</span>
              </div>
            </div>
          </div>
          <a href="#tentang" className="scroll-cue">
            GULIR UNTUK MENGENAL SAYA <FaArrowDown aria-hidden="true" />
          </a>
        </section>

        <div className="ticker" aria-label="Manajemen, administrasi, dan pengelolaan data">
          <div className="ticker-track" aria-hidden="true">
            {[0, 1].map((item) => (
              <span className="ticker-group" key={item}>
                MANAJEMEN <i>✳</i> ADMINISTRASI <i>✳</i> PENGELOLAAN DATA <i>✳</i> KOLABORASI <i>✳</i>
              </span>
            ))}
          </div>
        </div>

        <section className="content-section about-section" id="tentang">
          <div className="section-heading reveal">
            <span className="section-kicker">01 — TENTANG SAYA</span>
            <span className="section-aside">PROFIL SINGKAT</span>
          </div>
          <div className="about-grid">
            <h2 className="about-title reveal">
              Membawa ketelitian
              <br />
              ke setiap <span>pekerjaan.</span>
            </h2>
            <div className="about-copy reveal">
              <p>
                Saya lulusan S1 Manajemen dengan IPK 3,60 dari Universitas Islam
                Negeri Sultan Syarif Kasim Riau. Pengalaman praktik kerja di
                BAPENDA Kota Pekanbaru membiasakan saya menangani administrasi,
                pengarsipan, dan penginputan data.
              </p>
              <p>
                Saya senang bekerja dengan terstruktur, berkolaborasi dengan
                tim, dan menyelesaikan tanggung jawab dengan tuntas. Saat ini
                saya siap berkembang di lingkungan kerja yang dinamis.
              </p>
              <a className="inline-link" href="#kontak">
                Kenali saya lebih jauh <FaArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="facts-row reveal">
            <div className="fact">
              <strong>3.60<span>/4.00</span></strong>
              <small>IPK SARJANA</small>
            </div>
            <div className="fact">
              <strong>150<span>+</span></strong>
              <small>DATA DIOLAH DENGAN EXCEL</small>
            </div>
            <div className="fact">
              <strong>2025</strong>
              <small>PENGALAMAN DI BAPENDA</small>
            </div>
            <div className="fact fact-location">
              <strong>Pekanbaru</strong>
              <small>RIAU, INDONESIA</small>
            </div>
          </div>
        </section>

        <section className="experience-section" id="pengalaman">
          <div className="content-section">
            <div className="section-heading reveal">
              <span className="section-kicker">02 — PENGALAMAN</span>
              <span className="section-aside">BELAJAR LEWAT PENGALAMAN</span>
            </div>
            <div className="experience-card reveal">
              <div className="experience-topline">
                <span className="experience-icon"><FaBriefcase aria-hidden="true" /></span>
                <span className="date-pill"><FaRegCalendarAlt aria-hidden="true" /> JAN — MAR 2025</span>
              </div>
              <div className="experience-main">
                <div className="experience-title">
                  <p className="eyebrow">PRAKTIK KERJA LAPANGAN</p>
                  <h2>Badan Pendapatan Daerah</h2>
                  <p className="company-line">BAPENDA Kota Pekanbaru <span>·</span> Bidang Pajak 1</p>
                </div>
                <div className="experience-details">
                  <p className="list-intro">Kontribusi dan tanggung jawab</p>
                  <ul>
                    {experience.map((item) => (
                      <li key={item}><FaCheck aria-hidden="true" /> <span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="experience-bottomline">
                <span>ADMINISTRASI PAJAK</span>
                <span>PEKANBARU, RIAU</span>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section learning-section" id="pendidikan">
          <div className="section-heading reveal">
            <span className="section-kicker">03 — PENDIDIKAN & PELATIHAN</span>
            <span className="section-aside">TERUS BERTUMBUH</span>
          </div>
          <div className="learning-grid">
            <article className="education-card reveal">
              <div className="card-overline">
                <span><FaGraduationCap aria-hidden="true" /> PENDIDIKAN</span>
                <span>2022 — 2026</span>
              </div>
              <h2>Universitas Islam Negeri Sultan Syarif Kasim Riau</h2>
              <p className="degree-name">S1 Manajemen</p>
              <div className="gpa-badge"><strong>3.60</strong><span>IPK / 4.00</span></div>
              <span className="card-watermark" aria-hidden="true">UIN</span>
            </article>
            <div className="training-column">
              <p className="training-heading reveal">PELATIHAN & SERTIFIKASI</p>
              {trainings.map((training) => (
                <article className="training-card reveal" key={training.number}>
                  <span className="training-number">{training.number}</span>
                  <div className="training-content">
                    <span className="training-date">{training.date}</span>
                    <h3>{training.name}</h3>
                    <p className="training-organizer">{training.organizer}</p>
                    <p className="training-description">{training.description}</p>
                  </div>
                  <FaArrowRight className="training-arrow" aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="skills-section" id="keahlian">
          <div className="content-section">
            <div className="section-heading reveal">
              <span className="section-kicker">04 — KEAHLIAN</span>
              <span className="section-aside">HAL YANG BISA SAYA BAWA</span>
            </div>
            <div className="skills-intro reveal">
              <h2>Terorganisir, komunikatif, <span>dan bisa diandalkan.</span></h2>
              <p>Pilih kategori untuk melihat keahlian yang relevan.</p>
            </div>
            <div className="skill-filters reveal" role="group" aria-label="Filter keahlian">
              {Object.keys(skillGroups).map((filter) => (
                <button
                  className={skillFilter === filter ? "active" : ""}
                  type="button"
                  key={filter}
                  onClick={() => setSkillFilter(filter)}
                  aria-pressed={skillFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="skills-grid" aria-live="polite">
              {skillGroups[skillFilter].map((skill, index) => (
                <article className="skill-card reveal is-visible" key={skill.name}>
                  <span className="skill-number">0{index + 1}</span>
                  <span className="skill-category">{skill.category}</span>
                  <h3>{skill.name}</h3>
                  <p>{skill.detail}</p>
                  <span className="skill-accent" aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="kontak">
          <div className="content-section contact-inner reveal">
            <div className="contact-topline">
              <span className="section-kicker">05 — KONTAK</span>
              <span className="contact-sparkle" aria-hidden="true">✳</span>
            </div>
            <p className="eyebrow">ADA PELUANG MENARIK?</p>
            <h2>Mari mulai<br />percakapan <span>baik.</span></h2>
            <p className="contact-description">
              Saya terbuka untuk berdiskusi tentang kesempatan kerja dan
              kolaborasi. Silakan hubungi saya melalui email atau telepon.
            </p>
            <a className="button button-lime" href="mailto:wirzakurnia@gmail.com">
              Hubungi saya <FaArrowRight aria-hidden="true" />
            </a>
            <div className="contact-links">
              <a href="mailto:wirzakurnia@gmail.com"><FaEnvelope aria-hidden="true" /> wirzakurnia@gmail.com</a>
              <a href="tel:+6282284361190"><FaPhoneAlt aria-hidden="true" /> 0822 8436 1190</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#beranda">W.</a>
        <span>Dibuat dengan sepenuh perhatian.</span>
        <a href="#beranda" className="back-to-top">KEMBALI KE ATAS <FaArrowDown aria-hidden="true" /></a>
        <span className="footer-year">© 2026 WIRZA KURNIA ANANDA</span>
      </footer>
    </div>
  );
};

export default Home;
