import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

type MetaEventBody = {
  eventName?: "ViewContent" | "Contact" | "Lead";
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  testEventCode?: string;
};

function normalizeIp(value: string | null) {
  if (!value) return undefined;
  return value.split(",")[0]?.trim();
}

export async function POST(request: NextRequest) {
  try {
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
    const datasetId = process.env.META_DATASET_ID;

    if (!accessToken || !datasetId) {
      return NextResponse.json(
        { error: "Konfigurasi Meta CAPI belum lengkap." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as MetaEventBody;

    if (!body.eventName || !body.eventSourceUrl) {
      return NextResponse.json(
        { error: "eventName dan eventSourceUrl wajib diisi." },
        { status: 400 }
      );
    }

    const eventId = body.eventId || crypto.randomUUID();
    const eventTime = Math.floor(Date.now() / 1000);

    const clientIpAddress = normalizeIp(
      request.headers.get("x-forwarded-for")
    );

    const clientUserAgent =
      request.headers.get("user-agent") || undefined;

    const userData: Record<string, string> = {};

    if (clientIpAddress) {
      userData.client_ip_address = clientIpAddress;
    }

    if (clientUserAgent) {
      userData.client_user_agent = clientUserAgent;
    }

    if (body.fbp) {
      userData.fbp = body.fbp;
    }

    if (body.fbc) {
      userData.fbc = body.fbc;
    }

    const payload: Record<string, unknown> = {
      data: [
        {
          event_name: body.eventName,
          event_time: eventTime,
          event_id: eventId,
          action_source: "website",
          event_source_url: body.eventSourceUrl,
          user_data: userData,
        },
      ],
    };

    if (body.testEventCode) {
      payload.test_event_code = body.testEventCode;
    }

    const response = await fetch(
      `https://graph.facebook.com/v23.0/${datasetId}/events?access_token=${encodeURIComponent(
        accessToken
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Meta menolak event.",
          details: result,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      eventId,
      meta: result,
    });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengirim event." },
      { status: 500 }
    );
  }
}
