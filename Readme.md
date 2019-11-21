# Requirements

- xcode, Android Studio, xcode tools
- [node](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)
- [fastlane](https://fastlane.tools/) and appcenter plugin: `bundle exec fastlane add_plugin appcenter`
- [transcrypt]

# Install

## Decrypt secret files

1. Ask a project's developper for the transcrypt password
2. Run the following decrypt command

```bash
transcrypt -c aes-256-cbc -p '<password>'
```

All your secret files (including .secret keystores) are decrypted and you are now able to deploy to any environment.

## Install dependencies

```bash
yarn
```

## Install dependencies IOS

In ios directory, run:

```bash
bundle exec pod install --repo-update
```

If you have a problem with IOS build, delete the folder ios/Pods and relaunch the command.

## Development

Run the app on iOS emulator with

```bash
yarn run-ios
```

Run the app on Android with

```bash
yarn run-android
```

# Deploy

## Staging

### Hard deploy

#### Android

```bash
yarn deploy -e staging -o android -t hard
```

#### iOS

```bash
yarn deploy -e staging -o ios -t hard
```

### Soft deploy (code push)

#### Android

```bash
yarn deploy -e staging -o android -t soft
```

#### iOS

```bash
yarn deploy -e staging -o ios -t soft
```
