# Salon Shizuka - Hero Section Copywriting & Architecture Specification
### For Future Maintenance, Team Presentations, and Strategic Alignment (English & Japanese)

---

## 1. Executive Summary & Intent / エグゼクティブサマリーと設計意図

This document serves as the permanent strategic blueprint for the Hero Section (Above-the-Fold) of the **Salon Shizuka** web experience. Designed specifically around the target persona **"Mai"**—a busy mother seeking profound, undisturbed relaxation and a trusted hair professional late at night—this section utilizes an **Inverted Narrative Funnel**. 

Instead of traditional, aggressive sales layouts, this architectural arrangement uses sensory immersion and a psychological down-slope to de-escalate anxiety and establish deep trust.

本書は、**Salon Shizuka**のウェブ体験におけるヒーローセクション（ファーストビュー）の恒久的な戦略的設計書です。深夜に深いリラクゼクションと信頼できるヘア技術者を求めて検索するペルソナ**「麻衣（Mai）」**をターゲットに据え、**「倒置型ナラティブ・ファネル（Inverted Narrative Funnel）」**という心理設計を採用しています。

一般的な売上至上主義的な騒がしいレイアウトを排除し、感覚的な没入感と心理的な傾斜（ダウンスロープ）を用いることで、ユーザーの潜在的な不安を解消し、深い信頼関係を瞬時に構築します。

---

## 2. The Inverted Narrative Funnel Architecture / 倒置型ナラティブ・ファネルの構造

The section rearranges traditional landing page hierarchies to prioritize brand aesthetic and emotional permission before delivering the functional transactional call-to-action.

本セクションは、一般的なランディングページの階層を再構築し、機能的な予約アクション（CTA）を提示する前に、ブランドの美学と感情的な自己投資へのアプローチ（許可）を最優先させています。

### Step 1: The Branding Anchor / ブランド名の定着
* **Component:** Huge Salon Logo Typography ("SALON Shizuka").
* **Psychological Impact:** Establishes an atmospheric, high-end editorial baseline. The juxtaposition of structured sans-serif and fluid, organic script instantly signals a luxurious boutique sanctuary away from the digital clutter.
* **構成要素:** 巨大なサロンロゴタイポグラフィ（「SALON Shizuka」）
* **心理的効果:** 雑誌の表紙のような高級感のあるエディトリアル基準を確立。構造的なサンセリフ体と、流動的で有機的なスクリプト体の組み合わせにより、デジタルな雑音から離れた贅沢なプライベート空間に足を踏み入れたことを瞬時に直感させます。

### Step 2: The Sensorial Hook (Lead Text) / 感覚的フック（リードテキスト）
* **Component:** 「あなた本来の美しさと艶を呼び覚ます、特別なひとときを。」
* **Psychological Impact:** Functions as an "editorial whisper." It focuses on the latent desire for renewal, treating the visitor's late-night search not as a simple appointment, but as a long-awaited sensory awakening.
* **構成要素:** 「あなた本来の美しさと艶を呼び覚ます、特別なひとときを。」
* **心理的効果:** 「エディトリアル（編集者風の）な囁き」として機能。髪の本来の美しさやツヤの再生という潜在的欲求に焦点を当て、ユーザーの深夜の検索を「単なる髪のメンテナンス」から「待ち望んでいた感覚の覚醒」へと昇華させます。

### Step 3: The Emotional Climax (Main Headline) / 感情的クライマックス（メインヘッドライン）
* **Component:** 「今日は、自分のための贅沢を。」
* **Psychological Impact:** Validates self-care and frames the hair service as an earned emotional investment rather than a functional errand. It answers the target persona’s inner monologue (*"Am I allowed to indulge?"*) with absolute affirmation.
* **構成要素:** 「今日は、自分のための贅沢を。」
* **心理的効果:** 自己ケアへの正当性を与え、ヘアケアを単なる用事ではなく「自分自身へのご褒美（感情的投資）」として定義。ターゲットペルソナの心の内の葛藤（「自分のために時間やお金を使っていいのかな」）に対して、絶対的な肯定を返します。

