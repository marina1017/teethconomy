# 歯のシミュレーションゲーム

## prettier導入メモ

- prettierを入れる

```
npm install --save-dev prettier
```

- VSCodeExtensinをrecomendでいれる
  - .vscode/extensions.json

```
  {
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode" // Prettier
  ]
  }
```

- 設定ファイルを入れる
  .prettierrc.json

```
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "arrowParens": "avoid"
}

```
