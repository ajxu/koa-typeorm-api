## 1.0 - Introduction

This app is for e-signature POC
We are using the following technology stack:

- [KoaJS](https://koajs.com/ 'KoaJS') for managing application architecture.
- [TypeORM](https://typeorm.io/#/ 'TypeORM') for database object relational mapping (ORM)
- [MySQL](https://www.mysql.com/ 'MySQL') for database solution.

## 2.0 - Installation

After cloning, in the root of project folder where the package.json file is found, please run the following command.

```bash
$ npm install
```

## 3.0 - Setup

### Database Setup

An .env.sample file is included, please duplicate the file and rename the copy as .env to fill out the required details. Please do not check-in .env file into repo. This needs to be done first for establishing a connection to database. If you have an existing MySQL instance already installed and running, you may skip the optional docker-compose file and proceed to enter the details of your settings into the .env file.

For complete guide to using the docker-compose.yml file to get MySQL up and running, please refer to Appendix 1.0

## 4.0 - Running in development mode

```bash
$ npm run dev
```

## 5.0 - Building and starting app

Building the app
```bash
$ npm run build
```

Running the app
```bash
$ npm run start
```

## 6.0 - Testing API

- Download [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client 'Rest Client') from VSCode Market place.
- Once it is install, you can try api from /test/rest/local folder.

---

# Appendix

## 1.0 Setup Database with docker-compose.yml file

### 1.1 - [OPTIONAL] Using the provided docker-compose yaml file to spin up MySQL

A docker-compose.yml file is included for your convenience to spin up MySQL container. Please download and install Docker Desktop on your computer first: [Download Docker Desktop](https://www.docker.com/products/docker-desktop 'Docker Desktop')

Please refer to the .env.sample file for example settings.

### 1.2 - Running and Shutting down the docker container

- Please note that docker-compose.yml will use **DB_PASSWORD** value as default password for database to be setup.
- Please note that docker-compose.yml will use **DB_PORT** value as default port number for database to be setup.
- Please do not change this setting as docker-compose.yml is a tracked file, please edit your password in the .env accordingly.
- Ensure that you have a valid .env file before proceeding on.
- Ensure that docker is installed and running on your computer.
- In the root of project folder where the docker-compose.yml file is found, please run the following command.

```bash
# run in daemon mode -d
$ docker-compose up -d
```

- To shut down the docker container after usage, in the root of project folder where the docker-compose.yml file is found, type the command:

```bash
$ docker-compose down
```

---