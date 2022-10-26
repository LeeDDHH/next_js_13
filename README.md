# Next.js 13

- [13 バージョンリリース](https://nextjs.org/blog/next-13)にともなって、 `create-next-app@latest --ts` のあとに[app/ Directory (beta)](https://nextjs.org/blog/next-13#app-directory-beta)を試す

## 動作環境

|            |         |
| :--------: | :-----: |
|  Node.js   | 18.12.0 |
|    npm     | 8.19.2  |
|    next    | 13.0.0  |
|   react    | 18.2.0  |
| react-dom  | 18.2.0  |
| typescript |  4.8.4  |

## 確認したこと

- プロジェクト生成後、素の状態で動作確認 OK

### ディレクトリ構成

- `app` ディレクトリに `page.tsx` を追加することで、 `pages/index.tsx` と同じ役割をする

  - ただ、 `next.config.js` に `{experimental:{appDir: true}}` 設定を追加する必要がある
  - 追加したら、以下の修正がかかる

    - `app` 配下に `layout.tsx` が追加される
      - `RootLayout` という名前のコンポーネントが生成される
      - `app.tsx` や `_document.tsx` の役割をする
    - `tsconfig.json` に項目が追加される

      ```
        - include was updated to add '.next/types/**/*.ts'
        - plugins was updated to add { name: 'next' }
      ```

- `app` ディレクトリと `pages` ディレクトリは共存できない
  - `.notUse` ディレクトリを設け、 `pages` を移す

### ページ表示

- `app/page.tsx` 内で `app/layout.tsx` をラップしなくても動作する
  - おそらく、13 バージョンからは **`page.tsx` と `layout.tsx` がディレクトリ内でユニークな役割をする**と思われる

### ルーティング

- ルーティングに関する変更
  - url のパスはディレクトリ名で区切る
    - **url のパス名をディレクトリ名にすることで統一している**
  - **url のパスとなるディレクトリには `page.tsx` を含める必要がある**
- url のパス名をディレクトリの `page.tsx` から外部データを取得するコードを書くと想定する
  - next.js 13 より前は `getServerSideProps` とか `getStaticProps` を使うことで外部データを取得できた
  - しかし、**next.js 13 で最新の react を使う場合、react の `use` 関数を使うことで、より簡単に外部データの取得ができる**
    - [該当ソース](./app/posts/page.tsx)
    - [最速攻略！React の `use` RFC](https://zenn.dev/uhyo/articles/react-use-rfc)
  - また、`use` でデータを取得した場合、 `console.log` を使ってログを出してもブラウザ側ではログの確認ができない
    - サーバー（開発時はターミナル）では確認できる
    - 理由は、 **`app` 配下のコンポーネントはデフォルトでサーバーコンポーネントとして動く**
    - なので、 `console.log` を書く場合、サーバー（開発時はターミナル）で確認する必要がある

### ローディングインジゲータ

- ローディングインジゲータの表示
  - Suspense をラップするようなことをしなくても、 `app/loading.tsx` を追加することで実装できる
    - [該当ソース](./app/loading.tsx)
  - おそらく、13 バージョンからは **`app/loading.tsx` がローディングインジゲータとしてユニークな役割をする**と思われる
  - おそらく、next.js 13 の `app` ディレクトリと react の最新バージョンの `use` を組み合わせることで、自動的にデータ取得中は `app/loading.tsx` を参照するようにしてくれる

### ダイナミックルート

- ダイナミックルート
  - ダイナミックルートとして参照するキー名をしたディレクトリを生成する
    - ex) `app/posts/[id]`
  - キー名のディレクトリ内には `page.tsx` を追加する

### ルーティング配下のダイナミックルート

- url のパス名をディレクトリ配下にも `layout.tsx` を追加できる
  - 表示したいメインコンテンツは `page.tsx` に表示して、ページで共通する部分は `layout.tsx` に集約することができる
  - url のパス名をディレクトリ配下にダイナミックルートでディレクトリがあったとしても、**メインコンテンツとしてはダイナミックルートのページを表示し、url のパス名をディレクトリで共通して見せたい部分は見せられる**
    - `posts` 配下の url パスで共通で見せたい部分は `app/posts/layout.tsx` で表示される
      - `posts` にアクセスしたら、 `posts` 専用で見せたいコンテンツは `app/posts/page.tsx` で見せられる
      - `posts/[id]` にアクセスしたら、 ダイナミックルートで見せたいコンテンツを `app/posts/[id]/page.tsx` で見せられる

### 自作コンポーネント参照

- コンポーネントとして分離したパーツは `app` 配下においても、 `app` の外からでも参照できる
  - `app/navBar.tsx` と `components/navBar.tsx` で動作の差はなかった

## 参考

- [Next.js 13 - How to use App folder & Layouts - YouTube](https://www.youtube.com/watch?v=xXwxEudjiAY)
- [Blog - Next.js 13 | Next.js](https://nextjs.org/blog/next-13#app-directory-beta)
- [最速攻略！React の `use` RFC](https://zenn.dev/uhyo/articles/react-use-rfc)
