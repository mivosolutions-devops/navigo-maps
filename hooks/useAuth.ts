import { firebaseConfig } from "@/lib/firebase";
import { authService } from "@/services";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const useAuth = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await authService.logout();
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        Cookies.remove("currentUser", {
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_DOMAIN_NAME
              : "",
          path: "/",
        });

        toast.success("Logged out successfully!", {
          position: "top-center",
        });

        window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}?redirect_uri=${window.location.href}`;
      } else {
        toast.error("Failed to logout, try again later...");
      }
    },
    onError: (error: any) => {
      if (error?.response) {
        toast.error(
          error.response.data.message ||
            error.message ||
            "Action failed, try again!",
          { position: "top-center" },
        );
      } else {
        toast.error(
          "Network error, check your internet connection and try again!",
          {
            position: "top-center",
          },
        );
      }
    },
  });

  const logout = (message?: string) => {
    const currentUser = Cookies.get("currentUser");
    const tokens = currentUser ? JSON.parse(currentUser).tokens : null;

    if (tokens) {
      mutate();
    } else {
      toast.error("No valid session found to logout.");
    }
  };

  const logoutGoogle = () => auth.signOut();

  return {
    logout,
    logoutGoogle,
    isLoading: isPending,
  };
};

export default useAuth;
