# Full Stack React, Node.js, Express, MongoDB, Mongoose and JWT authentication for credential repository management.

## Table of Contents
| Sections | Links | 
| ------------- |:-------------:|
| Description | [Click Me](#description) |
| Installation | [Click Me](#installation) |   
| Usage | [Click Me](#usage) |
| Accounts for usage | [Click Me](#accounts-for-usage) |
| Get help | [Click Me](#get-help)
| Contribution | [Click Me](#contribution) |

## Description
This is Full Stack application that integrates a React frontend with an Node.js/Express backend REST API. The backend makes use of MongoDB for storing credential repository and user information, while it uses Mongoose to perform CRUD operations on said information. On top of this, the backend makes use of JWT for authentication purposes. 

This application was created to manage the credential repositories (usernames and passwords) of a finctional company. This company has many different Organisational Units (OUs) such as News managamenet, Software reviews, Hardware reviews etc. Within each OU there lies a multitude of divisions as well for example: finance, IT, editing, development, writing etc.

Each user of this application can be assigned to multiple OUs and divisions and each user also has their own user roles such as Normal, Management or Admin.

* Normal users can read the credential repository, and add new credentials in.
* Management users can do the above plus update credentials.
* Admin users can do the above plus they can assign and unassign users from divisions and OUs. They can also change the user role of any user.

Thats where JWT comes in, in order to authenticate the user's roles.

## Installation
Clone this repository to your desired directory. Once fully downloaded you can open up the folder within your favourite IDE. Open a terminal and navigate to the directory where you've downloaded repository then run ```npm install```. This should install all the node_modules required for the backend of the application. After the installation has been completed, navigate to the frontend folder and then run ```npm install``` again. This will download all the node_modules that you need for the frontend of the application.

## Usage
Before you start the frontend folder navigate back to the backend folder (should be the root folder) make sure that all the dependecies are installed and then run ```npm start``` in order to get the server running. Only then can you navigate back to the frontend folder and run ```npm start```. The React app should open up on ```http://localhost:3000```. 

### Registering
You will be presented with a registration form where you can input the following: First name, Last name, Username, Password and the OU and division you are assigned. Note that you can add extra OUs and divisions as well.

NOTE: Registering will give you a Normal role by defualt, meaning that you won't be able to update the credentials in the repository that you are assigned to. This will also prevent you from viewing user information on the users page.

### Logging in
Once you're on the registration page there will be a link below that can redirect you to the login page. If you have an account (meaning you've already registered) you can login with you Username and Password.

### Home page
Once registered or logged in you will be redirected to the Home page. Here you can choose to either view the repositories page or the users page.

NOTE: If you don't have an Admin role you won't be able to view the users page.

### Repos page
Once on the repositories page, you be able to search for the repository that you would like to view.

NOTE: You can only view the repositories that you have been assigned to (the OUs and divisions that you have entered on the registration page). I you search for a repository that you are not assigned to, you will get an error message saying that you don't have permission to view it.

Once you have searched for the repository that you've been assigned to, a table with the credential information of the repo will appear. Here you can choose to add a new credential or update an existing credential. If there are now credentials available, you will still be able to add new credentials.

#### Adding credentials
After clicking on the `Add credentials` button, a form will appear asking you for the Credential Name, Username and Password click submit and you should receive a message saying you successfully added a new credential. 

#### Updating credentials
After clicking on the `Credentials` button found within the table's `Update` column, a form will appear asking you for the Credential Name, Username and Password the information within the input fields should be populated with the information of the credentials you chose to update.

NOTE: If you have a Normal role you wil receive an error message saying that you don't have permission to update repositories.

### Users page
Once on the users page, you'll see a table of all the users. Above the table is an input field that you can use to filter the table by the users first name of last name. Within the table underneath the `Update` column there are buttons you can click to update either the user details or user roles. Underneath the table you there will be a button where you can add a new user.

#### Adding a new user
Once you click on the `Add user` button a form will appear. This form has the same layout as the registration form see [here](#registering). After submitting you will receive a message saying that you have successfully added a new user.

#### Updating an existing user's details
Once you click on the `User details` button within the table's `Update` column a form will appear. This form has the same layout as the registration form see [here](#registering). The form will be populated with the information of the user you have chosen to update. After submitting you will receive a message saying that you have successfully updated the user.

#### Updating an existing user's roles
Once you click on the `User roles` button within the table's `Update` column a form will appear. This form consists of check boxes. The box that is checked when the form appears corresponds with the role the user currently has. Once you check another box, it will automatically update the user role to the box that has been checked. You will receive a message saying that you have successfully updated the users role.

## Accounts for usage
I have created three different user accounts each with different roles and their own OUs and divisions. You can use their information below in order to use the entire web application to its full potential. Type in the account's username and password on login page to log in with this account.

### Normal account

This account will only be able to view the repositories it has been assigned to and add new credentials to those repositories. This account will not be able to update existing credentials or view user information.

```
First name: "Alex"
Last name: "Meyer"
Username: "ALX43070"
Password: "@Lx4532"

OUs and divisions: [
    {OU: "news management", division: "writing"},
    {OU: "news management", division: "development"}
]
```

### Management account

This account will be able to view the repositories it has been assigned to, add new credentials to those repositories and update existing credentials. This account will not be able to view user information.
```
First name: "Michael"
Last name: "Scarn"
Username: "MichaelScarn@0456"
Password: "mikey$%#763"

OUs and divisions: [
    {OU: "news management", division: "IT"},
    {OU: "software reviews", division: "IT"}
]
```

### Admin account

This account will be able to view the repositories it has been assigned to, add new credentials to those repositories and update existing credentials. This account will not be able to view user information.

```
First name: "Kenny"
Last name: "Rogers"
Username: "KROG7567"
Password: "kenRGS@#5"

OUs and divisions: [
    {OU: "hardware reviews", division: "development"},
    {OU: "software reviews", division: "finance"},
    {OU: "opinion publishing", division: "finance"}
]
```


## Get help

Head over to StackOverflow if you get stuck with anything. There is a ton of information there regarding React, Node.js, Express, MongoDB, Mongoose and JWT!

## Contribution

I have been the sole contributor of this project.
