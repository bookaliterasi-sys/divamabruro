import { describe, expect, it } from "vitest";
import { cicilanBulanan, setoranAwalRupiah, sisaDpRupiah, totalDpRupiah } from "../lib/simulasi";

describe("formula simulasi porsi Haji Khusus", () => {
  it("konversi dasar kurs 18.000", () => {
    expect(sisaDpRupiah(18000)).toBe(72_000_000);
    expect(setoranAwalRupiah(18000)).toBe(18_000_000);
    expect(totalDpRupiah(18000)).toBe(90_000_000);
  });

  it("cicilan per tenor", () => {
    expect(cicilanBulanan(18000, 60)).toBe(1_200_000);
    expect(cicilanBulanan(18000, 48)).toBe(1_500_000);
    expect(cicilanBulanan(18000, 36)).toBe(2_000_000);
    expect(cicilanBulanan(18000, 24)).toBe(3_000_000);
    expect(cicilanBulanan(18000, 12)).toBe(6_000_000);
  });
});
