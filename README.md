## Hosted app:

https://confused-ox-windbreaker.cyclic.app

## Project Summary:

This is portfolio project that uses JS, express, node, psql, nodepg, jest (and extensions) to create a fully operational back-end application. The basis for which is a board games review site. This application allows a user to query a database that hold information on users, reviews, categories of games and comments left on reviews using the api.

## Cloning:

Please feel free to clone this repo to run on your own local machine. To do so, please use the following link:

https://github.com/FimbulWinters/NC-games.git

This is a seperate repo (same code base) from the hosted version so any changes will not impact the live version.

## Dependancies:

This application is dependent on the following:

- Express

```
npm install express --save

```

- dotenv

```
npm i dotenv
```

- pg

```
npm i pg
```

- pg-format

```
npm i pg-format
```

- jest

```
npm install --save-dev jest
```

- jest supertest

```
npm i supertest
```

- jest-sorted

```
npm i jest-sorted
```

Alternatively, run the following to install all dependencies (please check version installed):

```
npm install
```

## Seeding local database:

This repo contains everything needed to create your own local version once the dependencies have been installed.
I have provided scripts to run in the terminal to make this as easy as possible, these are located in the package.json file.

Please run setup-dbs first to handle the database creation first.

## Testing:

This project uses Jest as a testing framework. All tests are located in the **tests** directory and are split into various files depending on the HTTP request being made.

please run the following to test:

```
npm t __tests__/<file name here>
```

please do NOT run npm t or npm test on its own- because the tests are split across multiple files running this will cause some of the tests to fail. Running each file individually will avoid this. I did this for clarity only.

## Setting up your db environment:

1. create two .env files: one for dev data and the other for test data:
   insert the following into the files: PGDATABASE=nc_games (append "\_test" for the test file)

   Database seeding files are included in the db directory

## minimum versions:

"dotenv": "^16.0.0",
"express": "^4.18.2",
"pg": "^8.7.3",
"pg-format": "^1.0.4",
"supertest": "^6.3.1"
"jest": "^27.5.1",
"jest-extended": "^2.0.0",
"jest-sorted": "^1.0.14"
