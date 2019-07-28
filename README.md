# music-player-sample

## 動作環境

node.js `v10.15.0`

## 作業環境インストール

```
npm install
```

## 開発時に実行

```
npm run start
```

`localhost:3000` で開発用サーバーが起動し、ビルドが実行される。

ビルドが成功すると、ブラウザが立ち上がり画面が表示される。

開発用サーバー起動時は `src` 配下のファイルが watch され、ファイル更新時にライブリロードが走る。

## ビルドの実行

```
npm run build
```

ビルドが実行され、`build` ディレクトリ配下にファイルが生成される。

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

楽曲の情報を表すクラス。
曲に関するメタデータが追加されたときはこちらのクラスを拡張する。

```typescript
export type Song = {
  id: number;
  title: string;
  artistName: string;
  albumTitle: string;
  genre: string;
  songTime: number;
  coverImageUrl: string;
};
```

- id
  - 曲の ID
- title
  - 曲のタイトル
- artistName
  - 歌手名
- albumTitle
  - アルバムのタイトル
- genre
  - ジャンル
- songTime
  - 曲の時間
- coverImageUrl
  - カバー画像の URL

### ShuffleEngine クラス

プレーヤーの内部で曲の情報を管理するクラス。

```typescript
export type ShuffleEngine = {
  setSongs(songs: Song[]): void;
  getNextSong(): Song;
  peekQueue(): Song[];
};
```

- setSongs
  - シャッフル対象の曲(Song)の配列をインスタンスに設定する。
- getNextSong
  - 次に再生する曲(Song)を返します。次に返す曲が更新される。
- peekQueue
  - PEEKMAX の数を上限として,次に再生する予定の曲を先読みして配列として返す。次に返す曲の状態は変わらない。

## Controller クラス

### ShuffleSongController.ts

`ShuffleEngineクラス` を継承して作成したクラス。

機能を追加する時にはこちらのクラスに機能を実装する。
