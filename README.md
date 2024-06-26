[![Netlify Status](https://api.netlify.com/api/v1/badges/842172b2-80ff-4132-9000-6020004adee8/deploy-status)](https://app.netlify.com/sites/monumental-bonbon-c5c3fa/deploys)
[![Build Status](https://travis-ci.org/grozzzny/middle.messenger.praktikum.yandex.svg?branch=main)](https://travis-ci.org/grozzzny/middle.messenger.praktikum.yandex)

# Fast Chat: Demonstrative Learning Messenger

**Additional Links:**

- Figma Design Template: [Fast Chat Figma Template](https://www.figma.com/file/QPX0Avs8vk012UMKHv2mkt/yandex?type=design&node-id=0-1&mode=design)
- Deployed Website on Netlify: [Fast Chat on Netlify](https://monumental-bonbon-c5c3fa.netlify.app/)

**Readiness for Use:**
The Fast Chat project is currently in the stage of front-end development and is primarily intended for demonstration purposes. It is not recommended for production use at this time. We invite you to explore the current version for a preview and appreciate any feedback.

**Project Benefits:**
Fast Chat is developed as a sample messenger designed for educational purposes. It provides basic functionality to showcase essential chat elements, interaction with educational materials, and management of group chats.

**Installation:**

1. Clone the repository with the command: `git clone https://github.com/grozzzny/practicum.git fast-chat`
2. Navigate to the project directory: `cd fast-chat`
3. Install dependencies: `npm install` or `yarn install`
4. Start the application: `npm run start` or `yarn start`
5. Installing git hooks using Husky: `npm run prepare` or `yarn prepare`

**Usage:**

1. View the project by opening it in your browser to familiarize yourself with the interface.
2. Conduct a superficial analysis of the messenger's functionality for demonstration purposes.
3. Pay attention to the interface elements, interaction with educational materials, and group communication features.

**Running Bats Tests Locally**

To run the Bats tests locally, follow these steps:

1. Clone the Bats tests repository:

```bash
git clone https://github.com/Yandex-Practicum/tests-middle-frontend.git tmp/tests-middle-frontend
```

2. Install the required dependencies. Make sure you have `jq` installed:

```bash
brew install jq
```

3. Run Bats tests for a specific sprint (replace `sprint_1` with the desired sprint number, ranging from 1 to 4):

```bash
yarn bats:sprint_1
```

Repeat this step for other sprints if needed.

Now you can locally execute the Bats tests for your project. Ensure that you have the necessary setup and dependencies to match the GitHub Actions configuration.

**New Pages Added in Sprint 3:**

- /login - Login page
- /sign-up - Registration page
- /settings - User profile settings
- /messenger - Chat page
- /profile - Profile settings
- /password - Password change page
- /error.\*? - Error page

**Added Tests**

- HTTPTransport: Added a test to ensure the correct formation of query strings when making a GET request.
- Block: Introduced tests to verify the creation of components with state from the constructor, reactive behavior, setting events on elements, and calling the dispatch ComponentDidMount method.
- Router: Included tests for adding routes to the routes list, navigating to specified routes, calling middleware when changing routes, and returning the correct route for the specified path.
- LoginPage: Implemented a test to validate the correct display of login form errors.

Execute unit tests for specific components (replace `ComponentName` with the desired component):

    ```bash
    npm test ComponentName
    ```

For example:

    ```bash
    npm test HTTPTransport
    ```

**Note:**
The project runs on port 3000, and you can access it at [http://localhost:3000/](http://localhost:3000/).

Thank you for your interest in the Fast Chat project! Please note that the current version is intended solely for preview and exploration. 🌐

**Automatic Code Formatting and Linting:**

- ESLint: `npm run lint` or `yarn lint`
- Stylelint: `npm run lint:styles` or `yarn lint:styles`
- Prettier: `npm run format` or `yarn format`

**Contact:**

- Telegram: [@grozzzzny](https://t.me/grozzzzny)
- Instagram: [@grozzzny](https://t.me/grozzzzny)
- GitHub: [grozzzny](https://github.com/grozzzny)
