# webpack

## 介绍

webpack是个工具，协助开发者做项目管理、打包、模块管理、加载资源，并转换到对应环境，webpack是一种静态编译工具(预编译)，[官网](http://webpack.github.io/docs/)，[中文国内](https://webpack.docschina.org)

> 资源： js/css/html/png../woff/data/vue...
>
> 转换：loader

**前身**

grunt->gulp->browserify->webpack

**历史**

- webpack1	支持CMD和AMD，同时拥有丰富的plugin和loader，webpack逐渐得到广泛应用。
- webpack2    支持ES Module，分析ESModule之间的依赖关系，webpack1必须将ES，Module转换成CommonJS模块，2支持tree sharking

> tree sharking: 优化功能，顾名思义，就是将多余的代码给 “摇晃” 掉，在开发中我们经常使用一些第三方库，而这些第三方库只使用了这个库的一部门功能或代码，未使用的代码也要被打包进来，这样出口文件会非常大，tree-sharking 帮我们解决了这个问题，它可以将各个模块中没有使用的方法过滤掉，只对有效代码进行打包

- webpack3 新的特性大都围绕ES Module提出，如Scope Hoisting和Magic Comment

> Scope Hoisting: 	可以让 Webpack 打包出来的代码文件更小、运行的更快，它又译作 "作用域提升"，是在 Webpack3 中新推出的功能
>
> Magic Comment: 	魔法注释(magic comment)修改打包动态组件名称

## 目标

模块化，工程化（环境分离），自动化我们的开发环境，涉及到的知识点有入口、出口、转换器、插件

> development:
> 				a.浏览器调试工具
> 				b.注释、开发阶段的详细错误日志和提示
> 				c.快速和优化的增量构建机制
> 		production:
> 				a.开启所有的优化代码
> 				b.更小的main大小
> 				c.去除掉只在开发阶段运行的代码
> 				d.Scope hoisting(作用域提升)和Tree-shaking(打包的结构只包含实际用到的 exports)

## 环境要求

webpack4 ：Node8+、npm5+

## SPA

### 安装

**全局环境**

```js
npm i webpack webpack-cli -g
```

**项目环境**

```js
npm i webpack webpack-cli --save-dev
```

### 打包

```js
执行:  webpack 
//默认 会自动找src/index.js 到 dist/main.js

//要求设置开发模式|生产模式
执行:  webpack --mode development | production

//指定出入口
webpack 入口地址 --mode development  指定出口
```



### 依赖

Webpack 会分析入口文件，解析包含依赖关系的各个文件。这些文件（模块）都打包到 main.js 。Webpack 会给每个模块分配一个唯一的 id 并通过这个 id 索引和访问模块。在页面启动时，会先执行 main.js 中的代码，其它模块会在运行 require 的时候再执行。

### loader

类似一种转化器， 它可以把一个东西，转成另一个，webpack默认只支持javascript文件模块化，其他文件如需模块化，需要转换器(loader,加载器)，loader都需要安装

#### style-loader

编译好的css文件插到页面

#### css-loader

读取css文件，模块化

```js
 module: {
  rules: [
    { test: /\.css$/, use: ['style-loader', 'css-loader'] }
  ]
}
```



#### url-loader

把模块化引入的文件，转换base64

#### file-loader

模块化引入文件

```js
{
  test: /\.(png|jpg|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 5000,
        // outputPath:'images/',//大于5000字节，引文件
        name:'images/[name]-[hash:8].[ext]'
      }
    }
  ]
}
```

#### babel-loader

优雅降级， es6+  转换 es5，与他同款还有tracuer

**安装**

```js
npm install babel-loader @babel/core @babel/preset-env -D
```

> @babel/core 核心
>
> @babel/preset-env      解析目标 es6+ 包

**配置**

**webpack .config**

```js
module.exports = {
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/, 排除
        use:[{
          loader:'babel-loader',
          options:{ //相关配置 可以配置在webpack.config 亦可以配置在.bablerc
            presets: ['@babel/preset-env']
          }
        }]
      }	
    ]
  }
}
```

**.babelrc**

```js
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

### 配置

**命令式**

```js
webpack 入口地址 --mode development  指定出口
```

**coding**

```js
require('style-loader!css-loader!./assets/css/base.css')
```

**配置文件**

webpack.config.js 出现在项目根(package.json所在的位置)，webpack也可以依赖的第三方的配置文件（bablerc)，配置文件是一个nodejs文件

```js
//是一个nodejs
let path = require('path');

module.exports = {
  //入口
  entry: './src/main.js',//string object

  //出口
  output: {//要求必须是个对象,path的值一定要是磁盘路径
    path: path.join(__dirname, 'dist'),
    publicPath: '/', //公共路径
    filename: 'js/app.js'//输出后的文件名
  },

  //模块
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  
  //模式
  mode: 'production', //production  区别环境
}

```

### webpack-dev-server

搭建前端**开发环境服务器**，可以在开发环境下，浏览器热刷新，模块热重载（增量构建机制），默认自动打包（放到内存），创建前端开发型服务器(默认找webpack.config所在的位置，找index.html)

**配置**

```js
//scripts 命令行
"scripts": {
    "start": "webpack-dev-server --port 8080 --open --mode development"
  },
```

```js
//webpack.config.js配置文件
devServer:{
    port: 8081,//端口
    open: false, //开浏览器
    // contentBase: path.join(__dirname,'public'), //静态资源|html 托管位置
    inline:true, //浏览器热刷新
    // host:'127.0.0.1'  //主机地址
    // https: false , //开启https服务器,需要提供签名文件
    // progress: true, //开启打包进度
    overlay: true, //浏览器中显示全屏覆盖层。显示编译器错误
    proxy:{
      '/api':{
        target:'http://localhost:9001',
        /* pathRewrite:{
          '^/api': ''
        } */
      },
      '/douban':{
        target:'https://douban.uieee.com',
        pathRewrite:{
          '^/douban':''
        },
        secure: false //接受https的代理
      }
    },
    // watchContentBase: true, //监听public下的文件变动
  }
```



### devtool

代码错误没有报到正确位置，使用devtool，把代码错误指定到src源代码中

```js
module.exports={
  devtool:'inline-source-map'
}
```

### resolve

定义**文件名后缀**，省略引入时输入后缀

```js
module.exports={
  resolve:{
    extensions:['.js','.css','.json','.jsx','.vue']
  }
}
```

定义**别名**

```js
module.exports={
  resolve:{
    alias:{
      '@': path.resolve(__dirname,'src'),
      '~': path.resolve(__dirname,'public')
    }
  }
}
```



### 插件

所有的插件，都都需要安装，引入，在plugins选项里面实例化

#### html-webpack-plugin

产出html，动态给单页html做拷贝，及注入的工作

**安装**

```js
npm i html-webpack-plugin -S
```

**引入**

```jsx
//webpack.config
var HtmlWebpackPlugin = require('html-webpack-plugin');//插件==类
```

**配置plugins**

```js
module.exports = {
  plugins:[
    new HtmlWebpackPlugin({
      // title:'HTML标题',//html 浏览器的标题
      filename:'index.html',//输出到dist的文件名
      template:'./public/index.html',//要参考的html模板
      hash:true, //防止缓存,会给文件后面加入hash
      minify:{
        //是否去除空格，默认false
        collapseWhitespace: true,
        
        //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
        minifyCSS: true,
        
        //是否压缩html里的js（使用uglify-js进行的压缩）
        minifyJS: true,
        
        //是否移除注释 默认false
        removeComments: true,
      },
      favicon:'./public/favicon.ico',//配置网址图标
    })
  ]
}
```

> filename 参考 output配置

#### extract-text-webpack-plugin

css抽离

```js
//npm i extract-text-webpack-plugin@next -D
module.exports = {
  module:{
    rules:[
      /* { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'] 
      }, */
      { 
        test: /\.css$/, 
        use:  ExtractTextWebapckPlugin.extract({ // 接管style-loader
          use:'css-loader'
        })
      },
    ]
  },
  plugins:[
    new ExtractTextWebapckPlugin('css/[name][hash:6].css') //指向dist下面的css目录
  ]
}
```

#### mini-css-extract-plugin

css抽离

#### copy-webpack-plugin

资源copy，静态资源(js，数据图片，json) 拷贝到部署环境（生产环境)

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  plugins:[
    new CopyWebpackPlugin([
      { 
        from: path.resolve(__dirname,'public'), 
        to: path.resolve(__dirname,'dist/static') 
      }
    ])
  ]
}
```



#### transfer-webpack-plugin

资源copy，静态资源(js，数据图片，json) 拷贝到部署环境（生产环境)

