# Contact Management System

This is a very simple contact management system with the API built in **.net** and the frontend built in **react**.  I've added the feature for users to create groups and assign contacts to a group.

## Build Instructions
If these build instructions don't work for you please let me know and I will make the appropriate changes.

### API
Open up the `ContactManagementAPI.sln` inside of the `ContactManagementAPI` folder and simply run the solution.  I've left the default launch option as the swagger platform for testing purposes.  There is a connection string to the database inside of the `Startup.cs` file.  You'll need to change the connection string to point to the location of your database.

### Database
The database is in `postgres` and designed with `dbSchema`.  Here is the entity relationship diagram.  [ERD](/readmepics/contactManagementSchema.png)
I've also included a create script if you don't want to use `dbSchema`.  The build script is located in the `Database` folder called `CreateDatabase.sql`.  After you have your database up and going don't forget to make sure the connection string inside of the API is pointing to the correct location. 

### Frontend
The frontend is built in `react` and is located in the `contact-management-app` folder which means `node` needs to be installed on your machine.  To run the app, simple run the following commands:
```ps
cd contact-management-app
npm install
npm start
```

## Todo

I'd like to add some unit tests to the API and the frontend.  Also, it would be nice to have some `css` for the webapp since there is currently none.