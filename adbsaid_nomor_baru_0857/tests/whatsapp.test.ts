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

  it("pesan umum menyebut Diva Mabruro dan asal CTA", () => {
    const msg = buildGeneralMessage("sticky_mobile");
    expect(msg).toContain("Diva Mabruro");
    expect(msg).toContain("sticky_mobile");
    expect(msg.toLowerCase()).not.toContain("thaibah");
  });
});
