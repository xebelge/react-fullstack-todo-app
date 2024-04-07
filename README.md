Set-up

1. cloning the project from "https://github.com/xebelge/react-fullstack-todo-app.git"
2. write "yarn install" to the terminal.
3. write "yarn start" to the terminal.

and the application will start up.


How to Use the App

Log In:
When you open the app, you'll be asked to log in. If you don't have an account, you'll need to sign up.

Adding Todos:
Once logged in, you can start adding new tasks by tapping the "Add Task" button.

Listing and Filtering Todos:
Your tasks will be displayed on the main screen. Here, you can sort them by category or whether they've been completed.

Editing and Deleting Todos:
Each task has options next to it for editing or deleting, making it easy to manage your to-dos.


Database Setup

For using Firebase Realtime Database:

Start by creating a new project in the Firebase Console.
Head over to the "Realtime Database" section to initiate a database.
Go to the “Storage” section if you need file uploads.
Adjust the database and storage rules to fit the needs of your app.
Incorporate the configuration details found in your Firebase project settings into your .env file.


Operations with Todos

Add:
While adding a todo, you can specify details like the task name, category, and any associated image or file.

Update:
To change an existing todo, simply click the "Edit" button next to it.

Delete:
Removing a todo is as straightforward as hitting the "Delete" button next to the task you want to remove.

Change Status:
Mark a todo as complete by checking the box next to the task.


Additional Information

User sessions are managed through Firebase Auth.
Todos and their associated files are stored in Firebase Realtime Database and Firebase Storage.
Users can only access and manage their todos when they're logged in.
It's important not to share your .env file over git. Make sure it's listed in your .gitignore.


Feel free to fork or clone the project to customize the app as you like. If you run into any issues, don't hesitate to open an issue.
