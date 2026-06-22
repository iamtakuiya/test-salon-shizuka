# Salon Shizuka - Brand Concept & Hospitality Specification
### For Future Maintenance, Team Presentations, and Strategic Alignment (English & Japanese)

---

## 1. Executive Summary & Narrative Intent / 概要と設計意図

This document establishes the strategic copywriting and architectural framework for the **Brand Concept & Hospitality Section** of the **Salon Shizuka** web experience. Positioned directly below the Hero Section and Owner Profile, this block transitions the user from an initial emotional hook into a concrete understanding of the salon's distinct brand values.

The core objective is to avoid sounding like a generic, overly soft head-spa or an unstructured, casual neighborhood parlor. By binding high-end technical craftsmanship, scientific hair anatomy planning, and a protective private refuge together, the copy positions the salon as an authoritative, premium sanctuary.

本書は、**Salon Shizuka**のウェブサイトにおける「ブランドコンセプト＆ホスピタリティ・セクション」の戦略的コピーライティング構造定義書です。ヒーローセクションやオーナープロフィールの直下に配置され、ユーザーの情緒的な興味を「このサロンならではの具体的な提供価値」へと着実に引き上げる役割を担います。

このセクションの目的は、単に「癒やし」や「おしゃべり」を売るカジュアルなサロンやヘッドスパ店との明確な差別化です。卓越した技術力、論理的な毛髪設計、そしてプライベートな隠れ家としての安心感を三位一体で表現することで、プレミアムサロンとしての確固たる権威性と信頼性を確立します。

---

## 2. The Core Concept Trilogy / コンセプト・トリロジーの三位一体構造

The narrative framework is structured as three tightly balanced rhythmic pairs. Each pair explicitly answers a sub-conscious anxiety felt by the target persona (**"Mai"**) while asserting the owner's professional capabilities.

本セクションは、リズムの美しさと一貫性を追求した3つの対比コピーで構成されています。それぞれのコピーがターゲットペルソナ（麻衣）の持つ潜在的な不安を解消し、同時にオーナーの技術者としてのプライドと哲学を証明します。

### Pillar 1: Hair Care & Treatment Philosophy / 髪質の根本改善と哲学
* **Japanese Copy:** 髪を育むという贅沢 ・ 強く豊かな髪へ
* **Strategic Value:** Elevates hair service from temporary styling or superficial chemicals to long-term structural cultivation. It frames premium hair health as a justifiable, high-end investment in self-worth.
* **ストラテジー:** 単なる一時的なごまかしのセットや化学的なコーティングではなく、長期的な「毛髪の育成」へと価値を転換。美しく強い髪を育てるプロセスそのものを、自分を慈しむための正当な「自己投資（贅沢）」として再定義します。

### Pillar 2: Technical Skill & Custom Architecture / 技術的アプローチとオーダーメイド設計
* **Japanese Copy:** 心をほどく対話 ・ あなただけのヘアデザイン
* **Strategic Value:** Pairs empathetic listening with rigorous technical execution. The word "Design" explicitly anchors the text to logical hair-shaping, head anatomy mapping, and stylistic precision, building deep technical trust.
* **ストラテジー:** 共感的なカウンセリング（心をほどく対話）と、厳格な技術的執行を対にしています。「ヘアデザイン」という論理的な言葉を用いることで、骨格に合わせた緻密なカットや再現性の高い技術力を証明し、技術者としての絶対的な安心感を与えます。

### Pillar 3: Professional Relationship & Privacy Policy / プロフェッショナルな距離感と安心感
* **Japanese Copy:** 「美容師とお客様」を超えて ・ 心地よく寄り添う
* **Strategic Value:** Redefines the standard merchant-consumer dynamic into a high-trust creative partnership. It uses elevated phrasing ("goes beyond") to indicate an exclusive, secure private salon alliance where she is safely understood.
* **ストラテジー:** 通常の事務的な店員と客という関係性を超えた、深い信頼で結ばれたクリエイティブなパートナーシップを提示します。「〜を超えて」という洗練された表現により、完全貸切のプライベート空間だからこそ叶う、一生寄り添える専属スタイリストとしての覚悟を表現しています。

---

## 3. Typographic & Visual Implementation Rules / 実装規格ルール

To maintain the luxury editorial magazine visual flow over laptop screens, front-end development and UI styling must strictly follow these constraints:

PC画面上において、ラグジュアリー雑誌のような洗練されたレイアウトと品格を維持するため、フロントエンド実装およびUIデザインは以下のルールを厳格に適用してください。

| Selector / 対象 | Value / 指定体 | Technical Constraint / 実装ルール |
| :--- | :--- | :--- |
| **Font Family** | `BIZ UDPMincho` | Mandated for all text blocks to maintain historical elegance and calmness.<br>静寂と伝統的な気品を表現するため、全コピーを明朝体に統一。 |
| **Letter Spacing** | `0.08em` to `0.1em` | Increases breathing room, forcing the visitor to slow down their reading pace.<br>文字間に豊かな余白を持たせることで、ユーザーが自然とゆっくり読むように誘導。 |
| **Line Height** | `1.8` to `2.0` | Prevents text block collision on high-resolution widescreen displays.<br>高解像度のワイド画面でもテキストが詰まって見えないよう、垂直方向の美しい余白を確保。 |
| **The Mid-Dot (`・`)** | Custom Spacer / SVG | Replace plain full-width browser characters with optimized vector margins to avoid clunky line wraps.<br>ブラウザ標準の全角中黒は野暮ったく見えるため、CSSマージンや薄い垂直線（`|`）等で美しくスタイリング。 |

---

## 4. Architectural Marketing Equation / 恒久的なマーケティング方程式

When modifying this section for seasonal campaigns, future service highlights, or print lookbooks, the copy structure must never deviate from the following balance equation:

将来的な季節ごとのキャンペーンや印刷物（ルックブック）の改修時においても、このセクションが持つ以下の「バランス方程式」を決して崩してはなりません。

$$\text{Tangible Hair Cultivation (Care)} \times \text{Logical Analytical Styling (Skill)} \times \text{Bespoke Private Sanctuary (Trust)}$$

Never let the copy lean entirely toward "healing" or entirely toward "chemical features." The identity of Salon Shizuka thrives precisely where elite, calculated technical skill meets a warm, undisturbed human refuge.

コピーを「癒やし」だけに偏らせたり、逆に「科学的な髪の成分」だけに偏らせたりしないでください。Salon Shizukaのブランド価値は、計算し尽くされた卓越した技術力と、誰にも邪魔されない温かい人間の隠れ家が美しく交差する場所にこそ存在します。
