"use client";

import { useState } from "react";

const lessonOptions = [
  { value: "daily", label: "日常英会話" },
  { value: "business", label: "ビジネス英語・就活対策" },
  { value: "tech", label: "テック業界英語" },
  { value: "online", label: "オンラインレッスン" },
];

const timeSlots = [
  { value: "morning", label: "午前（9:00〜12:00）" },
  { value: "afternoon", label: "午後（12:00〜17:00）" },
  { value: "evening", label: "夕方〜夜（17:00〜21:00）" },
];

type DateSlot = {
  date: string;
  time: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return `${d.getMonth() + 1}/${d.getDate()}（${days[d.getDay()]}）`;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    lessonType: "",
    message: "",
  });
  const [dateSlots, setDateSlots] = useState<DateSlot[]>([
    { date: "", time: "" },
    { date: "", time: "" },
    { date: "", time: "" },
  ]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateSlotChange = (
    index: number,
    field: "date" | "time",
    value: string
  ) => {
    setDateSlots((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          dateSlots: dateSlots.filter((s) => s.date && s.time),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "送信に失敗しました。");
      }

      setStatus("success");
      setFormData({ name: "", email: "", lessonType: "", message: "" });
      setDateSlots([
        { date: "", time: "" },
        { date: "", time: "" },
        { date: "", time: "" },
      ]);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "送信に失敗しました。時間をおいて再度お試しください。"
      );
    }
  };

  if (status === "success") {
    return (
      <div className="form-success">
        <div className="success-icon">✓</div>
        <h3>送信完了しました！</h3>
        <p>
          メッセージを受け取りました。
          <br />
          24時間以内にご返信いたします。
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-secondary-form"
        >
          もう一度送信する
        </button>
      </div>
    );
  }

  const minDate = getMinDate();
  const labels = ["第1希望", "第2希望", "第3希望"];

  return (
    <div className="contact-form-wrapper">
      <div className="form-header">
        <h3>無料チャット相談</h3>
        <p>チャットでレベルや目標をヒアリングし、最適な学習プランをご提案します。</p>
      </div>

      <div className="form-body">
        {status === "error" && (
          <div className="form-error">
            <span>⚠</span> {errorMsg}
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">
              お名前 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="山田 太郎"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              メールアドレス <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="taro@example.com"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="lessonType">ご興味のあるレッスン</label>
          <select
            id="lessonType"
            name="lessonType"
            value={formData.lessonType}
            onChange={handleChange}
          >
            <option value="">選択してください</option>
            {lessonOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time Preferences */}
        <div className="form-group">
          <label>ご希望の日時</label>
          <p className="form-hint">
            候補を最大3つまでお選びください（任意）
          </p>
          <div className="date-slots">
            {dateSlots.map((slot, i) => (
              <div className="date-slot" key={i}>
                <span className="date-slot-label">{labels[i]}</span>
                <div className="date-slot-inputs">
                  <div className="date-input-wrapper">
                    <input
                      type="date"
                      value={slot.date}
                      min={minDate}
                      onChange={(e) =>
                        handleDateSlotChange(i, "date", e.target.value)
                      }
                      aria-label={`${labels[i]}の日付`}
                    />
                    {slot.date && (
                      <span className="date-preview">
                        {formatDate(slot.date)}
                      </span>
                    )}
                  </div>
                  <select
                    value={slot.time}
                    onChange={(e) =>
                      handleDateSlotChange(i, "time", e.target.value)
                    }
                    aria-label={`${labels[i]}の時間帯`}
                  >
                    <option value="">時間帯</option>
                    {timeSlots.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">
            メッセージ <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="現在の英語レベル、学習の目標、ご質問など、お気軽にお書きください。"
            rows={5}
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          className="btn-submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <span className="spinner" /> 送信中...
            </>
          ) : (
            "無料チャット相談を送信する →"
          )}
        </button>

        <p className="form-note">
          📩 24時間以内にご返信いたします。Instagramの
          <a
            href="https://www.instagram.com/japaneseflash/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @japaneseflash
          </a>
          へのDMでもOK！
        </p>
      </div>
    </div>
  );
}
