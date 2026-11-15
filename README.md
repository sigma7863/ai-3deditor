# ai-3deditor

3Dエディターのコレクション。React + TypeScript + Three.js + Vite + Bun で構築。

## サブプロジェクト

| プロジェクト | 説明 |
|---|---|
| `3deditor-big-pickle` | 3Dエディター（プリミティブ追加・編集） |
| `3deditor-claude` | 3Dエディター（Claude バージョン、TransformControls 対応） |
| `3deditor-hy3-free` | 3Dエディター（HY3 バージョン） |
| `3deditor-mimo-v2.5-free` | 3Dエディター（MIMO v2.5 バージョン） |
| `3deditor-nemotron-3-ultra-free` | 3Dエディター（Nemotron 3 Ultra バージョン） |

## 主な機能

- Cube / Sphere などのプリミティブ追加
- オブジェクトの選択・移動・回転・拡大縮小（TransformControls）
- オブジェクト削除
- インスペクターによる位置・回転・スケール・カラーの数値編集
- ショートカットキー操作（1:選択, 2:移動, 3:回転, 4:拡大縮小, Delete:削除）

## 技術スタック

- React 19
- TypeScript
- Three.js (`@react-three/fiber`, `@react-three/drei`)
- Zustand（状態管理）
- Vite
- Bun

## セットアップ

各サブプロジェクトディレクトリで実行：

```bash
bun install
bun run dev
```

`http://localhost:5173` でアクセスできます。

## ライセンス

MIT