## App structures:

### File/folder Structre

- Grouping by features or routes `https://legacy.reactjs.org/docs/faq-structure.html`
- A feature will have it's own folder. The folder contains the React component, child components (if any), styles, and helper functions.

### File/folder naming conventions

- Folders: camelCase
- Components: PascalCase
- Styles:
  - filenames: PascalCase
  - global css: camelCase
  - classnames: kebab-case
- Image names: camelCase.png/jped/...

## How to start the app

1. Clone the repository

`git clone https://github.com/agrilens/agrilens-frontend.git`

2. Open the `agrilens-frontend` folder on your terminal on your terminal

`cd agrilens-frontend`

3. Start the app on local computer

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## How to contribute

1. Create your branch based off the `main` branch

   - Branch naming convention: `feature-<TICKET#>` eg. `feature-15`  
     git syntax: `git branch feature-15`

2. Build your component, add, commit push

   - `git add <PATH>`
   - `git commit -m "COMMIT MESSAGE"`
   - `git push origin feature-<TICKET#>`

3. Send a Pull Request before merging your branch.

4. Upon approval, merger your branch and delete the branch from the repository.

### Code linting

- 1. **ESLint**  
     ESLint is a tool for making code more consistent and avoiding bugs.

`npm run lint`

- 2. **Prettier**  
     Prettier is a code formatter that automatically formats your code to ensure consistency and adherence to specified style rules.

`npm run prettify`

- 3. **Husky**
     Husky is a tool that utilizes git hooks to ensure code consistancy before completing git actions.

## .env variable naming convention

- Environment variable names should start with `REACT_APP_`  
  Example:  
  `REACT_APP_EXAMPLE_API_KEY=gh:4tlsm-kebasdn_fklhn4aSfLmE-df_Alfdne`

- `.env` file is added to `.gitignore` so that it won't be pushed to the github repo.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Cypress component testing

**Cypress** is a next generation front end testing tool built for the modern web. `https://docs.cypress.io/guides/overview/why-cypress`

- Cypress helps you set up and start writing tests every day while you build your application locally.
- After building up a suite of tests and integrating Cypress with your CI Provider, Cypress Cloud can record your test runs.

### Test types:

1. End-to-end
2. Component
3. API

### Syntax:

- Open Cypress: `npx cypress open` or `npm run cy:open`  
  **_The app doesn't use TypeScript. You can ignore the `Couldn't find tsconfig.json` warnings._**
- For the development phase, we're doing `Component Testing` for isolated component building and testing.
- Cypress testing files will be positioned as a sibling to the original component file.  
   navBar/  
   NavBar.css  
   NavBar.cy.jsx  
   NavBar.jsx

## Firebase Integration

### Install Firebase SDK

- Run `npm install firebase`
- Initialize and configure firebase with **firebaseConfig = {}**
- Save the API keys and other properties under the `.env` file.

- Install Firebase CLI run  
   `npm install -g firebase-tools`

### Deploy to Firebase Hosting

- Run `npm run build` to prepare build folder.
- Sign in to Google: run `firebase login` Or to login into a different account `firebase login:use email@gmail.com`
- Initiate the project: run `firebase init`

  1.  ? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your  
       Scroll down and click the space-bar at `Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`
  2.  What do you want to use as your public directory? (public)
      type in `build`
  3.  Click enter for the subsequent default values.

- To serve the app locally run:
  1. (First time) `firebase init emulators` and select **_Hosting Emulator_**
  2. `firebase emulators:start`
- Deploy the web app: run `firebase deploy`

### How to set up GitHub Action to deploy on Firebase (If the app is already deployed)

- Run `firebase init hosting:github`

  1.  _? For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository)_ `agrilens/agrilens-frontend`
  2.  _? Set up the workflow to run a build script before every deploy?_ `Yes`
  3.  _? What script should be run before every deploy?_ `npm ci && npm run build`
  4.  _? GitHub workflow file for PR previews exists. Overwrite? firebase-hosting-pull-request.yml_ `No`
  5.  _? Set up automatic deployment to your site's live channel when a PR is merged?_ `Yes`
  6.  _? What is the name of the GitHub branch associated with your site's live channel?_ `main`
  7.  _? The GitHub workflow file for deploying to the live channel already exists. Overwrite? firebase-hosting-merge.yml_ `No`

- **Firebase CLI GitHub OAuth App:**     
  `https://github.com/settings/connections/applications/89cf50f02ac6aaed3484`    
- **GitHub Firebase secret:** `FIREBASE_SERVICE_ACCOUNT_AGRILENS_WEB`    

- **Firebase GitHub Hosting admin name :** `github-action-867998929`    

- Create a deploy channer for a preview channel that lasts for two days with ID *stage*:    
  `firebase hosting:channel:deploy stage --expires 2d`      

- To delete the preview channel:     
     `firebase hosting:channel:delete stage`  
 
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Libraries Used
- This project uses a variety of libraries and frameworks to streamline development and testing:

### React: Core library for building user interfaces
### Firebase: Backend and hosting platform
### Cypress: End-to-end and component testing framework
### ESLint: JavaScript linting tool
### Prettier: Code formatting tool
### Husky: Git hooks manager for enforcing code quality on commit
