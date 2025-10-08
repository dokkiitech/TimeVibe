# TimeVibe

集中作業のためのlo-fiミュージックタイマーアプリ

## 機能

- ✨ 現在時刻と作業時間の表示
- 🎵 Lo-fi音楽のランダム再生（クロスフェード付き）
- 🎨 リラックス効果のあるグラデーションアニメーション
- 📱 縦横画面対応のレスポンシブレイアウト
- ⏸️ アプリ非表示時の自動一時停止
- 🔄 アプリキル時のタイマーリセット

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 音源の配置

`assets/music/` フォルダにlo-fi音源ファイル(.mp3, .wav等)を配置してください。

```
assets/music/
  ├── lofi-track-1.mp3
  ├── lofi-track-2.mp3
  └── lofi-track-3.mp3
```

### 3. 音源の登録

`hooks/useMusicPlayer.ts` の `musicTracks` 配列に音源ファイルを追加してください。

```typescript
const musicTracks = [
  require('../assets/music/lofi-track-1.mp3'),
  require('../assets/music/lofi-track-2.mp3'),
  require('../assets/music/lofi-track-3.mp3'),
];
```

## 実行方法

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

## 技術スタック

- **フレームワーク**: React Native / Expo
- **UI**: Tamagui
- **音楽再生**: expo-av
- **グラデーション**: expo-linear-gradient
- **アイコン**: @expo/vector-icons

## プロジェクト構造

```
TimeVibe/
├── App.tsx                        # メインアプリケーション
├── components/
│   ├── Clock.tsx                  # 時計表示
│   ├── WorkTimer.tsx              # 作業時間タイマー
│   ├── PlayButton.tsx             # 再生/一時停止ボタン
│   ├── GradientBackground.tsx     # グラデーション背景
│   └── ResponsiveLayout.tsx       # レスポンシブレイアウト
├── hooks/
│   ├── useWorkTimer.ts            # タイマーロジック
│   └── useMusicPlayer.ts          # 音楽再生ロジック
└── assets/
    └── music/                     # 音源フォルダ
```

## 使い方

1. アプリを起動すると、現在時刻と作業時間（00:00:00）が表示されます
2. 右下の再生ボタンをタップすると、音楽再生とタイマーが開始されます
3. もう一度タップすると一時停止します
4. アプリを閉じる（画面非表示）と自動的に一時停止します
5. アプリをキルすると作業時間がリセットされます

## カスタマイズ

### グラデーションカラーの変更

[components/GradientBackground.tsx](components/GradientBackground.tsx) の `outputRange` を編集してください。

### フォントの変更

各コンポーネントの `StyleSheet` でフォント設定を変更できます。ドットフォントを使用したい場合は、expo-fontでカスタムフォントを読み込んでください。

### クロスフェード時間の調整

[hooks/useMusicPlayer.ts](hooks/useMusicPlayer.ts) の `fadeOutInterval` と `fadeInInterval` の値を調整してください（デフォルト: 2000ms = 2秒）。

## ライセンス

MIT
