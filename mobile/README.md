# MindMyMap Mobile

MindMyMap uses [Capacitor](https://capacitorjs.com) to wrap the web app as a native Android and iOS app.

## First-time setup

Run these once after cloning, from the `web/` directory:

```bash
cd web
npm ci
npm run build:dist

# Add platforms (creates web/android/ and web/ios/)
npx cap add android
npx cap add ios        # macOS only

# Commit the generated native projects
git add android ios
git commit -m "feat(mobile): init Capacitor native projects"
```

## Daily development

```bash
cd web

# Build web app + sync to native projects
npm run cap:sync

# Open in Android Studio
npm run cap:android

# Open in Xcode (macOS only)
npm run cap:ios
```

## Building a release APK (Android)

```bash
cd web/android
./gradlew assembleRelease
# APK → web/android/app/build/outputs/apk/release/
```

For a signed APK, configure a keystore in `web/android/app/build.gradle` and set:
```
KEYSTORE_PATH, KEY_ALIAS, KEYSTORE_PASSWORD, KEY_PASSWORD
```
as environment variables or Gradle properties.

## Building for iOS

Open Xcode via `npm run cap:ios`, select a signing team, then **Product → Archive**.

## CI

The `release.yml` workflow builds a debug APK automatically when a version tag is pushed,
provided `web/android/` has been committed to the repository.
