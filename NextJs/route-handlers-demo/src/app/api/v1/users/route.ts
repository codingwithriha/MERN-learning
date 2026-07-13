import { redirect } from "next/navigation";

export async function GET() {
  redirect("/api/v2/users");
}

// // Original v1 endpoint - basic user info
// type UserV1 = {
//   id: string;
//   email: string;
//   fullName: string; // Single name field
//   createdAt: string;
// };

// export async function GET() {
//   const users: UserV1[] = [
//     {
//       id: "550e8400-e29b-41d4-a716-446655440000",
//       email: "john@example.com",
//       fullName: "John Smith",
//       createdAt: "2024-01-15T08:30:00Z",
//     },
//     {
//       id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
//       email: "jane@example.com",
//       fullName: "Jane Wilson",
//       createdAt: "2024-02-20T14:15:00Z",
//     },
//   ];

//   return Response.json(users);
// }
