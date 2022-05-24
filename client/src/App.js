import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import RecipeDetail from './components/RecipeDetail/RecipeDetail.jsx';
import NewRecipe from './components/NewRecipe/NewRecipe.jsx'
import NotFound from './components/NotFound/NotFound';


function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/recipe' component={NewRecipe} />
          <Route exact path="/recipes/:id" component={RecipeDetail} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
