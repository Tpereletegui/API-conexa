export function validateUserCredentials(password: string, storedPassword: string): boolean {
    // Example: Compare the passwords directly
    return password === storedPassword;
  }