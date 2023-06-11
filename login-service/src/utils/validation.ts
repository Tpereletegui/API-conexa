export function validateUserCredentials(password: string, storedPassword: string): boolean {
    return password === storedPassword;
  }