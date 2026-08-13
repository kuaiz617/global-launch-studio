# VS Code 使用方法（Windows）

你不需要自己继续写项目。VS Code 主要用于打开、预览和以后修改文案。

## 最省事的方法

1. 解压项目 ZIP。
2. 确认电脑已经安装 Node.js 20 或更新版本。
3. 双击 `start-windows.bat`。
4. 浏览器会打开 `http://127.0.0.1:4173`。

## 在 VS Code 中运行

1. 打开 VS Code。
2. 选择 **File → Open Folder**，打开 `global-launch-studio` 文件夹。
3. 选择 **Terminal → New Terminal**。
4. 输入：

```bash
npm run demo
```

5. 打开浏览器访问：

```text
http://127.0.0.1:4173
```

## 测试

```bash
npm run check
npm test
```

这个版本不需要执行 `npm install`，因为没有第三方依赖。
