import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

const replace = require('rollup-plugin-replace');

process.env.NODE_ENV = 'production';


export default {
    entry: 'site/site.js',
    sourceMap: false,
    format: 'iife',
    moduleName: 'infernoTest',
    dest: 'site/build/bundle.js',
    plugins: [
        babel(),
        resolve(),
        commonjs({
            // search for files other than .js files (must already
            // be transpiled by a previous plugin!)
            include: [
                'node_modules/*/**'
            ],
            extensions: [ '.js', '.coffee' ] // defaults to [ '.js' ]
        })
    ]
};
