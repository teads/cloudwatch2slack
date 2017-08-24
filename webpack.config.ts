import * as webpack from 'webpack';
import * as path from 'path';
import { CheckerPlugin } from 'awesome-typescript-loader';

declare var __dirname: string;

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist', 'files');

export const devConfig: webpack.Configuration = {
    devtool: 'cheap-source-map',
    entry: path.resolve(srcDir, 'index.ts'),
    target: 'node',
    externals: [
        /aws-sdk/
    ],
    output: {
        libraryTarget: 'commonjs2',
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
    performance: {
        maxAssetSize: 1500000,
        maxEntrypointSize: 1500000
    },
    plugins: [
        new CheckerPlugin(),
        new webpack.DefinePlugin({
            'process.env': 'process.env'
        })
    ]
}

export default devConfig;