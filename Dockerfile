FROM node:lts
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /usr/src/app

COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile && pnpm install

COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["pnpm", "start"]
