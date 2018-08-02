## README

```
├── .vscode                   推荐的 vscode 配置和插件
├── configs                   配置文件目录
├── dist                      打包后的文件目录
├── mock                      mock 文件目录
├── scripts                   脚本文件目录
├── src                       源码目录
├── .editorconfig             编辑器通用配置文件
├── .gitignore                git 忽略文件
├── .stylelintrc.json         stylelint 配置文件
├── tsconfig.json             ts 项目配置文件
└── tslint.json               tslint 配置文件
```

### Environment

> 本工程开发时使用的是 `node v8.11.1`，`npm v6.0.0`，建议使用 **node v8.2.0** 和 **npm v5.2.0** 以上版本。


### [Code Style](http://git.azure.gagogroup.cn/efficiency/javascript-style-guide)

### Usage

* 克隆

  - 使用 css

    ```bash
    git clone http://git.azure.gagogroup.cn/efficiency/typescript-react.git your-project-name --depth 1 -b master
    ```

  - 使用 scss

    ```bash
    git clone http://git.azure.gagogroup.cn/efficiency/typescript-react.git your-project-name --depth 1 -b sass
    ```

* 重新设置 git
  ```bash
  git remote set-url origin your-git-repository-url
  git update-ref -d HEAD
  git add .
  git commit -m "feat(*): initial commit"
  ```
