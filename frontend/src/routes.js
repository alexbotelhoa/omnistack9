import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login  from './pages/Login'
import Dashboard from './pages/Dashboard'
import Spot from './pages/Spot'

export default function Routes() {
   return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/spot" component={Spot} />
        </Switch>
      </BrowserRouter>
   )
}
