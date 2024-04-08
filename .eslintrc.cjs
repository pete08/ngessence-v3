// Purpose: required to prevent react $npm start' from throwign error: 
// NOTES:
//      .CJS Extension: Allows this module to be interpreted as CommonJS module instead of ES module (App is set to accept ES modules, see "package.js")
exports = {
    extends: [
      'react-app/jest',
      'plugin:babel/recommended'
    ],
    plugins: ['babel'],
    rules: {
      // 
    }
};




