import axios from "axios";

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callWeather(accessToken: any) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  // const options = {
  //   method: "GET",
  //   headers: headers,
  // };

  return await axios
    .get("https://localhost:7194/weatherforecast", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
