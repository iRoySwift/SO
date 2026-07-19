# SO

基于 Expo SDK 57、React Native 和 Expo Router 开发的跨平台应用。

## 环境要求

- Node.js 和 npm
- iOS：Xcode、可用的 iOS Simulator Runtime、CocoaPods
- Android：Android Studio 和 Android SDK

检查 CocoaPods 是否可用：

```bash
pod --version
```

## 安装

```bash
npm install
```

检查 Expo 依赖和项目配置：

```bash
npm run check:expo
npx expo-doctor
```

## 日常开发

启动 Metro 开发服务器：

```bash
npm start
```

常用命令：

```bash
npm run android     # 编译并运行 Android
npm run web         # 启动 Web
npm run lint        # 代码检查
```

只修改 JavaScript、TypeScript 或样式时，通常只需保持 Metro 运行，无需重新编译原生 App。

## iOS 模拟器

编译并安装到默认 iOS 模拟器：

```bash
npx expo run:ios
```

模拟器不需要 Apple Developer 证书或 Provisioning Profile。

## iOS 真机

连接 iPhone 后执行：

```bash
npm run ios
```

当前 `npm run ios` 对应 `expo run:ios --device`，执行后选择目标设备。

首次真机运行需要在 Xcode 中配置签名：

1. 打开 `ios/SO.xcworkspace`。
2. 进入 **SO Target > Signing & Capabilities**。
3. 启用 **Automatically manage signing**。
4. 选择 Apple Developer Team。
5. 确认 Bundle Identifier 唯一且与 `app.json` 一致。

```bash
open ios/SO.xcworkspace
```

免费 Apple ID 可以用于真机调试，但开发签名有效期较短；发布到 App Store 需要加入 Apple Developer Program。

## 原生工程与 CocoaPods

新增原生依赖、修改 Expo Config Plugin 或升级 Expo SDK 后，重新生成并编译 iOS 工程：

```bash
npx expo prebuild -p ios
npx expo run:ios
```

`expo prebuild` 和 `expo run:ios` 通常会自动安装 Pods，不需要日常手动执行 `pod install`。自动安装失败或手动修改 `Podfile` 时再执行：

```bash
cd ios
pod install
cd ..
```

谨慎使用 `npx expo prebuild --clean`。该命令会删除并重新生成原生工程，可能覆盖手动修改的 Xcode 配置。

## EAS Development Build

需要 Expo 账号和 Apple Developer 账号：

```bash
npx eas build --profile development --platform ios
```

## 升级 Expo

升级 Expo SDK 后执行：

```bash
npm install expo@latest
npx expo install --fix
npm run check:expo
npx expo-doctor
npm run lint
```

升级 Expo SDK 或带原生代码的依赖后，需要重新编译 iOS 和 Android App。仅升级纯 JavaScript 依赖通常不需要重新编译。

不要仅根据 `npm outdated` 批量升级 Expo 生态依赖；使用 `npx expo install` 安装与当前 SDK 兼容的版本。

参考：[Expo SDK 升级指南](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)

## 常见问题

### iOS Simulator Runtime 不可用

在 **Xcode > Settings > Components** 中安装兼容的 iOS Simulator Runtime，然后重新选择可用模拟器。

### No profiles were found

该错误表示当前真机构建缺少匹配 Bundle Identifier 的开发签名。使用模拟器可避开签名；真机运行则需在 Xcode 中配置 Team 和自动签名。

## 文档

- [Expo 文档](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Development Build](https://docs.expo.dev/develop/development-builds/introduction/)
