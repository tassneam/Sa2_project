import React, { useEffect, useState } from "react";
import { Login } from "./auth/Login.js";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from "./pages/Home/Home.js";
import { Register } from "./auth/Register.js";
import { CreateWarehouseForm } from "./pages/WarehouseForms/CreateWarehouseForm.js"; // Import the CreateWarehouseForm component
import { UpdateWarehouseForm } from "./pages/WarehouseForms/UpdateWarehouseForm.js"; // Import the CreateWarehouseForm component

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("isAuthenticated"));
    }, [isAuthenticated]);

    return (
        <Router>
            <Switch>
                <Route path='/register' component={Register} />
                <Route path='/create-warehouse' component={CreateWarehouseForm} /> {/* Add route for CreateWarehouseForm */}
                <Route path="/update-warehouse/:id" component={UpdateWarehouseForm} />
                {isAuthenticated && <Route path="/products" render={() => <Home  setIsAuthenticated={setIsAuthenticated} /> } />}
                <Route path='/' exact render={() => isAuthenticated? <Redirect to='/products' /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                <Redirect to='/' />
            </Switch>
        </Router>
    )
}

export default App;
