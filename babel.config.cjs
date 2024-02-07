module.exports = {
    presets: ["@babel/preset-env"]
}


/// START HERE 2024-02-04, GET TEST SUITE TO RUN, IMPLEMENT TEST AROUDN FILE TYPE UPLOAD
//using the JEST Test Suite errors from "$ npm test" how can I either:
// (1) remove dependency on Babel (by removing ESM Module: "file-type"), or
// (2) continue to configure babel for Jest to run approrpiately, using:
/// (2a) babael.config.cjs,
////// (2a-i) Why is babale.config.cjs's initial line underlined by linter in RED? 
/// (2b) package.json's "jest" object
