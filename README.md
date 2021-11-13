# U For Umbrella

Live link of this site: https://u-for-umbrella.web.app/

## 1.About the Project

This project is a demo umbrella online shop. People can find and order their prefered umbrella.

### Routing and Private Routing

Users can route to any path available if they logged in. But, if they are not they can find or go to few limited route. Rest of the route is secured by private routing.

### Admin Routing

This is a special type of private routing. Only admin users are permitted to visit those routes. This creates a space from where admins of the sites can control the client data and access.

## 2.User Authentication System

This Project has a user authentication system which allows the users to login in two ways. This Authentication system has been developed with Firebase.

### Login With Google

Users can direcly login with their Google account.

### Login with Email & Password

or by email and password. If an user has not created account, he can also create his account.

## 3.Database Management

All the data used here is well organised and managed through Mongodb database mangaement system. All the actions perform with data, directly manupulate and implement to mongodb.

### Make Admin

Only an admin user can promote another user to admin. Then the new admin user will be able to visit admin routes as like as the other admin users.

### Add new product

on this page admin can add a new product. on a successful action a new package will be added on the document.

### Orders and Manage orders

Whenever an user confirm a order, a new order is added to the database
Admin users can manage the ordesr by shipping and cancel button. which will rewrite the database according to the action.

## 4.Back-end developement

Back end devolopement is performed by node js. A server site has been devoloped to give realtime data to the client server.

### Server site

Server site has been hosted by heroku.
Here is the link of the server site https://backend-umbrella-asif.herokuapp.com/

## 5. Front-end developement

### React js

The main development is done with react js which is a library of javascript.
Several development tools is used including react router, react hook, react hook form. A private Route was setup for authentication purpose.

### Design

All the design is done by both bootstrap and vanila CSS.

### Hosting

This fornt end client site has been hosted by firebase. The live site link has been given before.
