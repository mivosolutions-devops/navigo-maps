export const authPagesDataToCheck = [
  {
    page: "new-password",
    redirect: "/auth/sign-in",
    header: "Set new password",
    description: "Enter your new password",
  },
  {
    page: "otp",
    redirect: "/auth/recover-password",
    header: "OTP Verification",
    description:
      "We've sent an OTP code check your email (hugues@gmail.com) and fill it in.",
  },
  {
    page: "recover-password",
    redirect: "/auth/sign-in",
    header: "Recover password",
    description:
      "Opps. It happens to the best of us. Input your email address to fix the issue.",
  },
  {
    page: "recover-successful",
    redirect: "/auth/sign-in",
    header: "Password successfully recovered!",
    description: "Return to login page and use new password",
  },
];
