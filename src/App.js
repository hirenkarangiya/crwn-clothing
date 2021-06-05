import { Switch ,Route } from 'react-router-dom';
import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/HomePage.component';
import ShopPage from './pages/shop/Shop.component';

const About = (props) => {
  console.log(props);
  return(
    <>
      <button onClick={ () => props.history.push('/') }>Home</button>
      <h2>About Page</h2>
    </>
  )
}

const UserDetails = (props) => {
  console.log(props);
  return(
    <h2>User Detail {props.match.params.UserDetails}</h2>
  )
}

const NotFound = (props) => {
  return(
    <>
    <h2>Page Not Found</h2>
    <button onClick={ () => props.history.push('/') }>Go back to Home page</button>
    </>
  )
}

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/hats' component={About} />
        <Route path="/hats/:userId" component={UserDetails} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
