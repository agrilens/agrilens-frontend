
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
    git syntax:     `git branch feature-15`

2. Build your component, add, commit push    
    - `git add <PATH>`    
    - `git commit -m "COMMIT MESSAGE"`    
    - `git push origin feature-<TICKET#>`    

3. Send a Pull Request before merging your branch.

4. Upon approval, merger your branch and delete the branch from the repository.


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

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
