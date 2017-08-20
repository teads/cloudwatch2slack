import * as webpack from 'webpack';
import * as path from 'path';
import { CheckerPlugin } from 'awesome-typescript-loader';

declare var __dirname: string;

const srcDir = path.resolve(__dirname, 'src');
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
                    fix: true,
                    formatter: 'codeFrame',
                    typeCheck: true,
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
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
                options: {
                    useBabel: true,
                    useCache: true,
                    useTranspileModule: true
                }
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
}

export default config;