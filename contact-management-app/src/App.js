import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Add from './Components/Contacts/Add'
import List from './Components/Contacts/List'
import Update from './Components/Contacts/Update'
import Error from './Components/Error'
import About from './Components/About';
import NavigationBar from './Components/NavigationBar'
import ListGroup from './Components/Groups/ListGroup';
import AddGroup from './Components/Groups/AddGroup';
import UpdateGroup from './Components/Groups/UpdateGroup';

function App() {
  return (
    <div className="App">
      {/* Need a router so the user can navigate to different pages. */}
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={List}></Route>
          <Route path="/contact/add" component={Add}></Route>
          <Route path="/contact/update" component={Update}></Route>
          
          <Route path="/group/" exact component={ListGroup}></Route>
          <Route path="/group/add" component={AddGroup}></Route>
          <Route path="/group/update" component={UpdateGroup}></Route>

          <Route path="/about" component={About}></Route>

          <Route component={Error}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
