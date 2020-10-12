# django-react-website
Repo with Django/MongoDB back-end and ReactJS front-end.
Currently the project is connected to a MongoDB database created in MongoDB Atlas, a cloud database service. As of now there is no data being hosted on the database.

Based off of the [tutorial series by Traversy Media](https://www.youtube.com/playlist?list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60)

## Before running, make sure you have the following installed:
* NodeJS
* Python 3.x
* Visual Studio Code (at least that's what I used to run/edit all this)

## To run:
1. (First time setup) Install dependencies using `npm install`
2. (First time setup) Run `pip3 install pipenv`
3. Run `pipenv shell` to enter the virtual environment
4. Change directories using `cd sfl-food-website`
5. Run `npm run dev`, then `python manage.py runserver` to build and run the dev build of the website.
6. (Optional) On Windows, you can instead run `run.cmd` to run both `npm run dev` and `python manage.py runserver`.
7. On your web browser, access `http://localhost:8000/`. You should get a simple "Hello World" page.
8. To create a production build, run `npm run build`.

Currently working on linking the OrgLocations (food drive organization locations, aka locations not made by users) table to the OrgSchedule (operating hours for food drive organization locations) table.