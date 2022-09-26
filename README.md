# SocialDB, a client for Reddit

SocialDB is a project about building a client for Reddit based on OAuth2 technology. This project is built with a back-end developed in Java with Spring Boot, and a front-end developed with Angular and Bootstrap.

This project aims to provide users with a new way to access the main features of reddit, with some additions to improve their final experience.

This project will be based on a specifically developed base that includes the basic functionalities for the login with OAuth2. So that it can be useful for any user interested in learning how to develop this kind of applications. This base can be found on the following release: [v1.0.0](https://github.com/diego-vcandal/socialdb/releases/tag/v1.0.0)

## Features

> This section is currently being worked on :)

- Reddit OAuth2 login and logout
- View front page ?
- To be continued ...

## Technologies

> This section is currently being worked on :)

SocialDB currently uses the following technologies:

- OAuth2
- Spring Boot
- Angular
- Bootstrap
- MySQL

## Requirements

- Node v18.4.0+.
- Java 17.
- Maven 3.8.6+.
- MySQL 8.

## Installation

### Back-End

#### MySQL
For this project you will to install and configure the MySQL database server. You can make your preferred credentials configuration, for this case we assume a generic user 'root', with the password 'root'. 

Next is creating the database:
```sh
mysqladmin -u root create socialdb -p
```

And the only table that is currently in use:
``` SQL
CREATE TABLE oauth2_authorized_client (

  client_registration_id varchar(100) NOT NULL,
  principal_name varchar(200) NOT NULL,
  access_token_type varchar(100) NOT NULL,
  access_token_value blob NOT NULL,
  access_token_issued_at timestamp NOT NULL,
  access_token_expires_at timestamp NOT NULL,
  access_token_scopes varchar(1000) DEFAULT NULL,
  refresh_token_value blob DEFAULT NULL,
  refresh_token_issued_at timestamp DEFAULT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,

  PRIMARY KEY (client_registration_id, principal_name)
);
```

#### Application

First, you will need to configure a Reddit client to use the app, reading the following guidelines:

- https://www.reddit.com/wiki/api
- https://github.com/reddit-archive/reddit/wiki/API

Once done, it's needed to edit the [application.yml](socialdb-backend/src/main/resources/application.yml) with this settings, paying attention to the following fields:

- custom-user-agent - Specifies the user-agent header of the app. Reddit asks for a custom user agent to filter generic requests.
- client-id - The client id obtained in the reddit client configuration
- client-secret - The client secret obtained in the reddit client configuration
- scopes - This can be edited too. At this point only 'identity' is needed.

Once done, to execute the app, you can do the following from `/socialdb-backend`:
```sh
mvn spring-boot:run
```


### Front-End

To install the front-end app, you only need to execute the following commands from `/socialdb-frontend`:
```sh
npm install
npm start
```

You can access the application at http://localhost:4200/

## Architecture and design

> This section is currently being worked on :)

## License

[GNU General Public License v3.0](LICENSE)
