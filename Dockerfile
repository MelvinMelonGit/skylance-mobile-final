# Dockerfile

FROM openjdk:17-slim as build

# Install required packages
RUN apt-get update && apt-get install -y \
  curl wget unzip git nodejs npm yarn

# Install Android SDK
ENV ANDROID_SDK_ROOT /opt/android-sdk
RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools && \
    cd $ANDROID_SDK_ROOT/cmdline-tools && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip -O sdk.zip && \
    unzip sdk.zip -d latest && rm sdk.zip

ENV PATH="${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools:${PATH}"

RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install JS dependencies
RUN npm install

# Prebuild native project
RUN npx expo prebuild --non-interactive --no-install

# Build APK
WORKDIR /app/android
RUN ./gradlew assembleRelease

# Output location
# APK will be at: /app/android/app/build/outputs/apk/release/app-release.apk