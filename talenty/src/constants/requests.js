const baseUrl = process.env.BACKEND_URL || 'http://localhost:7800';

export const GET_TEMPLATES = `${baseUrl}/templates/system`;
export const POST_SIGN_UP = `${baseUrl}/register/hr`;
