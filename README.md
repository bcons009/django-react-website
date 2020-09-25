# django-react-website
Repo with Django/MongoDB back-end and ReactJS front-end.
Currently the project is connected to a MongoDB database created in MongoDB Atlas, a cloud database service. As of now there is no data being hosted on the database.

Based off of the [tutorial series by Traversy Media](https://www.youtube.com/playlist?list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60)

## Before running, make sure you have the following installed:
* NodeJS
* Python 3.x
* Visual Studio Code (at least that's what I used to run/edit all this)

## To run:
1. (First time setup) In the root directory of the repo, run `pip3 install pipenv`
2. Run `pipenv shell` to enter the virtual environment
3. Run `cd leadmanager`
4. Run `python manage.py runserver`
5. On your web browser, access `http://localhost:8000/`. You should get a simple "Hello World" page.

All of the "lead" and "leadmanager" naming was from the tutorial. Of course, we'll need to rename all those directories/files/variables, as well as any calls made to those. Files with directory/object calls that must be changed include...
* `leadmanager/leadmanager/settings.py` (has the most calls to other directories)
* `leadmanager/leads/models.py` (creates the "Lead" model, which we need to replace with models for food drive and user event locations)
* `leadmanager/leads/api.py` (Calls Lead model)
* `leadmanager/leads/serializers.py`
* `leadmanager/leads/apps.py`
* `leadmanager/leadmanager/asgi.py`
* `leadmanager/leadmanager/wsgi.py`
* `leadmanager/leads/urls.py` and `leadmanager/leadmanager/urls.py`
* `leadmanager/manage.py`

Besides renaming, we also need to...
* Delete/replace the "Lead" model in `leadmanager/leads/models.py` with our own models to use with our MongoDB database.
* Change the database settings in `leadmanager/leadmanager/settings.py` to connect to a new database