### Step 4: The Frictionless Resolution (Action Point) / 摩擦のない解決（アクションポイント）
* **Component:** 「サロンを予約する」
* **Psychological Impact:** Uses clear, literal transactional micro-copy. After a poetic and emotional journey, ambiguity at the button layer causes cognitive abandonment. Direct copy eliminates friction and clarifies the immediate technical outcome.
* **構成要素:** 「サロンを予約する」
* **心理的効果:** 明確でストレートな機能的マイクロコピー。詩的かつ感情的な流れの後に、ボタンの文言まで曖昧にすると離脱の原因になります。明確な表現にすることで認知摩擦を徹底的に排除し、次のアクションへスムーズに誘導します。

---

## 3. Typographic & Technical Implementation Rules / タイポグラフィと技術的実装ルール

To prevent degradation during future code maintenance, developers and designers must strictly enforce the following rules:

将来のコード保守やデザイン改修時の品質低下を防ぐため、開発者およびデザイナーは以下のルールを厳格に遵守してください。

| Copy Block / 要素 | Font Family / フォント種類 | Strategy / 意図 |
| :--- | :--- | :--- |
| **SALON** | Sans-Serif (e.g., Montserrat) | High uppercase letter-spacing (0.15em+) to mirror premium print advertisements.<br>高級プリント広告を再現するため、トラッキング（文字間隔）を0.15em以上に広く設定。 |
| **Shizuka** | Flowing Cursive Script | Vector path optimization to maintain delicate line weights over background imagery.<br>背景画像の上でも繊細なヘアライン（線の太さ）が維持されるようベクターパスを最適化。 |
| **Lead & Headline** | Serif / Mincho (`BIZ UDPMincho`) | Evokes a sense of classic literature, tranquility, and high-end luxury.<br>古典文学のような落ち着き、静寂、そしてハイエンドなラグジュアリー感を醸し出す。 |
| **CTA Button** | Sans-Serif (`Noto Sans JP`) | Guaranteed legibility, clean scaling, and accessibility under high interactive stress.<br>高いインタラクティブ環境下での視認性、クリーンな縮小拡大、アクセシビリティを保証。 |

### Contrast Safeguard / コントラスト保護ルール
Text color must maintain a minimum **4.5:1 contrast ratio** against the background visual layer. If necessary, apply a subtle linear vignette overlay (e.g., `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.3))`) over the background image or video to protect typographic legibility without muddying the desaturated color palette.

背景画像・動画に対して、テキスト色は最低でも**4.5:1のコントラスト比**を維持する必要があります。視認性を確保するため、必要に応じて背景に薄いリニアグラデーションのオーバーレイ（例: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.3))`）を適用し、ミュートされたトーンのカラーパレットを濁らせることなく可読性を保護してください。

---

## 4. Brand Evolution Guidelines / ブランド進化に向けたガイドライン

If the headlines or subtitles require future translation, adjustment for seasonal campaigns, or optimization, the structural formula must remain unaltered:

将来的にヘッドラインやサブタイトルの翻訳、季節キャンペーンへの適合、あるいは最適化を行う場合でも、以下の構造的方程式を崩してはなりません。

$$\text{Atmospheric Sensory Benefit} \longrightarrow \text{Emotional Self-Care Permission} \longrightarrow \text{Direct Functional CTA}$$

Never compromise functional transparency for the sake of abstract marketing vocabulary. For example, never alter the CTA text to vague terms like *"Step Into the Silence"* or *"Begin the Journey"*. Keep it universally actionable: **「サロンを予約する」 (Book a Session)**.

抽象的なマーケティング用語のために、機能的な透明性を犠牲にしないでください。例えば、CTAボタンを「静寂へ歩み進む」や「旅を始める」といった曖昧な表現に変更することは厳禁です。誰が見ても次の行動が直感できる **「サロンを予約する」** を維持してください。
