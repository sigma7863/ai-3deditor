# 3D Editor (Claude)

React + TypeScript + Three.js + Bun で作成した簡単な 3D エディター。

## 機能

- **Cube / Sphere 追加** - ツールバーからプリミティブを追加
- **選択** - クリックでオブジェクトを選択
- **移動 / 回転 / 拡大縮小** - TransformControls による操作
- **削除** - 選択したオブジェクトを削除
- **インスペクター** - 位置・回転・スケール・カラーを数値編集
- **ショートカットキー** - `1`: 選択, `2`: 移動, `3`: 回転, `4`: 拡大/縮小, `Delete/Backspace`: 削除

## 使い方

```bash
bun install
bun run dev
```

## アーキテクチャ

```
src/
├── types.ts                 # 型定義
├── store/useEditorStore.ts  # Zustand 状態管理
├── components/
│   ├── Toolbar.tsx          # ツールバー
│   ├── Viewport.tsx         # 3D ビューポート (Canvas)
│   ├── EditorScene.tsx      # シーン (ライト・グリッド・オブジェクト)
│   └── Inspector.tsx        # インスペクターパネル
├── App.tsx                  # レイアウト
└── main.tsx                 # エントリーポイント
```

## スタック

- **Vite** - ビルドツール
- **React 18** - UI フレームワーク
- **TypeScript** - 型安全
- **Three.js** - 3D レンダリング
- **@react-three/fiber** - React × Three.js 統合
- **@react-three/drei** - 便利コンポーネント (TransformControls, OrbitControls)
- **Zustand** - 状態管理
- **Bun** - パッケージマネージャー / ランタイム
