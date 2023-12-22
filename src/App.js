import './App.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Col } from 'antd';


function App() {
  const [titleName, setInputValue] = useState("");
  const onChangeHandler = event => {
    setInputValue(event.target.value);
 };

  var [data, setData] = useState([]);

  const search = async () => {

  const options = {
  method: 'GET',
  url: 'https://streaming-availability.p.rapidapi.com/search/title',
  params: {
    title: titleName,
    country: 'us',
    show_type: 'all',
    output_language: 'en'
  },
  headers: {
    'X-RapidAPI-Key': 'c259c447efmsh5b7db8c3a4ec44fp1b4ff1jsndb49ca8d8a9a',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
  setData(data = response.data["result"]);
} catch (error) {
	console.error(error);
}
  }
  

  return (
    <div className="App">
      <header className="App-header">
        Where2Watch
      </header>
      <body className='body'> 
        Search for any movie or show to find which OTT platform it is streaming on
        <p></p>
        <text className='note'>*note: multiple "addon" results means there are different addons on the same platform that can be used to watch the movie</text>
        <p></p>
      </body>
      <label for="search"></label>
      <input type="text"
      className='search-bar'
      placeholder='Movie/TV Show'
      name="title"
      onChange={onChangeHandler}
      value={titleName}
      >
        </input>
        <button onClick={search}>
          Search
        </button>
        <p></p>
        <table className='table' >
            <thead>
              <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Director(s)</th>
                <th>Streaming Service and Quality</th>
              </tr>
            </thead>
            <tbody> 
              {
                data.map(data => {
                    return (
                      <tr>
                      <td>{data["title"]}</td> 
                      <td>{data["year"]}</td> 
                      <td>{data["directors"]}</td>
                      {data["streamingInfo"]["us"]?.map(d => {
                        return (
                          <Col>
                          <td>{d["service"]}</td>
                          <td>{d["streamingType"]} </td>
                          <td>{d["quality"]}</td>
                          </Col>
                        )
                      })}
                      </tr>
                    )
                  })
              }
            </tbody>
        </table>
        <text className='end'><p></p>Created by Sritan Vemuru</text>
    </div>
  );
}

export default App;