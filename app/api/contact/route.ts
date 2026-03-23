import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, lessonType, message, dateSlots } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "必須項目が入力されていません。" },
        { status: 400 }
      );
    }

    const lessonLabels: Record<string, string> = {
      daily: "日常英会話",
      business: "ビジネス英語・就活対策",
      tech: "テック業界英語",
      online: "オンラインレッスン",
    };

    const timeLabels: Record<string, string> = {
      morning: "午前（9:00〜12:00）",
      afternoon: "午後（12:00〜17:00）",
      evening: "夕方〜夜（17:00〜21:00）",
    };

    const lessonLabel = lessonLabels[lessonType] || lessonType || "未選択";

    // Format date slots for email
    const slots = (dateSlots || []) as { date: string; time: string }[];
    const prefLabels = ["第1希望", "第2希望", "第3希望"];
    const dateHtml = slots.length > 0
      ? slots
          .map((s: { date: string; time: string }, i: number) => {
            const d = new Date(s.date + "T00:00:00");
            const days = ["日", "月", "火", "水", "木", "金", "土"];
            const formatted = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}（${days[d.getDay()]}）`;
            const timeLabel = timeLabels[s.time] || s.time;
            return `<tr>
              <td style="padding: 12px 8px; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">${prefLabels[i]}</td>
              <td style="padding: 12px 8px; border-bottom: 1px solid #eee;">${formatted} ${timeLabel}</td>
            </tr>`;
          })
          .join("")
      : `<tr>
          <td style="padding: 12px 8px; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">希望日時</td>
          <td style="padding: 12px 8px; border-bottom: 1px solid #eee; color: #999;">未選択</td>
        </tr>`;

    // Send notification email to Hiroki
    const result = await resend.emails.send({
      from: "English Lesson LP <onboarding@resend.dev>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `【英語レッスン】${name}さんからお問い合わせ`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #c23a22; border-bottom: 2px solid #c23a22; padding-bottom: 12px;">
            新しいお問い合わせ
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 12px 8px; border-bottom: 1px solid #eee; font-weight: 600; width: 140px; color: #555;">お名前</td>
              <td style="padding: 12px 8px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 8px; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">メールアドレス</td>
              <td style="padding: 12px 8px; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}" style="color: #c23a22;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 8px; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">興味のあるレッスン</td>
              <td style="padding: 12px 8px; border-bottom: 1px solid #eee;">${lessonLabel}</td>
            </tr>
            ${dateHtml}
            <tr>
              <td style="padding: 12px 8px; font-weight: 600; color: #555; vertical-align: top;">メッセージ</td>
              <td style="padding: 12px 8px; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 13px; color: #999;">
            英語レッスンLPのお問い合わせフォームから送信されました。
          </p>
        </div>
      `,
    });

    console.log("Resend result:", JSON.stringify(result));

    // NOTE: Auto-reply to the form submitter is disabled while using onboarding@resend.dev
    // Enable this after setting up a custom domain in Resend
    // await resend.emails.send({
    //   from: "Hiroki Takaya <noreply@yourdomain.com>",
    //   to: email,
    //   subject: "お問い合わせありがとうございます / Thank you for your inquiry",
    //   ...
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 }
    );
  }
}