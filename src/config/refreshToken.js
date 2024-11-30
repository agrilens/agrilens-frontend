const refreshAccessToken = async (refreshToken) => {
  const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
  const url = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;

  const data = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const result = await response.json();

    const newAccessToken = result.access_token;
    const newRefreshToken = result.refresh_token;
    const expiresIn = result.expires_in;

    localStorage.setItem("userToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return { newAccessToken, expiresIn };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};

const setupTokenRefresh = (refreshToken) => {
  const refreshInterval = 3600 * 1000; // 1 hour

  setInterval(async () => {
    try {
      const { newAccessToken, expiresIn } =
        await refreshAccessToken(refreshToken);

      console.log("Access token refreshed successfully.");
      // Update your application state or UI with the new token if needed
    } catch (error) {
      console.error("Failed to refresh access token:", error);
    }
  }, refreshInterval - 120000); // Refresh 2 minute before expiration
};

export { refreshAccessToken, setupTokenRefresh };
