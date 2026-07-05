const resetPasswordTemplate = (resetLink) => `
<!DOCTYPE html>

<html>

<head>

<style>

body{
margin:0;
padding:0;
background:#f4f4f4;
font-family:Arial;
}

.container{
max-width:600px;
margin:40px auto;
background:white;
border-radius:10px;
overflow:hidden;
box-shadow:0 5px 20px rgba(0,0,0,.1);
}

.header{
background:#dc2626;
color:white;
padding:30px;
text-align:center;
}

.content{
padding:35px;
color:#444;
line-height:1.7;
}

.button{
display:inline-block;
margin-top:25px;
padding:14px 28px;
background:#dc2626;
color:white !important;
text-decoration:none;
border-radius:6px;
font-size:16px;
}

.footer{
text-align:center;
padding:20px;
font-size:13px;
color:#777;
}

</style>

</head>

<body>

<div class="container">

<div class="header">

<h1>Reset Password</h1>

</div>

<div class="content">

<p>
We received a request to reset your password.
</p>

<p>
Click the button below to continue.
</p>

<a class="button" href="${resetLink}">
Reset Password
</a>

<p>
This link will expire in <b>15 minutes</b>.
</p>

<p>
If you didn't request a password reset,
you can safely ignore this email.
</p>

</div>

<div class="footer">

Notification System

</div>

</div>

</body>

</html>
`;

export default resetPasswordTemplate;