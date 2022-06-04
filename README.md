![logo](https://i.imgur.com/hy114pQ.png)

CPCForge is a web platform for end users to create and customize their own online judge platforms. The platform aims at helping smaller competitive programming organizations fluorish.

## Features
- Users can create problems, constraints, and test cases
- Users can build their platform with some customization and security
- Problems can be solved with **Python 3** and given test case feedback

## Running Locally

#### 1 - Installation
From the base `cpcforge` directory, install required Python dependencies via:
```
pip install -r requirements.txt
```

For cloning and setting up the dependencies on the frontend and backend:
```
$ git clone https://github.com/ptjung/cpcforge.git
$ cd cpcforge\cpcforge
$ python manage.py migrate
$ cd cpcforge\apps\frontend
$ npm i
```

#### 2 - Environment Setup
Create an `.env` file within the base `cpcforge` directory. Then, fill in the values for each of the following keys:
```
MONGODB_CONN_STRING - MongoDB connection URI
BASE_URL - Site's base URL
JWT_SECRET_KEY - Secret
DJANGO_SECRET_KEY - Secret
PISTON_API_KEY - Piston API key (optional)
```

#### 3 - Running
From the base `cpcforge` directory, run both of the following (development):
```
$ python manage.py runserver
$ npm run dev --prefix cpcforge\apps\frontend
```

## Todo
- Proper submission handling
- User roles with different permissions
- More platform settings and customization
- Leaderboards feature
- Implementing a more intuitive UI
- Implementing better security practices
- Support for user, platform, problem deletion
- Support for solving problems in more programming languages

## Built With

* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - For storing users, platforms, and submission logs
* [React.js](https://reactjs.org/) - Used for frontend development
* [Django](https://www.djangoproject.com/) - Executes the backend logic
* [Piston API](https://github.com/engineer-man/piston) - Allows user-based code execution

## License
Usage is provided under the [MIT License](http://opensource.org/licenses/mit-license.php). See LICENSE for the full details.