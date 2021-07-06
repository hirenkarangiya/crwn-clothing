import React from 'react';
import { Switch ,Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/HomePage.component';
import ShopPage from './pages/shop/Shop.component';
import SignInAndSignOut from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.action';

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

class App extends React.Component {

  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   };
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {

      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // userRef.onSnapshot(snapShot => {
        //   this.setState({
        //     currentUser: {
        //       id: snapShot.id,
        //       ...snapShot.data()
        //     }
        //   }, () => console.log(this.state));
        // });

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });

      } else {
        // this.setState({
        //   currentUser: userAuth
        // });

        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        {/* <Header currentUser={this.state.currentUser}/> */}
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          {/* <Route exact path='/signin' component={SignInAndSignOut} /> */}
          <Route exact path='/signin' render={ () => this.props.currentUser ? (<Redirect to="/" />): (<SignInAndSignOut />) } />
          <Route exact path='/hats' component={About} />
          <Route path="/hats/:userId" component={UserDetails} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStatetoProps = ({ user }) => ({
  currentUser : user.currentUser
});

const mapDispatchtoProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
