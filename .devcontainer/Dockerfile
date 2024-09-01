FROM python:3.12

ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
    && apt-get -y install git iproute2 procps lsb-release

COPY ../.  /workspace

# Install poetry and python dependencies
ENV POETRY_VERSION=1.8.0
ENV POETRY_VIRTUALENVS_CREATE=false
RUN pip install "poetry==$POETRY_VERSION"
RUN poetry config virtualenvs.create false \
    && cd /workspace/backend && poetry install

# Install node for building front-ends through nvm
RUN apt-get update && apt-get -y install curl gnupg
ENV NVM_VERSION v0.40.1
ENV NODE_VERSION 20.17.0
ENV NVM_DIR /usr/local/nvm
ENV NVM_INSTALL_PATH $NVM_DIR/versions/node/v$NODE_VERSION
RUN mkdir $NVM_DIR
RUN curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh | bash

ENV NODE_PATH $NVM_INSTALL_PATH/lib/node_modules
ENV PATH $NVM_INSTALL_PATH/bin:$PATH
RUN . $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    nvm use default

RUN npm install yarn -g
RUN cd /workspace/frontend && yarn install

# Clean up
RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

ENV DEBIAN_FRONTEND=
