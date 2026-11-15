# 3D Editor (hy3-free)

React + TypeScript + [Three.js](https://threejs.org/) (via [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei)) で作った、シンプルな 3D エディターです。ランタイムには [Bun](https://bun.sh/) を使用します。

## 機能

- **Cube / Sphere の追加**
- **選択** （オブジェクトをクリック）
- **移動 / 回転 / 拡大縮小** （TransformControls ギズモによるドラッグ、またはインスペクターの数値入力）
- **削除**
- **インスペクター** による位置・回転・拡大縮小・色の編集

## 使い方

1. ツールバーの `Cube` / `Sphere` ボタンでオブジェクトを追加（追加時に自動選択されます）。
2. ツールバーの `選択 / 移動 / 回転 / 拡大縮小` で編集モードを切り替えます。
   - `移動・回転・拡大縮小` モードでは、選択中のオブジェクトに表示されるギズモをドラッグして変形できます。
   - ギズモをドラッグしている間はカメラの回転（OrbitControls）が自動で無効になります。
3. 右側の **インスペクター** で数値・色を直接編集できます。
4. `削除` ボタンで選択中のオブジェクトを削除します。

> キャンバス上の何もない場所をクリックすると、選択が解除されます。

## 開発

```bash
# 依存関係のインストール
bun install

# 開発サーバー起動 (Vite)
bun run dev

# 型チェック + ビルド
bun run build

# ビルド結果のプレビュー
bun run preview
```

## 構成

```
3deditor-hy3-free/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
└── src/
    ├── main.tsx              # エントリーポイント
    ├── App.tsx              # レイアウト (Toolbar + Scene + Inspector)
    ├── App.css              # スタイル
    ├── types.ts             # 型定義
    ├── store/
    │   └── useEditorStore.ts   # 状態管理 (Zustand)
    └── components/
        ├── Toolbar.tsx      # 上部ツールバー
        ├── Scene.tsx        # 3D キャンバス (r3f + TransformControls)
        ├── EditorObject.tsx  # 個別オブジェクトのメッシュ
        └── Inspector.tsx    # 右側プロパティパネル
```

技術スタック:

- **Bun** — ランタイム / パッケージマネージャー
- **React 18 + TypeScript** — UI
- **Three.js** (`@react-three/fiber`, `@react-three/drei`) — 3D レンダリング
- **Zustand** — 軽量な状態管理
- **Vite** — 開発サーバー / ビルド
