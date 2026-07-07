# Android Build Guide

## Prerequisites

- **Java JDK 21** (required for Capacitor 8 / Gradle 8.x)
- **Android Studio** (for building and debugging)
- **Android SDK** (API level 24+)
- **Android SDK Build Tools 36.0.0**
- **Android SDK Platform 36**

## Build Steps

### 1. Build Web Assets & Sync to Android

```bash
npm run android:build
```

This runs:

1. `npm run build-prod` - Builds the Vite production bundle to `static/`
2. `npx cap sync android` - Copies web assets to Android project

### 2. Open in Android Studio

```bash
npm run android:open
```

Or manually open `/android` folder in Android Studio.

### 3. Build APK

From Android Studio:

- Build → Build Bundle(s) / APK(s) → Build APK(s)

From command line:

```bash
cd android
./gradlew assembleDebug   # Debug APK
./gradlew assembleRelease # Release APK (requires signing config)
```

### 4. Install on Device

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## Configuration

### capacitor.config.ts

- `appId`: `io.openfront.app`
- `appName`: `OpenFront`
- `webDir`: `static` (Vite build output)

### Development with Live Server

To connect to a running dev server instead of bundled assets:

1. Edit `capacitor.config.ts`:

```typescript
server: {
  url: "http://YOUR_LOCAL_IP:9000",
  cleartext: true,
}
```

2. Run `npx cap sync android`
3. Build and run on device

### API URL Configuration

The game client uses `process.env.API_DOMAIN` for API calls. For Android:

- Set the appropriate API domain in `vite.config.ts` before building
- Or use the Capacitor native HTTP plugin for production

## Architecture

The Android app is a WebView wrapper that loads the same web client:

- **WebGL2 rendering** - Hardware accelerated via Android WebView
- **WebSocket** - Native WebSocket support in WebView
- **localStorage** - Enabled via `setDomStorageEnabled(true)`
- **Web Workers** - Supported for game simulation

## Troubleshooting

### WebGL Issues

- Ensure device supports OpenGL ES 3.0+ (most modern Android devices)
- Check `chrome://gpu` in WebView for WebGL status

### Performance

- App runs in fullscreen immersive mode
- Screen stays on during gameplay
- Hardware acceleration is enabled by default

### Network Issues

- `android:usesCleartextTraffic="true"` allows HTTP connections
- `android.permission.INTERNET` is required
