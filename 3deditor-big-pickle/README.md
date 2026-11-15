# 3D Editor (big-pickle)

React + TypeScript + Three.js + Bun で作られたシンプルな 3D エディター。

## 機能

- **Cube / Sphere 追加** — ツールバーから 3D オブジェクトを追加
- **選択** — オブジェクトをクリックで選択 (空クリックで選択解除)
- **移動 / 回転 / 拡大縮小** — `TransformControls` によるギズモ操作、ツールバーでモード切替
- **削除** — 選択中に Delete ボタン
- **インスペクター** — 位置/回転/スケールの数値編集、カラーピッカー

## 使い方

```bash
# 依存関係のインストール
bun install

# 開発サーバー起動
bun run dev

# ビルド
bun run build
```

## プロジェクト構成

```
src/
  components/
    EditorScene.tsx    # Three.js シーン (Canvas, ライト, TransformControls)
    EditorObject.tsx   # 個々の 3D オブジェクト (Mesh)
    Toolbar.tsx        # ツールバー (追加/モード切替/削除)
    Inspector.tsx      # インスペクター (プロパティ編集)
  store/
    useEditorStore.ts  # Zustand 状態管理
  types/
    index.ts           # 型定義
  utils/
    color.ts           # 色割り当てユーティリティ
  styles.css           # グローバルスタイル
  App.tsx              # ルートコンポーネント
  main.tsx             # エントリーポイント
```

## スタック

- **Vite** — ビルドツール
- **React 18** + **TypeScript**
- **@react-three/fiber** — Three.js React ラッパー
- **@react-three/drei** — TransformControls などユーティリティ
- **Zustand** — 状態管理
