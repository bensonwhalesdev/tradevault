// Define the structure of the context object that your Apollo handler returns.
// The 'user' property here corresponds to the 'return { user };' line in your route.ts.

// Interface for the decoded JWT payload
interface IAuthPayload {
  userId: string; // Assuming your JWT payload has a field named 'userId'
  email: string; // Add other properties you might need
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
}

// Define the final context interface passed to all resolvers
export interface IContext {
  // 'user' will be the decoded JWT payload if authentication succeeded, or null if not.
  user: IAuthPayload | null; 
}