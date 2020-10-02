Rem A very simple batch script that creates the dev build and starts up the server.
Rem (Trust me these commands get very annoying to type)

Rem Note: Piping of "npm run dev" output may hide any failed builds.
Rem When in doubt, run these commands separately.
@ECHO OFF 
npm run dev | python manage.py runserver