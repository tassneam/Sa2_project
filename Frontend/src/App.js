import React, { useEffect, useState } from "react";
import { Login } from "./auth/Login.js";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from "./pages/Home/Home.js";
import { Register } from "./auth/Register.js";
import { CreateWarehouseForm } from "./pages/WarehouseForms/CreateWarehouseForm.js"; // Import the CreateProductForm component
import { UpdateWarehouseForm } from "./pages/WarehouseForms/UpdateWarehouseForm.js"; // Import the CreateProductForm component
import { UpdateProductForm } from "./pages/ProductForms/UpdateProductForm.js"; // Import the CreateProductForm component
import { CreateProductForm } from "./pages/ProductForms/CreateProductForm.js"; // Import the CreateProductForm component

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("isAuthenticated"));
    }, [isAuthenticated]);

    return (
        <Router>
            <Switch>
                <Route path='/register' component={Register} />
                <Route path='/create-warehouse' component={CreateWarehouseForm} />
                <Route path="/update-warehouse/:id" component={UpdateWarehouseForm} />
                <Route path="/update-product/:id" component={UpdateProductForm} />
                <Route path='/create-product' component={CreateProductForm} />
                {isAuthenticated && <Route path="/products" render={() => <Home  setIsAuthenticated={setIsAuthenticated} /> } />}
                <Route path='/' exact render={() => isAuthenticated? <Redirect to='/products' /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                <Redirect to='/' />
            </Switch>
        </Router>
    )
}

export default App;
