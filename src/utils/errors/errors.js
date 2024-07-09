const errors = {
    error: { message: 'Error', statusCode: 400},
    emailFormat: { message: 'Wrong email format!', statusCode: 400},
    passFormat: { message: 'The password must be between 6 and 8 characters and at least one letter and one number!', statusCode: 400 },
    notVerified: { message: 'User not verified!', statusCode: 403},
    credentials: { message: 'Invalid credentials!', statusCode: 400},
    forbidden: { message: 'Forbidden!', statusCode: 403},
    auth: { message: 'Bad auth!', statusCode: 401},
    notFound : { message: 'Not Found!', statusCode: 404},
    fatal: { message: 'Fatal error', statusCode: 500}
}

export default errors