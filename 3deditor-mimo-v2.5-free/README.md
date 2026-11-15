# 3D Editor

React + TypeScript + Three.js + Bunで構築されたシンプルな3Dエディターです。

## 機能

- **オブジェクト追加**: CubeとSphereを追加可能
- **選択**: オブジェクトをクリックして選択
- **移動**: Translateモードでオブジェクトを移動
- **回転**: Rotateモードでオブジェクトを回転
- **拡大縮小**: Scaleモードでオブジェクトをリサイズ
- **削除**: 選択したオブジェクトを削除
- **Inspector**: 選択したオブジェクトのプロパティを編集

## 技術スタック

- **Runtime**: Bun
- **Frontend**: React 18
- **Language**: TypeScript
- **3D**: Three.js + @react-three/fiber + @react-three/drei
- **State Management**: Zustand
- **Build Tool**: Vite

## セットアップ

```bash
# 依存関係のインストール
bun install

# 開発サーバーの起動
bun run dev

# ビルド
bun run build
```

## プロジェクト構成

```
3deditor-mimo-v2.5-free/
├── src/
│   ├── components/
│   │   ├── Canvas3D/       # 3Dキャンバス関連
│   │   │   ├── Scene.tsx   # 3Dシーン
│   │   │   ├── Object3D.tsx # 3Dオブジェクト
│   │   │   └── TransformControls.tsx
│   │   ├── Toolbar/        # ツールバー
│   │   ├── Inspector/      # インスペクター
│   │   └── Viewport/       # ビューポート
│   ├── store/              # Zustandストア
│   ├── types/              # TypeScript型定義
│   └── styles/             # CSSスタイル
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 使い方

1. **オブジェクトの追加**: 左側のツールバーから「Cube」または「Sphere」ボタンをクリック
2. **オブジェクトの選択**: 3Dビューでオブジェクトをクリック
3. **移動/回転/拡大縮小**: ツールバーからモードを選択し、ドラッグ操作
4. **プロパティ編集**: 右側のインスペクターで数値を直接入力
5. **削除**: オブジェクトを選択状態で「Delete」ボタンをクリック

## ライセンス

MIT License
