# syntax=docker/dockerfile:1

FROM openjdk:17-slim as build

ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=$ANDROID_SDK_ROOT/cmdline-tools/tools/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH

# Install system dependencies
RUN apt-get update && apt-get install -y \
  wget unzip git nodejs npm curl && \
  apt-get clean

# Download Android command line tools
RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    cd ${ANDROID_SDK_ROOT}/cmdline-tools && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip -O tools.zip && \
    unzip tools.zip -d tools && rm tools.zip

RUN yes | $ANDROID_SDK_ROOT/cmdline-tools/tools/bin/sdkmanager --licenses && \
    $ANDROID_SDK_ROOT/cmdline-tools/tools/bin/sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Set PATH to include sdkmanager
ENV PATH="${ANDROID_SDK_ROOT}/cmdline-tools/tools/bin:${ANDROID_SDK_ROOT}/platform-tools:${PATH}"

# Accept licenses and install SDK components
RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Set working directory for app
WORKDIR /app

# Copy app files
COPY . .

# Install JS deps
RUN npm install

# Prebuild native Android project (bare workflow)
RUN npx expo prebuild --non-interactive --no-install

# Build release APK
WORKDIR /app/android
RUN ./gradlew assembleRelease