import React, {useState, useEffect} from 'react';
import CardList from '../components/CardList';
import ErrorBoundary from '../components/ErrorBoundary';
// import {robots} from './robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';


function App() {
  const [robots, setRobots] = useState([]);
  const [searchField, setSearchField] = useState('');
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        return response.json();
      })
      .then(users => {
        setRobots(users);
      });
  }, []);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  }

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase())
  });
  
  return (
    <div className='tc'>
      <h1>Robofriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
}

export default App;