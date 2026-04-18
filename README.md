# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Development Build

1. 生成原生 iOS 工程

```zsh
npx expo prebuild -p ios
```

2. 安装 CocoaPods

```zsh
cd ios
pod install
cd ..
```

3. 编译并装到模拟器

```zsh
npm run ios
```

## 装到真机：

1. 用数据线连 iPhone

- 先执行

```zsh
npx expo run:ios --device
```

2. 选择你的设备

3. 第一次通常还要在 Xcode 里设置签名：

- 打开 ios/SO.xcworkspace
- Signing & Capabilities
- 选择你的 Apple ID Team
- 确保 Bundle Identifier 唯一

## 省掉本地 Xcode 调试，也可以走 EAS Development Build 装到手机

1. 登录 Expo 账号
2. Apple Developer 账号
3. 走云构建

```zsh
npx eas build --profile development --platform ios
```

## 项目依赖检测

```zsh
# 看 Expo 相关包是否和当前 SDK 对齐
npx expo install --check

# 查配置、依赖、原生工程等常见问题
npx expo-doctor

# 看普通 npm 包有没有新版本
# 但它不会判断这些版本是否“适配 Expo”
npm outdated
```
