"use client";
import { useEffect } from "react";
import { captureUtm } from "@/lib/utm";
import { track } from "@/lib/analytics";

export default function AnalyticsBeacon() {
  useEffect(() => {
    captureUtm();
    track("page_view", { page: "landing" });
  }, []);
  return null;
}
