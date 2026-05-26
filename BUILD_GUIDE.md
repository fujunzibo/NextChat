# NextChat 多平台桌面应用构建指南

## 概述

本文档说明如何为 NextChat 构建 Windows、macOS 和 Linux 的一键安装程序。

## 构建平台

✅ **Windows** - `.exe` / `.msi` 安装程序
✅ **macOS** - `.dmg` 磁盘镜像 (x64, arm64, universal)
✅ **Linux** - `.deb` 包 + `.AppImage` 便携式应用

## 自动构建 (GitHub Actions)

### 方法一：通过 GitHub Release 触发（推荐）

1. 在 GitHub 仓库页面，点击 **Releases**
2. 点击 **Draft a new release**
3. 填写版本号（如 `v2.16.1`）
4. 点击 **Publish release**
5. GitHub Actions 将自动开始构建所有平台

### 方法二：手动触发

1. 进入仓库 **Actions** 页面
2. 选择 **Release Desktop App** workflow
3. 点击 **Run workflow**
4. 可选输入版本号
5. 点击 **Run workflow**

## 必填的 GitHub Secrets

为了完成构建，您需要在 GitHub 仓库设置中添加以下 secrets：

### Windows 构建
- 无特殊要求（使用免费代码签名）

### macOS 构建（需要 Apple 开发者账号）

```bash
APPLE_CERTIFICATE       # Base64 编码的证书
APPLE_CERTIFICATE_PASSWORD
APPLE_SIGNING_IDENTITY # 如 "Developer ID Application: Your Name (TEAMID)"
APPLE_ID               # 您的 Apple ID
APPLE_PASSWORD         # 应用专用密码
APPLE_TEAM_ID          # 您的 Team ID
```

### Linux 构建
- 无特殊要求

### Tauri 代码签名（可选但推荐）

```bash
TAURI_PRIVATE_KEY      # 私钥
TAURI_KEY_PASSWORD     # 私钥密码
```

## 本地构建

### 前置要求

- Node.js 18+
- Rust 1.70+
- Yarn

### 安装依赖

```bash
# Windows
yarn install

# macOS
yarn install

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y \
  libgtk-3-dev \
  libwebkit2gtk-4.0-dev \
  libappindicator3-dev \
  librsvg2-dev \
  patchelf \
  libssl-dev \
  libayatana-appindicator3-dev
```

### 构建命令

```bash
# 构建所有平台的安装程序
yarn app:build

# 仅构建当前平台
yarn tauri build
```

### 构建产物位置

```
src-tauri/target/release/bundle/
├── windows/      # .exe, .msi
├── macos/        # .dmg
├── linux/        # .deb, .AppImage
```

## 代码签名说明

### Windows (可选)

Windows 构建默认不进行签名。如需签名，需要：
1. 购买代码签名证书
2. 在 GitHub Secrets 中添加证书信息

### macOS (强烈推荐)

未签名的 macOS 应用会在首次运行时被阻止。建议：
1. 加入 Apple Developer Program ($99/年)
2. 申请 Developer ID
3. 配置代码签名

### Linux

无需签名，可直接安装运行。

## 故障排除

### 构建失败：找不到 Rust 目标

```bash
rustup target add x86_64-unknown-linux-gnu
rustup target add aarch64-unknown-linux-gnu
rustup target add x86_64-apple-darwin
rustup target add aarch64-apple-darwin
rustup target add x86_64-pc-windows-msvc
rustup target add aarch64-pc-windows-msvc
```

### macOS 构建失败：权限问题

确保钥匙串中的证书可以正常访问，且证书未过期。

### Ubuntu 构建失败：缺少依赖

```bash
sudo apt-get install -y libgtk-3-dev libwebkit2gtk-4.0-dev
```

## 版本管理

版本号定义在 `src-tauri/tauri.conf.json` 中的 `package.version` 字段。

每次发布新版本时，请：
1. 更新 `tauri.conf.json` 中的版本号
2. 创建 GitHub Release
3. 构建系统将自动构建并附加安装程序
