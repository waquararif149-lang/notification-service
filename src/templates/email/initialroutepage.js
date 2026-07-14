export const routePage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notification System API</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 40px; line-height: 1.6;">

    <h1>🚀 Notification System API</h1>

    <p>
        Welcome! The Notification System backend is running successfully.
    </p>

    <h2>Available Endpoints</h2>

    <ul>
        <li>POST /api/user</li>
        <li>POST /api/user/login</li>
        <li>POST /api/user/verify-otp</li>
        <li>POST /api/user/forgot-password</li>
        <li>POST /api/user/reset-password</li>
        <li>POST /api/device/register</li>
        <li>GET /admin/queues <strong>(Admin Only)</strong></li>
    </ul>

    <h2>Resources</h2>

    <p>
        📂 <strong>GitHub:</strong>
        <a href="https://github.com/waquararif149-lang/notification-service" target="_blank">
            Notification System Repository
        </a>
    </p>

    <p>
        📘 <strong>API Documentation:</strong>
        <a href="#">Swagger UI it will available soon.</a>
    </p>

    <p>
        🔐 <strong>Bull Board:</strong> Protected with JWT Authentication & Admin Authorization.
    </p>

</body>
</html>
`;