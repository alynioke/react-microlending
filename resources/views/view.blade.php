<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="/css/main.css"/>
        <meta charset="UTF-8">
    </head>
    <body>
        <div class="page-container">
            <div id="app"></div>
        </div>

        <script>
            // globals constants
            var baseUrl = "{{app('url')->to('/')}}",
                dateFormat = 'YYYY-MM-DD',
                currency = '€';

            var loan = {!! $loan !!}
        </script>
        <script src="/js/page-view.bundle.js"></script>
    </body>
</html>