# syntax = docker/dockerfile:1

# Use the official Bun image
FROM oven/bun:1 as base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config

# Install dependencies
COPY --link package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy application code
COPY --link . .

# Final stage for app image
FROM base

# Copy package files and install dependencies
COPY --link package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy application code
COPY --link . .

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
ENV PORT=3000

CMD [ "bun", "run", "app.js" ]