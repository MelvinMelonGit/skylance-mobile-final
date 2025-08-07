FROM openjdk:17-jdk-bullseye as build

ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=$ANDROID_SDK_ROOT/cmdline-tools/tools/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH

# Install system dependencies + Node.js 18
RUN apt-get update && apt-get install -y \
    wget unzip git curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Download and setup Android command line tools
RUN mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools && \
    cd ${ANDROID_SDK_ROOT}/cmdline-tools && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip -O tools.zip && \
    unzip tools.zip && rm tools.zip && \
    mv cmdline-tools tools && \
    chmod +x ${ANDROID_SDK_ROOT}/cmdline-tools/tools/bin/sdkmanager

RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

WORKDIR /app
COPY . .

RUN npm install

RUN npx expo prebuild --non-interactive --no-install

WORKDIR /app/android
RUN ./gradlew assembleRelease