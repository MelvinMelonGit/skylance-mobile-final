# syntax=docker/dockerfile:1

FROM openjdk:17-jdk-bullseye as build

ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=$ANDROID_SDK_ROOT/cmdline-tools/tools/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH

# Install system dependencies
RUN apt-get update && apt-get install -y \
  wget unzip git nodejs npm curl && \
  apt-get clean

# Download and setup Android command line tools
RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    cd ${ANDROID_SDK_ROOT}/cmdline-tools && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip -O tools.zip && \
    unzip tools.zip && rm tools.zip && \
    mv cmdline-tools tools && \
    chmod +x ${ANDROID_SDK_ROOT}/cmdline-tools/tools/bin/sdkmanager

# Accept licenses and install required SDK components
RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# Set working directory to app folder
WORKDIR /app

# Copy all project files
COPY . .

# Install npm dependencies
RUN npm install

# Prebuild native Android project (bare workflow)
RUN npx expo prebuild --non-interactive --no-install

# Build release APK
WORKDIR /app/android
RUN ./gradlew assembleRelease