import jwt from "jsonwebtoken";
import { serialize } from "serialize-javascript";
import cookie from "cookie";

const SALT_ROUNDS = 10; // Adjust based on security needs

const users = [
  { id: 1, email: "user1@example.com", password: "password123" },
  { id: 2, email: "user2@example.com", password: "password456" },
  { id: 3, email: "user3@example.com", password: "password789" },
  { id: 5, email: "mouaadhsahailia@gmail.com", password: "ADu8X_9jzpJY6FQ" },
];

export default async function handler(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // HTTPS-only in production
        maxAge: 60 * 60 * 24 * 7, // One week
        path: "/",
      })
    );

    // Send successful login response with user info (no token)
    res.status(200).json({
      message: "Logged in successfully",
      user: { email: user.email },
    });
  } else {
    console.log("wrong credintiels");
    res.status(401).json({ message: "wrong email" });
  }
}
