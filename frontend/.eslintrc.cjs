// Purpose: required to prevent react $npm start' from throwign error: 
// NOTES:
//      .CJS Extension: Allows this module to be interpreted as CommonJS module instead of ES module (App is set to accept ES modules, see "package.js")
exports = {
    parser: '@babel/eslint-parser',
    extends: [
      'react-app/jest',
      'plugin:babel/recommended',
      'eslint:recommended',
      '@babel/plugin-transform-private-property-in-object', 
      'next/core-web-vitals'
    ],
    plugins: ['babel', 'import'],
    rules: {
      // 
    }
};




