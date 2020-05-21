import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Teste from './pages/Teste'

export default function Routes() {
   return (
      <BrowserRouter>
         <Route path="/" exact component={Teste} />
      </BrowserRouter>
   )
}
