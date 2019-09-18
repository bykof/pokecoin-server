<h1 align="center">Welcome to pokecoin-server 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/michaelbykovski">
    <img alt="Twitter: michaelbykovski" src="https://img.shields.io/twitter/follow/michaelbykovski.svg?style=social" target="_blank" />
  </a>
</p>

> The Pokecoin Backend Server

## Install

```sh
yarn install
```

## Usage

```sh
yarn start
```

## Run tests

```sh
yarn test
```

## Environment Variables

| Name                 | Description                                    | Type    | Default                      |
|----------------------|------------------------------------------------|---------|------------------------------|
| PRODUCTION           | production mode                                | boolean | false                        |
| MONGODB_URL          | The mongodb uri                                | string  | mongodb://localhost/pokecoin |
| PORT                 | port                                           | number  | 3000                         |
| DEFAULT_REWARD       | The reward for a found block                   | number  | 1                            |
| DEFAULT_PACKAGE_COST | The package cost for a default pokemon package | number  | 25                           |
| JWT_SECRET           | The JWT Secret                                 | string  | secret                       |
| POW_DIFFICULTY       | The 0 for POW in the Blockchain                | number  | 6                            |

## Author

👤 **Michael Bykovski &lt;michael.bykovskii@aoe.com&gt;**

* Twitter: [@michaelbykovski](https://twitter.com/michaelbykovski)
* Github: [@bykof](https://github.com/bykof)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/bykof/pokecoin-server/issues).

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