#### ProvidePlugin

webpack系统插件，自动加载模块，而不必到处 `import` 或 `require` 

```js
const webpack = require('webpack')

module.exports = {
  plugins:[
    new webpack.ProvidePlugin({
      $: 'jquery',
      axios: 'axios'
    })
  ]
}
```

#### clean-webpack-plugin

```js
//打包前，清除 dist | build 目录
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  plugins:[
    new CleanWebpackPlugin.CleanWebpackPlugin()//清理output指定的 文件夹，在每次打包之前
  ]
}
```



#### SplitChunkPlugin

[参考](http://www.php.cn/js-tutorial-390965.html)

### 配置文件分离

不同的环境(开发，生产，测试)，不同的配置文件(dev,prod,test)

物料:  webpack-merge  给不同环境合并进去一些公共配置(common)

```js
//package.json
//设定 webpack.config -> webpack.config.dev|prod|common|test
"scripts": {
  "build": "webpack --mode production --config webpack.config.prod",
  "start": "webpack-dev-server --mode development --config webpack.config.dev",
  "test": "webpack-dev-server --mode development --config webpack.config.test",
  "server": "pm2 start ./xxx --name=8080node --watch"
},
```



## SPA for VUE

## SPA FOR REACT

### 一、 初始化项目

- 创建项目目录
- 初始化 npm 项目

```
npm init -y
```

- 初始化 git 项目

```
# 初始化项目
git init

# 添加 .gitignore
echo "/node_modules\n/build" >> .gitignore

# 关联远程仓库
git remote add origin <url>
```



### 二、 Webpack 配置



#### 2.1 基础配置设置

- 创建文件 `/src/index.js`作为 webpack 的入口文件

```
import React from 'react';
import reactDom from 'react-dom';

const App = () => (
  <div>
    test page
  </div>
);
reactDom.render(<App/>, document.getElementById('root'));
```

- 创建模板文件 `/public/index.html`webpack 打包后的文件将添加到该文件

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</meta></meta></head>
<body>
  <div id="root"/>
</body>
</html>
```

- 创建 `webpack`开发环境下配置文件 `/webpack/webpack.config.dev.js`

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
});

module.exports = {
  mode: 'development',                              
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {                                         
    path: path.resolve(__dirname, '../build'),      
    filename: 'js/[name].[hash].bundle.js',         
  },
  module: {
    rules: [              
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ],
  },

  plugins: [
    htmlWebpackPlugin,
  ],

  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
  },
};
```

- 创建 `webpack`生产环境下配置文件 `/webpack/webpack.config.js`

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
});

