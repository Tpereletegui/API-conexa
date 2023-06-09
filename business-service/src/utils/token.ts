const jwt = require('jsonwebtoken');

export function generateToken(userId: string): string {
  const secretKey = 'your-secret-key'; // Replace with your own secret key
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
}