# ---------- Build stage ----------
FROM openjdk:17-jdk-bullseye as build

ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV JAVA_HOME=/usr/local/openjdk-17
ENV PATH=$JAVA_HOME/bin:$ANDROID_SDK_ROOT/cmdline-tools/tools/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH

# Install system dependencies + Node.js 18
RUN apt-get update && apt-get install -y \
    wget unzip git curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Download and setup Android command line tools
RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip -O /tmp/tools.zip && \
    unzip /tmp/tools.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools && \
    rm /tmp/tools.zip && \
    mv ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools ${ANDROID_SDK_ROOT}/cmdline-tools/tools && \
    chmod +x ${ANDROID_SDK_ROOT}/cmdline-tools/tools/bin/sdkmanager

# Accept licenses and install SDK packages
RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

WORKDIR /app
COPY . .

RUN npm install
RUN npx expo prebuild --non-interactive --no-install

WORKDIR /app/android
RUN ./gradlew assembleRelease

# ---------- Release stage ----------
FROM python:3.11-alpine AS release

# Copy APK to dist folder
COPY --from=build /app/android/app/build/outputs/apk/release/app-release.apk /dist/app-release.apk

WORKDIR /dist
EXPOSE 8080

# Start a simple HTTP server
CMD ["python", "-m", "http.server", "8080"]