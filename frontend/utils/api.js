import { getTokens, saveTokens } from "./token";
import Constants from "expo-constants";

const IP = Constants.expoConfig.extra.IP;

const API_BASE = `${IP}`;

export async function apiFetch(url, options = {}) {
  let accessToken = await getTokens("accessToken");

  let res = await fetch(`${API_BASE}${url}`, {
    ...options, //speads the methods and body passed to it
    headers: {
      ...(options.headers || {}), //spreads any custom header or nothing
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    const refreshToken = await getTokens("refreshToken");

    const refreshResponse = await fetch(`${API_BASE}/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      await saveTokens(data.accessToken, data.refreshToken);

      accessToken = data.accessToken;

      res = await fetch(`${API_BASE}${url}`, {
        ...options, //speads the methods and body passed to it
        headers: {
          ...(options.headers || {}), //spreads any custom header or nothing
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
    } else {
      throw new Error("Session expired");
    }
  }

  return res;
}
