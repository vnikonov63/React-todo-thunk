# React-todo-thunk
In this project I made the React-based SPA, that allows you to register or login and write your todos. You can also modify your todos, deleting them, updating, marking as completed.
The server is set up in such a way, that it forces the delay of 1 second for each response and spits out  500 or 401 errors randomly . If you receive 401 error, the error message will be displayed.
In the case of 500 error the front would try out the request again and all the user would notice is a loading spinner.