module.exports = {
  mode: 'production',  // 和开发环境下的配置只是修改了 mode                            
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {                                         
    path: path.resolve(__dirname, '../build'),      
    filename: 'js/[name].[hash].bundle.js',         
  },
  module: {
    rules: [              
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ],
  },

  plugins: [
    htmlWebpackPlugin,
  ],

  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
  },
};
```

- 创建 `babel`配置文件 `.babelrc`

```
{
  "presets": [
    "@babel/preset-react",
    "@babel/preset-env"
  ]
}
```

- 修改 `package.json`: 添加 npm 脚本

```
"scripts": {
+  "start": "webpack-dev-server --config ./webpack/webpack.config.dev.js --open",
+  "build": "rm -rf build/* && webpack --config ./webpack/webpack.config.js"
}
```

#### 2.2 安装基础插件包

webpack 相关依赖包、插件

- webpack: webpack 基础包
- webpack-cli: webpack cli 工具包
- html-webpack-plugin: webpack 插件, 用于将打包后的文件添加到指定的 html 内
- webpack-dev-server: webpack 开发环境工具, 创建一个开发环境
- babel-loader: weboack loader, 用于编译打包 js 文件
- @babel/core: babel 依赖包, 将 js 代码分析成 ast
- @babel/preset-react: webpack react 相关预设
- @babel/preset-env: weboack react 相关预设, 这样就可以使用最新的 js 相关语法

```
npm i webpack webpack-cli html-webpack-plugin webpack-dev-server babel-loader @babel/core @babel/preset-react @babel/preset-env -D
```

react 相关依赖包

- react
- react-dom

```
npm i react react-dom -S
```

#### 2.3 测试

1. 执行 `npm start`测试项目是否能够正常运行
2. 执行 `npm run build`测试是否能够正常对项目进行打包、编译, 编译后目录结构如下

```
.
├── index.html
└── js
    └── main.0b16f9b82b7fb2c9ba47.bundle.js
