import weatherprops from "../interface/weather";
import Table from "react-bootstrap/Table";
import moment from "moment";
interface WeatherDataShowProps {
  list: weatherprops[]; // Define the prop type as an array of WeatherProps
}

export function WeatherDataShow({ list }: WeatherDataShowProps) {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature (C)</th>
            <th>Temperature (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {list.map((element, index) => (
            <tr key={index}>
              <td>{moment(element.date.toString()).format("DD MMMM YYYY")}</td>
              <td>{element.temperatureC}</td>
              <td>{element.temperatureF}</td>
              <td>{element.summary}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
