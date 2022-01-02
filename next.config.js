const path = require('path');
const fs = require('fs');
const withPlugins = require("next-compose-plugins");
const withLess = require("next-with-less");

const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
// antd-theme-generator插件在上面的依赖项目中有，所以不需要安装
const { getLessVars } = require('antd-theme-generator');


//讀取自訂義的變量
const myAntdDarkTheme = require('./src/theme/myAntdDarkTheme.json');
const myAntdLightTheme = require('./src/theme/myAntdLightTheme.json');

// 这一步是读取我们预设的主要的主题变量（是不支持热更新的）
const themeVariables = getLessVars(path.join(__dirname, './src/theme/variable.less'));

// 读取暗黑主题
const darkVars = {
  ...getLessVars('./node_modules/antd/lib/style/themes/default.less'), //有一些變數在dark中沒有
  ...getLessVars('./node_modules/antd/lib/style/themes/dark.less'),
  ...myAntdDarkTheme
};

// 亮白主题
const lightVars = {
  ...getLessVars('./node_modules/antd/lib/style/themes/default.less'),
  ...myAntdLightTheme
};

// 这一步即使启动或构建项目时生成对应的主题文件，用于项目中import
// 最好的gitignore该生成的文件，每次自动生成
fs.writeFileSync('./src/theme/dark.json', JSON.stringify(darkVars));
fs.writeFileSync('./src/theme/light.json', JSON.stringify(lightVars));
fs.writeFileSync('./src/theme/theme.json', JSON.stringify(themeVariables));

// 这里就是theme插件的配置项了
const themeOptions = {
  stylesDir: path.join(__dirname, './src/theme'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/theme/variable.less'),
  themeVariables: Array.from(
    new Set([
      ...Object.keys(darkVars),
      ...Object.keys(lightVars),
      ...Object.keys(themeVariables)
    ])
  ),
  indexFileName: false,
  // 这里需要将生成的less文件放到一个生产环境能够直接通过link获取的地方，所以这里放到public下
  outputFilePath: path.join(__dirname, './public/color.less'),
  generateOnce: false,
};


const plugins = [
  [withLess, {
    lessLoaderOptions: {
      javascriptEnabled: true,
      importLoaders: 1
      },
  }],
];


const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  webpack: (config, options) => {
    config.plugins.push(new AntDesignThemePlugin(themeOptions));
    // modify the `config` here
    return config;
  },
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  }
};

module.exports = withPlugins(plugins, nextConfig);