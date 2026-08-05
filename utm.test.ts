import { describe, it, expect } from "vitest";
import { parseUtm } from "../lib/utm";

describe("parseUtm", () => {
  it("membaca parameter utm dari query string", () => {
    const u = parseUtm("?utm_source=meta&utm_medium=cpc&utm_campaign=haji1448&utm_content=v1", "https://x.id/?a");
    expect(u).toMatchObject({ utmSource: "meta", utmMedium: "cpc", utmCampaign: "haji1448", utmContent: "v1" });
    expect(u.landingUrl).toBe("https://x.id/?a");
  });
  it("aman tanpa utm", () => {
    expect(parseUtm("")).toEqual({ landingUrl: undefined, utmSource: undefined, utmMedium: undefined, utmCampaign: undefined, utmContent: undefined });
  });
  it("memotong nilai terlalu panjang (anti-abuse)", () => {
    const long = "x".repeat(500);
    expect(parseUtm(`?utm_source=${long}`).utmSource!.length).toBe(120);
  });
});
