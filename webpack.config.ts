import * as webpack from 'webpack';
import * as path from 'path';

declare var __dirname: string;

const srcDir = path.resolve(__dirname, 'src', 'main');
const distDir = path.resolve(__dirname, 'dist', 'files');

const config: webpack.Configuration = {
    devtool: 'cheap-source-map',
    entry: path.resolve(srcDir, 'index.ts'),
    target: 'node',
    output: {
        path: distDir,
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    formatter: 'codeFrame'
                }
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tsfmt-loader',
                query: {
                    replace: true
                }
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}

export default config;