```

#### 2.4 总结

到这里一个最基本的 React 项目就已经搭建起来了, 但如果只是这些配置简单配置肯定是远远不够的, 上面只是为了说明其实要搭建一个 React 基础项目还是很简单的, 剩下的工作就是不断的根据具体需求扩充项目配置。下面开始会简单根据需要对项目的配置进行扩展, 比如：

- webpack 添加对 scss 样式文件的解析
- webpack 添加对图片的解析
- 项目添加 eslint 配置
- 项目添加版本发布、git commit 规范配置
- 项目添加对 antd 的支持, 并配置按需加载模块

### 三、 添加对 scss 样式文件的支持

#### 3.1 TODO

1. 添加对 css 样式文件的支持
2. 添加对 scss 样式文件的支持
3. 使用 mini-css-extract-plugin 将 mini-css-extract-plugin
4. 添加 css 模块化的支持, 对 `.module.css``.module.scss`的样式文件启用模块化

#### 3.2 webpack 配置修改

```
+ const MiniCssExtractPlugin = require('mini-css-extract-plugin');

+ const miniCssExtractPlugin = new MiniCssExtractPlugin({
+   filename: 'style/[name].[hash].css',
+   chunkFilename: 'style/[id].[hash].css',
+ });

+ const cssRegex = /\.(css|scss)$/;
+ const cssModuleRegex = /\.module\.(css|scss)$/;

module.exports = {
  module: {
    rules: [              
+     {
+       test: cssRegex,
+       exclude: cssModuleRegex,
+       sideEffects: true,
+       use: [
+         {
+           loader: MiniCssExtractPlugin.loader,
+           options: {
+             hmr: process.env.NODE_ENV === 'development',
+           },
+         },
+         { loader: 'css-loader', options: { importLoaders: 1 } },
+         'sass-loader',
+       ],
+     },
+     {
+       test: cssModuleRegex,
+       use: [
+         {
+           loader: MiniCssExtractPlugin.loader,
+           options: {
+             hmr: process.env.NODE_ENV === 'development',
+           },
+         },
+         {
+           loader: 'css-loader',
+           options: {
+             modules: {
+               localIdentName: '[local]__[hash:base64]',
+             },
+           },
+         },
+         'sass-loader',
+       ],
+     }
    ],
  },

  plugins: [
+   miniCssExtractPlugin,
  ],
};
```

#### 3.3 安装依赖

- css-loader
- sass-loader
- node-sass: scss
- mini-css-extract-plugin

```
npm i mini-css-extract-plugin css-loader sass-loader node-sass -D
```

#### 3.4 代码测试

创建 `src/index.css`

```
.css {
  padding-top: 20px;
}
```

创建 `src/index.module.css`

```
.module-css {
  padding-right: 20px;
}
```

创建 `src/index.scss`

```
.scss {
  padding-bottom: 20px;
}
```

创建 `src/index.module.scss`

```
.module-scss {
  padding-left: 20px;
}
```

修改 `src/index.js`

```
import React from 'react';
import reactDom from 'react-dom';
+ import css from './index.module.css';
+ import scss from './index.module.scss';
+ import './index.css';
+ import './index.scss';

