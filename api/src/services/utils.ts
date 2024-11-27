export function generateUsername(firstName: string, lastName: string, email: string): string {
  // Remove any non-alphanumeric characters and convert to lowercase
  const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // Different username generation strategies
  const strategies = [
    // Strategy 1: First name + last initial
    () => `${sanitize(firstName)}${sanitize(lastName).charAt(0)}`,

    // Strategy 2: First initial + last name
    () => `${sanitize(firstName).charAt(0)}${sanitize(lastName)}`,

    // Strategy 3: First name + random numbers
    () => `${sanitize(firstName)}${Math.floor(Math.random() * 9999)}`,

    // Strategy 4: First name + last name
    () => `${sanitize(firstName)}${sanitize(lastName)}`,

    // Strategy 5: Email username (before @)
    () => sanitize(email.split("@")[0]),

    // Strategy 6: First initial + last name + random numbers
    () => `${sanitize(firstName).charAt(0)}${sanitize(lastName)}${Math.floor(Math.random() * 999)}`,
  ];

  // Select a random strategy
  const username = strategies[Math.floor(Math.random() * strategies.length)]();

  // Ensure username is not too short or too long
  return username.length < 3
    ? username + Math.floor(Math.random() * 999)
    : username.length > 20
    ? username.substring(0, 20)
    : username;
}
