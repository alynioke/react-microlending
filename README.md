## Project dependencies

* PHP >= 5.5 (on dev machine: 5.5.11)
    * In case of problems with php extensions, view http://lumen.laravel.com/docs/installation#installation Server Requirements
* MySQL >= 5.6 (on dev machine: 5.6.16)
* [composer](https://getcomposer.org/)
* [nodejs](https://nodejs.org/)

## Installing the project

1. Run in console: `git clone https://github.com/alynioke/react-microlending.git`
2. Add virtual host for your web-server (For xampp as DirectoryRoot and Directory put path to `public` folder of the project, as DirectoryIndex `index.php`)
3. Create MySQL database (for instance `microlending`) with `utf8_unicode_ci` encoding.
4. Change following settings in .env file in the root directory according to your local database access:
    * DB_DATABASE
    * DB_USERNAME
    * DB_PASSWORD
5. Navigate to project's root directory  with console.
6. Run in console: `composer install`
7. Run in console: `php artisan migrate`
8. Run in console (this might take a while): `npm install`
    * If there will be npm errors during install try to run `npm install` again.
    * If there still will be npm errors try to delete whole `node_modules` folder and then run `npm install` again.
9. Run in console: `gulp deploy`
10. Go to host in web-browser.
11. Profit!

## For development
1. Put `<script src="/js/vendors.js"></script>` in `\resources\views\index.blade.php`
and \resources\views\view.blade.php before `<script src="/js/page-main.bundle.js"></script>`.
2. Run in console: gulp