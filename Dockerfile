# 1. Use a specific, lightweight base image
FROM node:alpine3.22

# 2. Set the environment to production explicitly
ENV NODE_ENV=production

# 3. Set the working directory inside the container
WORKDIR /usr/src/app

# 4. Copy ONLY package files first (to leverage Docker layer caching)
COPY package*.json ./

# 5. Install exact dependencies (using 'ci' is best practice for builds)
RUN npm ci --omit=dev

# 6. Copy the rest of the application code
COPY . .

# 7. Change ownership to the built-in, non-root 'node' user
RUN chown -R node:node /usr/src/app

# 8. Switch to the non-root user for security
USER node

# 9. Document the port the container will listen on
EXPOSE 5000

# 10. Start the application
CMD ["node", "index.js"]