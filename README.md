## ディレクトリ構造

ディレクトリ構成は以下のように定義する

```
root
　├build        -> ビルド時に納品用ファイルが出力されるディレクトリ
　├public       -> HTML、画像などの静的アセットファイルを格納
　│  └img
　│     └xxxxxx.jpg など
　│
　├src            -> 開発用ファイルのディレクトリ
　│ └component    -> 画面コンポーネントを格納する
　│    ├atoms
　│    ├molecules
　│    └organisms
　├controller  -> ビジネスロジックのクラスを格納する
　├data
　├models      -> 独自に定義した型定義を格納する
　├pages       -> ページ単位のコンポーネントを格納する
　├utiles      -> ユーティリティ関数などを実装したファイルを格納する
　└package.json

```

## 画面コンポーネントについて

- 画面コンポーネントは `Atomic Design ※1` ルールに沿った形で定義を行うこととする。
- 各画面にスタイルは `css modules` を用いて実装を行い、各画面で使用する CSS は `[name].modules.scss` というファイルを作成し、定義することとする。
- アプリケーションのフロントエンドのフレームワークとして、`React` と `Ionic Framework` を採用。
  各画面の遷移や各パーツの実装については `Ionic Framework` のドキュメントを参照すること。

※1. Atomic Design についての詳しい解説は以下を参照。

[Atomic Design を分かったつもりになる](https://design.dena.com/design/atomic-design-%E3%82%92%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%A4%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AA%E3%82%8B/)

※2. Ionic Framework 公式ドキュメント

[https://ionicframework.com/docs](https://ionicframework.com/docs)

## インターフェース

本アプリケーションで使用する Class のインターフェースは以下の通りである。

### Song クラス

```typescript
export type Song = {
  id: number; // 曲のID
  title: string; // 曲のタイトル
  artistName: string; // 歌手名
  albumTitle: string; // アルバムのタイトル
  genre: string; // ジャンル
  songTime: number; // 曲の時間
  coverImageUrl: string; // カバー画像のURL
};
```

### ShuffleEngine クラス

```typescript
export type ShuffleEngine = {
  setSongs(songs: Song[]): void;
  getNextSong(): Song;
  peekQueue(): Song[];
};
```


## Controllerクラス

### ShuffleSongController.ts
