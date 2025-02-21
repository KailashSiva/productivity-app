import { jwtVerify, SignJWT } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'pk_test_c3BsZW5kaWQtYm9iY2F0LTY1LmNsZXJrLmFjY291bnRzLmRldiQ'; // Use environment variable for better security

export async function generateToken(payload) {
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(SECRET_KEY); // Convert secret to Uint8Array

    const token = await new SignJWT(payload)
        .setIssuedAt()  // Set issued time
        .setExpirationTime('4d') // Set expiration time
        .setProtectedHeader({ alg: 'HS256' }) // Set the algorithm for JWT signing (HS256)
        .sign(secretKey);  // Sign the token with the secret key

    return token;
}

export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY)); // Verify the token
        return payload;
    } catch (e) {
        console.error('Error verifying token:', e.message); // Log error for debugging
        return null;
    }
}
