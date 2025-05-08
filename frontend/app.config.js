import "dotenv/config";

export default {
  expo: {
    scheme: "LockIn",
    android: {
      package: "com.remy.LockIn", // <-- Add this line
    },
    "ios": {
    "bundleIdentifier": "com.remy.LockIn"
  },
    
    extra: {
      IP: process.env.IP,

      "eas": {
        "projectId": "64dfdc15-a6b5-43ad-8fb4-0acb160517fe"
      }
    },
  },
};
