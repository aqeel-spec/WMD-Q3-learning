import toast from "react-hot-toast";
import { cookies } from "next/dist/client/components/headers";

export const logout = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
       // remove the token and user info from local storage to log out
        toast.success(data.status);
      } else {
        // Handle non-OK responses if needed
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please check console for details.");
    }
  };