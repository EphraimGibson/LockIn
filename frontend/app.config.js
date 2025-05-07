import "dotenv/config";

export default {
  expo: {
    scheme: "LockIn",
    extra: {
      IP: process.env.IP,
    },
  },
};
