<h3 align="center">
    <a href="https://chrome.google.com/webstore/detail/repost/ncecccibmoomlikfocmpmidbhiioonlm">
        <img src="src/assets/RePOST_image.png" height="200">
    </a>
</h3>

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/recursionist-teamdev-green/tetris)
![image](https://img.shields.io/badge/chrome-extension-E2E8F0?logo=googlechrome)
![image](https://img.shields.io/badge/typescript-E2E8F0?logo=typescript)
![image](https://img.shields.io/badge/React-E2E8F0?logo=react)
![image](https://img.shields.io/badge/tailwindcss-E2E8F0?logo=tailwindcss)
![image](https://img.shields.io/badge/discord.js-E2E8F0?logo=discord)
![image](https://img.shields.io/badge/vite-E2E8F0?logo=vite)
![image](https://img.shields.io/badge/eslint-E2E8F0?logo=eslint)
![image](https://img.shields.io/badge/prettier-E2E8F0?logo=prettier)

[recursionist.io](recursionist.io)での学習効率を高める拡張機能です。

問題ページから[RePOST](https://chrome.google.com/webstore/detail/repost/ncecccibmoomlikfocmpmidbhiioonlm)を使用することで、Recursionコミュニティへ質問をすることができます。

RePOSTは、Recustionコミュニティの質問テンプレートに沿って作成していおり、毎回コピー＆ペーストをする個所は自動で読み込まれるため、ユーザーは質問のテキストを記述することに集中できます。
また、言語別でシンタックスハイライトに対応しており、最終的な Discord メッセージのプレビューを用意しているため、読みやすいDiscordメッセージを投稿することができます。

## 使用方法
1. [chrome拡張機能ストア](https://chrome.google.com/webstore/detail/repost/ncecccibmoomlikfocmpmidbhiioonlm)にて RePOST をインストールする。
2. 右上の拡張機能に RePOST をピン止めする。
3. recursionist.ioでの問題ページを開く。
4. RePOST の icon クリックする。
5. Discordとの連携をする。
6. 質問タブにて記述していく。
7. [ コード, コンソール, プレビュー ] を確認する。
8. 問題なければ、質問ボタンをクリックして投稿する。


<div align=center>
<img src="src/assets/demo.gif">
</div>

## URL
https://chrome.google.com/webstore/detail/repost/ncecccibmoomlikfocmpmidbhiioonlm

## システム構成図
<img src="src/assets/architecture.png">

## ワイヤーフレーム
[Figma](https://www.figma.com/file/wPjO41fDIQYHRdLW7xzKqV/recursion_question?type=design&node-id=0%3A1&mode=design&t=Hr7K02YIxORFJuma-1)にて作成

## 使用技術
|カテゴリ|技術|
|----|----|
|フロントエンド|Typescript React Tailwindcss|
|バックエンド|express.js discord.js|
|インフラ|ChromeWebStore EC2|
|ビルド|Vite|
|CI|husky|
|...etc|eslint prettier|