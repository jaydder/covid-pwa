import React, { memo, useCallback, useState, useEffect } from "react";
import Api from "../../api";
import Board from "../components/Boards";
import { Container } from "./style";
import Panel from "../components/Panel";

function Main() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("brazil");
  const updateAt = new Date().toLocaleString();
  const getCovidData = useCallback((country) => {
    Api.getCoutry(country).then((data) => setData(data));
  }, []);

  useEffect(() => {
    getCovidData(country);
  }, [getCovidData, country]);

  const handleChange = ({ target }) => {
    const country = target.value;

    setCountry(country);
  };
  return (
    <Container>
      <div className="mb-2">
       <Panel
          data={data}
          updateAt={updateAt}
          onChange={handleChange}
          country={country}
          getCovidData={getCovidData}
        />
      </div>
      <Board data={data} />
    </Container>
  );
}

export default memo(Main);
