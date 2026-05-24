# ShopFront

## About the Project 🎯

When the world's best stories meet modern web technology, you get **RX-Men**. We are building a comic book shop where browsing, authentication, and checkout feel smooth, fast, and reliable. The project is powered by **Angular** and integrated with the **commercetools API** to deliver a modern e-commerce experience.

## Live Demo 🚀

Visit the deployed frontend here: [ShopFront Demo](https://rx-men.github.io/shop-front/)

## Project Resources 🧭

- **Prototype:** [Miro Board](https://miro.com/app/board/uXjVHVIz4eA=/?track=true&utm_source=notification&utm_medium=email&utm_campaign=approve-request&utm_content=go-to-miro&lid=tnjl56fagmrc)
- **🐗 Board:** [GitHub Projects](https://github.com/orgs/RX-Men/projects/1)

## Local Setup 🛠️

### Required Engines

The project uses the following versions defined in `package.json`:

- `Node.js 22.17.1`
- `npm 10.9.2`

### Environment Preparation

This repository includes a `.nvmrc` file, so you can use a Node version manager to switch to the required version automatically:

```bash
nvm use
```

If the required Node.js version is not installed yet:

```bash
nvm install
nvm use
```

### Installation and Run

```bash
git clone https://github.com/RX-Men/shop-front.git
npm ci
npm run start
```

After that, open `http://localhost:4200/` in your browser.

### Useful Commands

```bash
npm run build
npm run lint
npm run stylelint:check
npm run prettier:check
npm run test
```

## Tech Stack 🧰

- `Angular 21`
- `TypeScript`
- `SCSS`
- `Angular Router`
- `NgRx Signals`
- `ESLint`
- `Stylelint`
- `Prettier`
- `Husky`
- `Vitest`
- `commercetools API`
- `GitHub Pages` for deployment

## Team & Responsibilities 👥

| Name              | GitHub                                      | Role               | Responsibilities                                                                                                                                                                                                                                                            | Development Diary                                                                                   |
| :---------------- | :------------------------------------------ | :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| Boris Zashliapin  | [elrouss](https://github.com/elrouss)       | Team Lead          | **Core product areas:** Home, Catalog, Detailed Product<br>**Architecture & platform:** commercetools API integration setup, local environment setup, UI Kit development<br>**Product & delivery:** project planning, layout prototyping, documentation, team sync meetings | [🔗 DEVELOPMENT_DIARY](https://github.com/RX-Men/shop-front/tree/main/development-notes/elrouss)    |
| Dmitrii Prokhorov | [prokhorovd](https://github.com/prokhorovd) | Frontend Developer | **Core product areas:** Sign Up, Sign In, User Profile<br>**Shared components:** UI Kit components                                                                                                                                                                          | [🔗 DEVELOPMENT_DIARY](https://github.com/RX-Men/shop-front/tree/main/development-notes/prokhorovd) |
| Denis Semenov     | [den987655](https://github.com/den987655)   | Frontend Developer | **Core product areas:** Cart, About Us, 404 page<br>**Shared components:** UI Kit components                                                                                                                                                                                | [🔗 DEVELOPMENT_DIARY](https://github.com/RX-Men/shop-front/tree/main/development-notes/den987655)  |
| Dzmitry Mamaikin  | [mummick](https://github.com/mummick)       | Mentor             | **Strategic guidance:** architectural feedback, validation of implementation decisions<br>**Team support:** code review support, risk spotting, mentoring on best practices, helping the team stay aligned with delivery goals                                              | N/A - mentor                                                                                        |

## Meeting Notes 📝

- [First meeting - May 15, 2026](https://github.com/orgs/RX-Men/projects/1/views/1?pane=issue&itemId=187239999&issue=RX-Men%7Cshop-front%7C25)
- [Second meeting - May 23, 2026](https://github.com/orgs/RX-Men/projects/1/views/1?pane=issue&itemId=191478856&issue=RX-Men%7Cshop-front%7C69)

## License 📄

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)
