import * as webpack from 'webpack';
import { devConfig } from "./webpack.config";

const buildReleaseConfig = (config: webpack.Configuration): webpack.Configuration => {
    config.devtool = 'source-map';
    const plugins = config.plugins || [];
    config.plugins = plugins.concat(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    )
    return config;
}

const releaseConfig = buildReleaseConfig(devConfig);

export default releaseConfig;