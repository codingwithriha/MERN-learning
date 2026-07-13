"use client";

import { useState } from "react";
import {
  useAuth,
  // useUser
} from "@clerk/nextjs";

export const Counter = () => {
  const [count, setCount] = useState(0);
  const {
    isLoaded,
    userId,
    // sessionId, getToken
  } = useAuth();
  //   const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !userId) {
    return null;
  }

  //   if (!isLoaded || !isSignedIn) {
  //     return null;
  //   }
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
};
