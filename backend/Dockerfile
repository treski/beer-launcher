# Name the node stage "builder"
FROM node:20-slim
# Set working directory
WORKDIR /app
# adds node_modules to PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install Python and build tools for better-sqlite3
# RUN apt-get update \
#     && apt-get install -y \
#         python3 \
#         make \
#         g++ \
#         sqlite3 \
#         libsqlite3-dev \
#     && rm -rf /var/lib/apt/lists/*

# copy local files to /app
COPY . /app

# install node modules and build assets
RUN npm install

EXPOSE 80

EXPOSE 1883

CMD ["node", "app.js"]