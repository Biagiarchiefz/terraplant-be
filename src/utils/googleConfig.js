export const verifyGoogleToken = async (accessToken) => {
  try {
    // Menggunakan access token untuk mendapatkan user info dari Google
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user info from Google");
    }

    const userInfo = await response.json();

    // Format payload agar sesuai dengan struktur yang diharapkan
    return {
      email: userInfo.email,
      name: userInfo.name,
      sub: userInfo.sub,
      picture: userInfo.picture,
    };
  } catch (error) {
    throw new Error("Invalid Google token");
  }
};
