# Requirements

- XCode 
- Android Studio 
- XCode tools
- [node](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)
- [fastlane](https://fastlane.tools/) and appcenter plugin: `bundle exec fastlane add_plugin appcenter`
- [transcrypt](https://github.com/elasticdog/transcrypt)

# Install

## Decrypt secret files

1. Install transcrypt: 
   ```bash
   brew install transcrypt
   ```
2. Ask a project's developper for the transcrypt password
3. Run the following decrypt command
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

If you have a problem with iOS build, delete the folder ios/Pods and relaunch the command.

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

# Environments

There are currently two environments.

## Development

You need to run a server on localhost

## Staging

See file environments/.env.staging
