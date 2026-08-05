/** FAQ Diva Mabruro — dikelompokkan agar mudah dipindai dan tetap valid untuk FAQ structured data. */
export type FaqCategoryId =
  | "skema-porsi"
  | "pembayaran"
  | "dokumen"
  | "keberangkatan"
  | "keamanan"
  | "konsultasi";

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface FaqGroup {
  id: FaqCategoryId;
  label: string;
  intro: string;
  items: FaqItem[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "skema-porsi",
    label: "Skema porsi",
    intro: "Memahami apa yang diproses, angka awal, dan batas simulasi.",
    items: [
      {
        id: "apa-itu-porsi-haji-khusus",
        q: "Apa yang dimaksud dengan porsi Haji Khusus?",
        a: "Porsi Haji Khusus adalah tahapan pendaftaran untuk memperoleh nomor porsi melalui proses dan ketentuan yang berlaku. Prosesnya mencakup konsultasi, pemenuhan dokumen, penyelesaian DP porsi, dan konfirmasi dari penyelenggara.",
      },
      {
        id: "setoran-awal-total-dp",
        q: "Berapa setoran awal dan total DP porsi?",
        a: "Data program pada website menggunakan total DP porsi USD 5.000, terdiri dari setoran awal USD 1.000 dan sisa DP USD 4.000. Nilai rupiah mengikuti kurs dan perlu dikonfirmasi kembali sebelum pembayaran.",
      },
      {
        id: "simulasi-bukan-harga-penuh",
        q: "Apakah estimasi cicilan bulanan merupakan harga penuh Haji?",
        a: "Bukan. Estimasi bulanan pada simulator hanya menghitung cicilan sisa DP porsi USD 4.000 berdasarkan kurs dan tenor yang dipilih. Biaya program perjalanan dihitung serta dikonfirmasi secara terpisah.",
      },
    ],
  },
  {
    id: "pembayaran",
    label: "Pembayaran",
    intro: "Memisahkan DP porsi, biaya perjalanan, kurs, dan jalur pembayaran.",
    items: [
      {
        id: "bagian-yang-dicicil",
        q: "Bagian pembayaran apa yang dapat disimulasikan dengan tenor?",
        a: "Simulator menghitung sisa DP porsi USD 4.000 setelah setoran awal USD 1.000. Pilihan tenor pada website bersifat simulasi dan persetujuan skema aktual harus dikonfirmasi kepada konsultan.",
      },
      {
        id: "rekening-pembayaran",
        q: "Pembayaran dilakukan ke rekening siapa?",
        a: "Pembayaran harus diarahkan ke rekening resmi perusahaan yang disampaikan melalui kontak resmi Diva Mabruro, bukan rekening pribadi. Cocokkan nama penerima dan mintalah bukti tertulis sebelum melakukan transfer.",
      },
      {
        id: "perubahan-kurs",
        q: "Apakah nilai rupiah dapat berubah karena kurs?",
        a: "Ya. Nilai rupiah pada website merupakan simulasi berdasarkan kurs yang dipilih pengguna. Kurs pembayaran dan ketentuan final mengikuti informasi resmi pada saat transaksi.",
      },
    ],
  },
  {
    id: "dokumen",
    label: "Dokumen",
    intro: "Menyiapkan persyaratan secara bertahap tanpa menebak-nebak.",
    items: [
      {
        id: "dokumen-yang-disiapkan",
        q: "Dokumen apa saja yang perlu disiapkan?",
        a: "Daftar dokumen mengikuti tahap pendaftaran dan ketentuan yang berlaku. Konsultan akan memberikan checklist resmi agar data identitas, dokumen perjalanan, dan persyaratan pendukung dapat disiapkan dengan benar.",
      },
      {
        id: "waktu-menyiapkan-dokumen",
        q: "Kapan proses administrasi dan dokumen dimulai?",
        a: "Proses dimulai setelah kebutuhan jamaah dipetakan melalui konsultasi. Tim kemudian menjelaskan urutan dokumen, pengecekan data, dan tahapan yang perlu diselesaikan sebelum proses porsi dilanjutkan.",
      },
    ],
  },
  {
    id: "keberangkatan",
    label: "Keberangkatan",
    intro: "Memahami estimasi, kesiapan, dan kebutuhan pendampingan jamaah.",
    items: [
      {
        id: "masa-tunggu",
        q: "Berapa lama perkiraan menunggu keberangkatan?",
        a: "Masa tunggu tidak dapat dijanjikan sebagai angka tetap karena dipengaruhi nomor porsi, kuota, dan kebijakan yang berlaku. Mintalah estimasi terbaru secara tertulis saat berkonsultasi.",
      },
      {
        id: "jamaah-orang-tua",
        q: "Bagaimana jika program direncanakan untuk orang tua?",
        a: "Sampaikan kondisi kesehatan, mobilitas, kebutuhan pendamping, dan preferensi kenyamanan sejak konsultasi. Tim dapat membantu menjelaskan layanan yang tersedia, sementara keputusan medis tetap mengikuti arahan tenaga kesehatan.",
      },
    ],
  },
  {
    id: "keamanan",
    label: "Keamanan",
    intro: "Memeriksa legalitas, kontak, kantor, dan bukti pembayaran sebelum memutuskan.",
    items: [
      {
        id: "memeriksa-legalitas",
        q: "Bagaimana cara memeriksa legalitas dan informasi penyelenggara?",
        a: "Mintalah dokumen legalitas dan informasi badan usaha melalui kontak resmi, cocokkan identitas yang tercantum, dan lakukan verifikasi langsung sebelum mendaftar. Informasi terbaru perlu dikonfirmasi kepada tim Diva Mabruro.",
      },
      {
        id: "sebelum-transfer",
        q: "Apa yang perlu diperiksa sebelum melakukan pembayaran?",
        a: "Pastikan tujuan pembayaran merupakan rekening resmi perusahaan, nominal dan tahap pembayaran tertulis dengan jelas, serta Anda menerima bukti transaksi. Jangan mentransfer apabila identitas penerima atau keterangannya belum sesuai.",
      },
      {
        id: "kunjungan-kantor",
        q: "Apakah calon jamaah dapat melakukan verifikasi langsung?",
        a: "Website mencantumkan informasi kantor yang dapat digunakan sebagai rujukan awal. Atur jadwal terlebih dahulu melalui kontak resmi agar kunjungan dan pihak yang ditemui dapat dikonfirmasi.",
      },
    ],
  },
  {
    id: "konsultasi",
    label: "Konsultasi",
    intro: "Memulai percakapan tanpa harus langsung mengambil keputusan.",
    items: [
      {
        id: "proses-konsultasi",
        q: "Bagaimana proses konsultasi dimulai?",
        a: "Konsultasi dapat dimulai melalui WhatsApp dengan menyampaikan rencana keberangkatan, kebutuhan jamaah, dan kisaran skema yang ingin dipahami. Konsultan kemudian menjelaskan program, pembayaran, dokumen, dan langkah verifikasi yang relevan.",
      },
      {
        id: "konsultasi-tidak-mengikat",
        q: "Apakah konsultasi langsung mewajibkan saya mendaftar?",
        a: "Tidak. Konsultasi digunakan untuk memahami pilihan dan memeriksa informasi sebelum mengambil keputusan. Pendaftaran atau pembayaran dilakukan setelah Anda menerima penjelasan dan menyetujui ketentuannya.",
      },
    ],
  },
];

/** Dipakai oleh FAQPage structured data. Semua item tetap tersedia dalam HTML halaman. */
export const FAQS: FaqItem[] = FAQ_GROUPS.flatMap((group) => group.items);
