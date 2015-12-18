<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="/css/main.css"/>
        <meta charset="UTF-8">
    </head>
    <body>
        <div class="page-container">
            <h1>Microlending</h1>
            <p>Loan's status is being refreshed on the frontend each 30 seconds. On backend loan's status is being changed to 'Approved' or 'Rejected' (with probability 0.7 and 0.3 accordingly) 100 seconds after loan was created, so after 2 minutes client will see status change. </p>

            <div id="app"></div>
        </div>

        <script>
            // globals constants
            var baseUrl = "{{app('url')->to('/')}}",
                dateFormat = 'YYYY-MM-DD',
                currency = '€';

            var existingLoans = {!! $loans !!};
        </script>
        <script src="/js/page-main.bundle.js"></script>
    </body>
</html>