import { describe, expect, it } from "vitest";
import { buildGeneralMessage, buildSimulationMessage } from "../lib/whatsapp";

describe("pesan WhatsApp Diva Mabruro", () => {
  it("pesan simulasi memuat data lengkap dan brand yang benar", () => {
    const msg = buildSimulationMessage(18000, 60);
    expect(msg).toContain("Diva Mabruro");
    expect(msg).toContain("Rp18.000/USD");
    expect(msg).toContain("USD 1,000");
    expect(msg).toContain("USD 4,000");
    expect(msg).toContain("60 bulan");
    expect(msg).toContain("Rp1.200.000/bulan");
    expect(msg.toLowerCase()).not.toContain("thaibah");
  });

  it("menyertakan UTM bila tersedia", () => {
    const msg = buildSimulationMessage(18000, 36, { source: "ig", medium: "cpc", campaign: "haji" });
    expect(msg).toContain("src:ig");
    expect(msg).toContain("med:cpc");
    expect(msg).toContain("cmp:haji");
  });

  it("pesan umum berbeda per CTA tanpa label internal", () => {
    const header = buildGeneralMessage("header");
    const faq = buildGeneralMessage("faq");
    expect(header).toContain("Diva Mabruro");
    expect(faq).toContain("beberapa pertanyaan");
    expect(header).not.toBe(faq);
    expect(header.toLowerCase()).not.toContain("asal:");
    expect(faq.toLowerCase()).not.toContain("asal:");
    expect(header.toLowerCase()).not.toContain("header");
  });

  it("pesan problem-to-possibility bersifat konsultatif tanpa label lokasi CTA", () => {
    const msg = buildGeneralMessage("problem_possibility");
    expect(msg).toContain("proses porsi");
    expect(msg).toContain("keamanan pembayaran");
    expect(msg.toLowerCase()).not.toContain("asal:");
    expect(msg.toLowerCase()).not.toContain("problem_possibility");
  });
  it("pesan perjalanan porsi menjelaskan enam tahap tanpa label internal", () => {
    const msg = buildGeneralMessage("journey");
    expect(msg).toContain("setoran awal USD 1.000");
    expect(msg).toContain("persyaratan dokumen");
    expect(msg).toContain("pendampingan keberangkatan");
    expect(msg.toLowerCase()).not.toContain("asal:");
    expect(msg.toLowerCase()).not.toContain("journey");
  });

});