const App = () => (
+ <div className="{`" +="" css="" scss="" ${css['module-css']}="" ${scss['module-scss']}="" `}="">
    test page
  </div>
);
reactDom.render(<App/>, document.getElementById('root'));
```

运行项目测试样式是否正确加载

### 四、 添加对图片的支持

> 这里其实没什么好讲的, 主要使用 `url-loader`对图片进行处理, 需要特别注意的是该插件依赖于 `file-loader`

#### 4.1 webpack 修改

```
module.exports = {
  module: {
    rules: [              
+     {
+       test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
+       use: [{
+         loader: 'url-loader',
+         options: {
+           limit: 10000,
+           name: 'assets/[hash].[ext]',
+         },
+       }],
+     },
    ],
  },
};
```

#### 4.2 依赖安装

```
npm i url-loader file-loader -D
```

#### 4.3 测试

没什么好说的, 找一张图片在 `src/index.js`中引用看是否能够正常显示即可

```
import React from 'react';
import reactDom from 'react-dom';
import Img from './1519971416-JDHjSqWCph.jpg';

const App = () => (
  <div>
    <img src="{Img}"/>
  </div>
);
reactDom.render(<App/>, document.getElementById('root'));
```

### 五、 esling 配置

#### 5.1 webpack 配置修改

这里只需在 `babel-loader`之后添加 `eslint-loader`, 需要特别注意的是它们的顺序

```
module.exports = {
  module: {
    rules: [  
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
+       use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};
```

#### 5.2 项目下添加 `.eslintrc.js`配置文件

```
module.exports = {
  parser: 'babel-eslint',
  // 开发环境设置: 在使用下拉环境中的全局变量时不会因为未定义变量而报错, 如 window
  env: {
    browser: true,          
    node: true     
  },

  // 定义全局变量, 在直接使用下列全局变量情况下不会因为未定义变量而报错
  globals: {
    _: true,
    lodash: true,
  },

  // 插件列表
  plugins: [
    'react',
    'import',
    'react-hooks',
  ],

  // 继承的规则
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],

  // 自定义规则列表  
  rules: {
    // 强制在每个语句后面使用分号
    "semi": [1, "always"], 
  }
}
```

#### 5.3 项目下添加 `.eslintignore`

```
# 设置需要忽略的文件
/src/assets/*
```

#### 5.4 安装依赖

- eslint
- babel-eslint
- eslint-loader
- eslint-plugin-import
- eslint-plugin-react
- eslint-plugin-react-hooks

```
npm i eslint babel-eslint eslint-loader eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks -D
```

#### 5.5 测试

修改 `src/index.js`

```
import React from 'react';
import reactDom from 'react-dom';

const App = () => (
  <div>
    test page
  </div>
)
reactDom.render(<App/>, document.getElementById('root'));
```

重新运行项目, 如果配置正常则会抛出警告

#### 5.6 添加 npm 脚本, 用于自动修复部分语法不规范的代码

```
"scripts": {
+   "eslint:fix": "eslint --fix ./src"
  },
```

通过执行 `npm run eslint:fix`则会修复项目中部分能够自动修复的不规范代码

### 六、 引入 Antd 并配置按需加载

这里主要为 `.babelrc`配置添加插件 `babel-plugin-import`从而实现 antd 的按需加载

#### 6.1 修改 `.babelrc`

说明: 配置插件时可以设置实例化名称 `import-antd`, 这样就可以多次使用同一插件, 如果你还需要使用 `babel-plugin-import`处理其他组件库

```
{
+ "plugins": [
+   ["import", {
+     "libraryName": "antd",
+     "libraryDirectory": "es",
+     "style": "css"
+   }, "import-antd"]
+ ],
  "presets": [
    "@babel/preset-react",
    "@babel/preset-env"
  ]
}
```

#### 6.2 依赖安装

```
npm i antd -S
npm i babel-plugin-import -D
```

#### 6,3 测试

在 `src/index`中引用样式, 测试是否能够正常使用

```
import React from 'react';
import reactDom from 'react-dom';
+ import { Button } from 'antd';

const App = () => (
  <div>
+   <Button type="primary">按钮</Button>
  </div>
);
reactDom.render(<App/>, document.getElementById('root'));
```

### 七、 版本发布、git commit 规范校验配置

这一节节选我另一篇文章 `commit 规范校验配置和版本发布配置`, 下面只介绍简单配置方法

#### 7.1 依赖包安装

```
# husky 包安装
npm install husky --save-dev

# commitlint 所需包安装
npm install @commitlint/config-angular @commitlint/cli --save-dev

# commitizen 包安装
npm install commitizen --save-dev
npm install commitizen -g

# standard-version 包安装
npm install standard-version --save-dev
```

#### 7.2 配置 commitlint 和 commitizen

```
# 生成 commitlint 配置文件
echo "module.exports = {extends: ['@commitlint/config-angular']};" > commitlint.config.js
# commitizen 初始化
commitizen init cz-conventional-changelog --save-dev --save-exact
```

#### 7.3 更新 package.json

> 脚本说明:
>
> 1. release: 自定义要发布的版本, 如: `npm run release -- 1.0.0`
> 2. release:100: 执行该脚本, 那么如果当前版本是 1.0.0 那么版本将被提升至 2.0.0
> 3. release:010: 执行该脚本, 那么如果当前版本是 1.0.0 那么版本将被提升至 1.1.0
> 4. release:001: 执行该脚本, 那么如果当前版本是 1.0.0 那么版本将被提升至 1.0.1

```
{
  "scripts": {
+   "commit": "git-cz",
+   "release": "standard-version --release-as",
+   "release:100": "npm run release -- major",
+   "release:010": "npm run release -- minor",
+   "release:001": "npm run release -- patch",
  },
+ "husky": {
+   "hooks": {
+     "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
+   }
+ }
}
```

#### 7.4 commit 方式

- 全局安装 commitizen 情况下可使用 `git cz`或者 `npm run commit`来提交代码
- 未全局安装 commitizen 情况下可使用 `npm run commit`来提交代码

#### 7.5 版本发布流程

```
# 1. 切换到指定分支
git checkout master
# 2. 更新代码
git pull origin master
# 3. 版本发布: 生成 CHANGELOG.md 并创建 tag
npm run release -- --release-as 1.0.0
# 4. 更新 tag 至远程分支
git push --follow-tags origin master
```

### 八、 更多配置

#### 8.1 webpack 拷贝 public 文件

```
+ const CopyWebpackPlugin = require('copy-webpack-plugin');

+ const copyWebpackPlugin = new CopyWebpackPlugin(
+   [{ from: path.resolve(__dirname, '../public') }]
+ );

module.exports = {
  plugins: [
+   copyWebpackPlugin,
  ]
};
```

#### 8.2 定义全局变量

```
+ const { DefinePlugin } = require('webpack');

+ const definePlugin = new DefinePlugin({
+   _DEV_: false,
+   GLOBAL_SERVICE: {
+     HOST: JSON.stringify('https://www.qianyin925.com:4000'),
+     GRAPHQL_URL: JSON.stringify('/graphql'),
+   },
+ });

module.exports = {
  plugins: [
+   definePlugin,
  ]
};
```

#### 8.3 自动加载依赖

```
+ const { ProvidePlugin } = require('webpack');

+ const providePlugin = new ProvidePlugin({
+   _: 'lodash',
+   lodash: 'lodash',
+ });

module.exports = {
  plugins: [
+   providePlugin,
  ]
};
```

#### 8.4 webpack 定义路径别名

```
module.exports = {
  resolve: {
+   alias: config.alias || {},
  },
};
```

#### 8.5 cross-env 设置环境变量

优点: 兼容多个平台

```
{
  "scripts": {
+   "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

#### 8.6 raw-loader 用于加载文本内容(.txt、.md 文件)

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(text|md)$/,
        use: 'raw-loader',
      },
    ]
  }
};
```

## MPA

```js
module.exports={
  entry: 入口接收string | json
			{app:'index1.js',app2:'index2.js'} 输出要求多输出
		output: {
			path:path.resolve(__dirname,'dist') //指定编译目录
			publicPath:'/', //公共路径 影响资源(图)路径，devserver路径，多页资源路径，开发生产环境基础资源路径，cdn路径
			filename:'bundle.js' 单文件输出 | '[name].js' 多输出  html引入app和app2 配合
		}
}
```



## vue-cli4 for MPA

## create-react-app for MPA