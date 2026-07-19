# Step-by-Step Android Application Guide & Google Play Store Requirements

This document guides you through packaging, testing, and distributing the **MALI Finance Application** as a native Android app using **Capacitor**, ensuring compatibility for all devices, and publishing it to the Google Play Store.

---

## 1. Running the App as an Android Application Locally

Since MALI is built with React, Vite, and Capacitor, it compiles to standard web assets (`dist`) which Capacitor then maps into an Android native wrapper project.

### Prerequisites
1. **Node.js**: Installed (version 18+ recommended).
2. **Java Development Kit (JDK)**: Install **JDK 17** (required for modern Gradle builds). Set your `JAVA_HOME` environment variable.
3. **Android Studio**: Download and install [Android Studio Jellyfish or later](https://developer.android.com/studio).
4. **Android SDK & Tools**:
   - Inside Android Studio, open the **SDK Manager** (Settings > Appearance & Behavior > System Settings > Android SDK).
   - In the **SDK Platforms** tab, install **Android 14 (API 34)** or later.
   - In the **SDK Tools** tab, make sure the following are checked and installed:
     - Android SDK Build-Tools
     - Android SDK Command-line Tools
     - Android Emulator
     - Android SDK Platform-Tools

### Step-by-Step Compilation & Sync
Follow these commands in your shell root (`c:\Users\kiruj\UTAJIRI\Finance`):

1. **Build the React Web Assets**:
   ```bash
   npm run build
   ```
   This generates a `dist` directory with your compiled web bundle.

2. **Sync Web Assets to the Android Native Wrapper**:
   ```bash
   npx cap sync android
   ```
   This command copies your compiled `dist` folder into the native Android module and installs any Capacitor plugin dependencies.

3. **Open Android Studio**:
   ```bash
   npx cap open android
   ```
   This opens Android Studio pointing directly to the `./android` project directory.

4. **Run on an Emulator or Physical Device**:
   - **Emulator**: Inside Android Studio, open the **Device Manager**, click **Create Device**, select a modern phone (e.g. Pixel 8) running Android 10+ (API 29+), download the system image, and start the emulator.
   - **Physical Device**: Enable **Developer Options** and **USB Debugging** on your Android phone, connect it to your PC, select it in the top toolbar dropdown in Android Studio, and click the green **Run** (Play) button.

---

## 2. Ensuring Compatibility with All Android Phones

To ensure your application is eligible and runs smoothly across different screen sizes, CPU architectures, and OS versions, verify these settings in your Android project files:

### A. Define Minimum and Target SDKs
Open `android/variables.gradle` or `android/app/build.gradle` and ensure:
- `minSdkVersion`: Set to **22** (Android 5.1 Lollipop) or **24** (Android 7.0 Nougat) to support over 95%+ of active devices globally.
- `targetSdkVersion`: Must match the latest Google Play Store baseline (currently **API 34 / Android 14**).

### B. Handle Multiple Screen Densities
Capacitor handles responsive scaling automatically through standard CSS viewports. However, you must supply launcher icons for all density buckets:
- Place icon assets inside `android/app/src/main/res/` folder structures under the correct mipmap folders (`mipmap-mdpi`, `mipmap-hdpi`, `mipmap-xhdpi`, `mipmap-xxhdpi`, etc.).
- Better yet, use the Capacitor Assets tool to generate all sizes automatically from a single high-res square logo:
  ```bash
  npm install @capacitor/assets -D
  npx capacitor-assets generate --android
  ```

### C. Build a Multi-Architecture App Bundle (AAB)
Instead of shipping a single heavy APK, build an **Android App Bundle (.aab)**.
- Google Play Console requires AAB. When uploaded, Google Play splits your app into specific CPU-tailored packages (arm64-v8a, armeabi-v7a, x86_64) and resources appropriate to the downloading device.
- This results in a smaller download size (often reduced by 50%) and complete hardware compatibility.

---

## 3. Google Play Store Submission Requirements

To upload your app onto the Play Store, you must meet the official Developer checklist:

### Step 1: Create a Google Play Developer Account
- Go to the [Google Play Console](https://play.google.com/console/signup).
- Register for an account. A **one-time registration fee of $25** is required.
- Set up and link a merchant profile if you intend to collect payments directly inside the application.

### Step 2: Implement Store Compliant Payments (Critical for Kenya)
Google Play Store policies require that **digital content/upgrades** sold within an Android app must use the official **Google Play Billing System**.
- **Important Policy**: Google allows third-party payment methods (like Lipa na M-Pesa APIs directly) in certain markets, but they strictly audit apps that bypass Google Play Billing for in-app upgrades.
- **Recommendation**: To remain fully eligible for the Play Store without risk of app suspension, integrate the **Capacitor Google Play Billing Plugin** (`@capacitor-community/keep-awake` or standard store billing plugins) so users can pay via Google Play, which supports M-Pesa as a billing provider inside Kenya natively!
- For this sandbox flow, we have created the M-Pesa STK simulation. For Play Store release, implement Google Play Billing in production.

### Step 3: Package your App for Production
In Android Studio:
1. Go to **Build** > **Generate Signed Bundle / APK...**
2. Choose **Android App Bundle** and click Next.
3. Generate or select a **Keystore Key** (save the passwords securely, as this key signs your application updates).
4. Select **release** build variant and click Finish.
5. Android Studio will generate the signed `.aab` file in `android/app/release/app-release.aab`.

### Step 4: Complete the Play Console Store Listing Tasks
Inside Google Play Console, you must provide:
- **App Details**: App Name, Short Description, Full Description.
- **Graphic Assets**:
  - App Icon (512x512 PNG, max 1MB)
  - Feature Graphic (1024x500 PNG)
  - At least 2 screenshots of the app on a phone (max 8MB per screenshot, 16:9 or 9:16 aspect ratio).
- **Privacy Policy**: A hosted privacy policy URL (required for apps that handle user profiles and payments).
- **Content Rating Questionnaire**: Answer questions about language, violence, and utility to receive your rating (e.g. Pegi 3).

### Step 5: Test and Release
1. **Set up Internal/Closed Testing tracks**:
   - Upload the `.aab` file.
   - Add testers to download and evaluate the app via Play Store invite links.
2. **Launch to Production**:
   - Submit the app for Google's review.
   - Review processes take anywhere between **3 to 7 days** for new developer accounts.
   - Once approved, the app goes live on the Google Play Store!
