import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.openfront.app",
  appName: "OpenFront",
  webDir: "static",
  server: {
    androidScheme: "https",
    // In production, the app loads from bundled assets
    // For development, you can set url to your dev server
    // url: "http://YOUR_IP:9000",
    // cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1f2937",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
  android: {
    // Allow mixed content (HTTP resources on HTTPS page)
    allowMixedContent: true,
    // Build options
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
  },
};

export default config;
