import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout';
import GameView from 'views/GameView';
import PlayersView from 'views/PlayersView';

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={PlayersView}/>
    <Route path='/game/:chosenGame' component={GameView}/>
  </Route>
);
