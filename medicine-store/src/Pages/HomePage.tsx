import { useState } from "react";
import "../styles/App.css";
import { PageLayout } from "../components/PageLayout";
import Button from "react-bootstrap/Button";
import { callWeather } from "../weatherdata";
// import { loginRequest } from "../authConfig";
import { WeatherDataShow } from "../components/Weatherdatashow";
import weatherprops from "../interface/weather";
import BlockUI from "../Loader/BlockUI";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const ProfileContent = () => {
  const { accounts, instance } = useMsal();
  const [weatherDatam, setWeatherData] = useState<weatherprops[]>([]);
  const [isBlocking, setIsBlocking] = useState<boolean>();

  function RequestWeatherData() {
    setIsBlocking(true);
    // Silently acquires an access token which is then attached to a request for MS Graph data
    //var token = sessionStorage.getItem("accessToken");
    setWeatherData([]);
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        //var token = sessionStorage.getItem("accessToken");
        callWeather(response.accessToken).then((response) => {
          setIsBlocking(false);
          setWeatherData(response);
        });
      });
  }

  return (
    <>
      <br />
      <BlockUI blocking={isBlocking}></BlockUI>
      <Button variant="secondary" onClick={RequestWeatherData}>
        Request Weather Information
      </Button>

      <br />
      <br />

      {weatherDatam.length > 0 ? (
        <WeatherDataShow list={weatherDatam}></WeatherDataShow>
      ) : null}
    </>
  );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
  return (
    <div className="App">
      <ProfileContent />
    </div>
  );
};

export default function HomePage() {
  return (
    <PageLayout>
      <MainContent />
    </PageLayout>
  );
}
