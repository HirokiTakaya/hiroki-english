"use client";

import { useEffect, useRef } from "react";
import ContactForm from "./components/ContactForm";

function FaqItem({ q, a }: { q: string; a: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="faq-item reveal" ref={ref}>
      <button
        className="faq-q"
        onClick={() => ref.current?.classList.toggle("open")}
      >
        {q}
        <span className="faq-toggle">+</span>
      </button>
      <div className="faq-a">{a}</div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* NAVIGATION */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="logo">
            Hiroki<span>.</span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="#why">選ばれる理由</a>
            </li>
            <li>
              <a href="#philosophy">僕の考え</a>
            </li>
            <li>
              <a href="#lessons">レッスン内容</a>
            </li>
            <li>
              <a href="#flow">レッスンの流れ</a>
            </li>
            <li>
              <a href="#pricing">料金</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#contact" className="nav-cta">
                無料チャット相談
              </a>
            </li>
          </ul>
          <button className="hamburger" aria-label="メニュー">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-tag fade-up">Vancouver, Canada</div>
              <h1 className="fade-up-d1">
                カナダで<em>通じる</em>
                <br />
                英語を、一緒に。
              </h1>
              <p className="hero-sub fade-up-d2">
                バンクーバー在住のバイリンガル講師が、
                <br />
                あなたの「伝わらない」を「伝わる」に変えます。
                <br />
                対面・オンライン対応。日本語での説明OK。
              </p>
              <div className="hero-actions fade-up-d3">
                <a href="#contact" className="btn-primary">
                  無料チャット相談する →
                </a>
                <a href="#lessons" className="btn-secondary">
                  レッスン詳細
                </a>
              </div>
            </div>
            <div className="hero-visual fade-up-d2">
              <div className="hero-card">
                <div className="floating-badge badge-top">
                  <div className="badge-icon green">🇨🇦</div>
                  ローカル組織に現地就職
                </div>
                <div className="floating-badge badge-bottom">
                  <div className="badge-icon blue">🗣</div>
                  日本語OK
                </div>
                <div className="profile-img">
                  <img src="/hiroki.jpg" alt="Hiroki Takaya" />
                </div>
                <h3>Hiroki Takaya</h3>
                <p className="subtitle">
                  English Coach / Vancouver, BC
                </p>
                <div className="stat-row">
                  <div className="stat">
                    <span className="stat-num">💻</span>
                    <span className="stat-label">エンジニア経験</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">🥋</span>
                    <span className="stat-label">柔術指導経験</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">📜</span>
                    <span className="stat-label">教員免許</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ME */}
      <section className="why-section" id="why">
        <div className="container">
          <div className="reveal">
            <div className="section-tag">Why Hiroki</div>
            <h2 className="section-title">
              「英語の先生」じゃない。
              <br />
              カナダを生きてきた人間です。
            </h2>
            <p className="section-desc">
              テキストの英語ではなく、カナダの職場・生活で毎日使っているリアルな英語を教えます。
            </p>
          </div>
          <div className="why-grid">
            <div className="why-card reveal">
              <div className="why-icon">🇨🇦</div>
              <h3>ローカル企業にエンジニアとして就職し、柔術を教えてきた</h3>
              <p>
                バンクーバーでカナダのローカル企業にエンジニアとして就職。柔術のインストラクターとしてカナダ人の生徒たちにも英語で指導。職場の英語も、人に教える英語も、両方の経験があります。
              </p>
            </div>
            <div className="why-card reveal">
              <div className="why-icon">🥋</div>
              <h3>カナダ人に英語で「教える」プロ</h3>
              <p>
                柔術のインストラクターとして、カナダ人の生徒たちに英語で指導してきました。伝わらなければ技も伝わらない。英語で「教える」ことの難しさと楽しさを知っています。
              </p>
            </div>
            <div className="why-card reveal">
              <div className="why-icon">📚</div>
              <h3>中学・高校の教員免許保持</h3>
              <p>
                教員免許を持ち、日本でESLコーチとして英語を教えてきた経験があります。日本人がつまずくポイントを熟知。「なんとなく教えられる人」ではなく、教えるための訓練を受けた人間です。
              </p>
            </div>
            <div className="why-card reveal">
              <div className="why-icon">🇯🇵</div>
              <h3>ネイティブじゃないから、わかる</h3>
              <p>
                僕自身、英語のネイティブではありません。だからこそ、日本人が「なぜ英語が出てこないか」が手に取るようにわかる。同じ道を通ってきた人間が、日本語で丁寧にガイドします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY — Anti-myth + Scarcity */}
      <section id="philosophy" className="philosophy-section">
        <div className="container">
          <div className="philosophy-grid">
            {/* Left: Myth-busting */}
            <div className="philosophy-main reveal">
              <div className="section-tag">My Philosophy</div>
              <h2 className="section-title">
                「3ヶ月でペラペラ」は、<br />
                <em>嘘</em>です。
              </h2>
              <div className="philosophy-body">
                <p>
                  正直に言います。3ヶ月で英語がペラペラになる方法なんて存在しません。
                  もしそんなことが可能なら、世界中の語学学校はとっくに潰れています。
                </p>
                <p>
                  言語習得には時間がかかります。近道はありません。
                  でも、<strong>遠回り</strong>をする必要もない。
                </p>
                <p>
                  僕がやるのは、あなたの「今」に合った、最も効率的なルートを一緒に見つけること。
                  カナダの職場や日常で実際に使われる英語に絞って、
                  必要なことだけを、正しい順番で、徹底的にやります。
                </p>
                <p>
                  魔法のメソッドは売りません。<br />
                  地道な努力を、最短距離にする手伝いをします。
                </p>
              </div>
            </div>

            {/* Right: Scarcity card */}
            <div className="philosophy-side reveal">
              <div className="scarcity-card">
                <div className="scarcity-icon">1</div>
                <div className="scarcity-label">週 / 名</div>
                <div className="scarcity-divider"></div>
                <h3>担当できる生徒は<br />週に1人だけ。</h3>
                <p>
                  一人ひとりに全力で向き合うために、
                  担当できる生徒は<strong>週1名</strong>に限定しています。
                </p>
                <p>
                  テンプレの授業はやりません。
                  あなたの仕事、生活、目標に合わせて毎回のレッスンを準備します。
                  だからこそ、この人数が限界です。
                </p>
                <div className="scarcity-note">
                  ※ 現在枠が埋まっている場合はウェイトリストでご案内します
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LESSON TYPES */}
      <section id="lessons">
        <div className="container">
          <div className="reveal">
            <div className="section-tag">Lessons</div>
            <h2 className="section-title">あなたに合ったレッスンを。</h2>
            <p className="section-desc">
              目的に合わせて内容をカスタマイズ。どのコースも完全マンツーマンです。
            </p>
          </div>
          <div className="lesson-grid">
            <div className="lesson-card reveal">
              <div className="lesson-num">01</div>
              <h3>日常英会話</h3>
              <p>
                カフェでの注文から、病院での説明、ご近所との雑談まで。カナダ生活で今日から使える英語を身につけます。
              </p>
              <div className="lesson-tags">
                <span className="lesson-tag-item">日常会話</span>
                <span className="lesson-tag-item">発音矯正</span>
                <span className="lesson-tag-item">リスニング</span>
              </div>
            </div>
            <div className="lesson-card reveal">
              <div className="lesson-num">02</div>
              <h3>ビジネス英語・就活対策</h3>
              <p>
                レジュメ添削、面接対策、プレゼン練習。カナダの職場カルチャーに合った英語力を磨きます。
              </p>
              <div className="lesson-tags">
                <span className="lesson-tag-item">面接対策</span>
                <span className="lesson-tag-item">レジュメ</span>
                <span className="lesson-tag-item">LinkedIn</span>
              </div>
            </div>
            <div className="lesson-card reveal">
              <div className="lesson-num">03</div>
              <h3>テック業界英語</h3>
              <p>
                Stand-up、コードレビュー、技術面接。カナダのテック企業での実務経験をもとに、テック業界特有の英語表現を教えます。
              </p>
              <div className="lesson-tags">
                <span className="lesson-tag-item">テック用語</span>
                <span className="lesson-tag-item">技術面接</span>
                <span className="lesson-tag-item">Slack英語</span>
              </div>
            </div>
            <div className="lesson-card reveal">
              <div className="lesson-num">04</div>
              <h3>オンラインレッスン</h3>
              <p>
                日本からでも受講可能。Zoom・Google
                Meetでバンクーバーのリアルな英語を学べます。時差を活かした早朝・夜間にも対応。
              </p>
              <div className="lesson-tags">
                <span className="lesson-tag-item">Zoom対応</span>
                <span className="lesson-tag-item">日本からOK</span>
                <span className="lesson-tag-item">柔軟スケジュール</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section id="flow" className="flow-section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center" }}>
            <div
              className="section-tag"
              style={{ justifyContent: "center" }}
            >
              Flow
            </div>
            <h2 className="section-title">レッスン開始までの流れ</h2>
            <p
              className="section-desc"
              style={{ margin: "0 auto" }}
            >
              まずは気軽にご相談ください。
            </p>
          </div>
          <div className="flow-steps flow-steps-2">
            <div className="flow-step reveal">
              <div className="flow-circle">1</div>
              <h4>無料チャット相談</h4>
              <p>
                フォームまたはDMからご連絡。
                <br />
                目標・レベル・スケジュールを
                <br />
                ヒアリングし、学習プランをご提案します
              </p>
            </div>
            <div className="flow-step reveal">
              <div className="flow-circle">2</div>
              <h4>レッスン</h4>
              <p>
                対面またはオンラインで
                <br />
                1時間のレッスンスタート
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="container">
          <div className="pricing-layout">
            {/* Left: Message */}
            <div className="pricing-message reveal">
              <div className="section-tag">Pricing</div>
              <h2 className="section-title">
                この価格には、<br />
                <em>理由</em>があります。
              </h2>
              <div className="pricing-message-body">
                <p>
                  1時間100ドル。安くはないと思います。
                </p>
                <p>
                  でも、この価格には意味があります。
                </p>
                <p>
                  <strong>あなたの本気度を見たい。</strong><br />
                  「なんとなく英語やろうかな」ではなく、
                  「本気で変わりたい」と覚悟を決めた人と一緒にやりたい。
                  お金を払うという行為は、自分自身への約束です。
                </p>
                <p>
                  <strong>そして僕も、その1時間を本気でやります。</strong><br />
                  あなたが100ドル分の覚悟を持ってくるなら、
                  僕はそれ以上の準備と全力をもってレッスンに臨みます。
                  1時間を、お互いにとって最高の投資にする。
                  それが約束です。
                </p>
                <p>
                  <strong>だから、無料体験はやっていません。</strong><br />
                  自分のレッスンに自信があるからこそ、
                  「お試し」ではなく最初から本気の1時間を届けます。
                </p>
              </div>
            </div>

            {/* Right: Price card */}
            <div className="pricing-card-wrapper reveal">
              <div className="pricing-card">
                <div className="pricing-amount">
                  <span>$</span>100<span> CAD</span>
                </div>
                <div className="pricing-period">/ 1時間（60分）</div>
                <div className="pricing-features">
                  <div className="pricing-feature">
                    <span className="check">✓</span>完全マンツーマン
                  </div>
                  <div className="pricing-feature">
                    <span className="check">✓</span>対面・オンライン選択可
                  </div>
                  <div className="pricing-feature">
                    <span className="check">✓</span>カスタマイズされた学習プラン
                  </div>
                  <div className="pricing-feature">
                    <span className="check">✓</span>日本語での質問OK
                  </div>
                  <div className="pricing-feature">
                    <span className="check">✓</span>レッスン外のチャットサポート
                  </div>
                  <div className="pricing-feature">
                    <span className="check">✓</span>入会金・教材費なし
                  </div>
                </div>
                <a
                  href="#contact"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  まずは無料でチャット相談する →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center" }}>
            <div
              className="section-tag"
              style={{ justifyContent: "center" }}
            >
              FAQ
            </div>
            <h2 className="section-title">よくある質問</h2>
          </div>
          <div className="faq-list">
            <FaqItem
              q="無料体験レッスンはありますか？"
              a="ありません。自分のレッスンに自信があるからこそ、「お試し」ではなく最初から本気の1時間を届けたいと考えています。その代わり、無料のチャット相談でしっかりヒアリングしますので、不安なことは何でも聞いてください。"
            />
            <FaqItem
              q="英語が全然できないのですが大丈夫ですか？"
              a="もちろん大丈夫です！日本語で丁寧に説明しますので、初心者の方でも安心して受講いただけます。レベルに合わせてレッスン内容をカスタマイズします。"
            />
            <FaqItem
              q="対面レッスンはどこで行いますか？"
              a="バンクーバー市内のカフェや公共スペースで行います。場所はご相談の上、お互いに通いやすいところで設定します。"
            />
            <FaqItem
              q="日本からオンラインで受講できますか？"
              a="はい、Zoom・Google Meetに対応しています。バンクーバーとの時差（日本のほうが16〜17時間進んでいます）を活かして、日本時間の早朝や夜に受講される方が多いです。"
            />
            <FaqItem
              q="キャンセル・振替は可能ですか？"
              a="24時間前までにご連絡いただければ無料で振替が可能です。24時間以内のキャンセルはレッスン料の100%をいただきます。"
            />
            <FaqItem
              q="支払い方法は？"
              a="e-Transfer、現金（対面時）に対応しています。レッスン前のお支払いをお願いしています。"
            />
          </div>
        </div>
      </section>

      {/* CTA + CONTACT FORM */}
      <section className="cta-section" id="contact">
        <div className="container">
          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">
              Hiroki<span>.</span>
            </div>
            <div className="footer-links">
              <a
                href="https://www.instagram.com/japaneseflash/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.instagram.com/chit_chat_canada/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chit-Chat Canada
              </a>
            </div>
          </div>
          <p className="footer-copy">
            © 2026 Hiroki Takaya. All rights reserved. Vancouver, BC,
            Canada.
          </p>
        </div>
      </footer>
    </>
  );
}