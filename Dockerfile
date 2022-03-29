#############################################################
FROM node:14.16.1-stretch-slim as nodejs_build

# Create app directory
WORKDIR /usr/src/app

# Install all dependencies. 
# Do it before copying source code will make Docker cache more useful.
COPY package.json .
RUN npm install

# Copy code
COPY . .

# Build Typescript
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

#############################################################
# Create production image
FROM node:14.16.1-stretch-slim as my_server

# Create app directory
WORKDIR /usr/src/app

# copy build artifacts
COPY --from=nodejs_build /usr/src/app/node_modules ./node_modules
COPY --from=nodejs_build /usr/src/app/dist ./dist

EXPOSE 8000
CMD [ "node", "dist/index.js" ]
