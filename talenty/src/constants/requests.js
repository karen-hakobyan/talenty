const baseUrl = process.env.BACKEND_URL || "http://localhost:7800";

export const GET_TEMPLATES = `${baseUrl}/templates/system`;
export const POST_SIGN_UP_HR = `${baseUrl}/register/hr`;
export const POST_SIGN_UP_JOB_SEEKER = `${baseUrl}/register/jobseeker`;