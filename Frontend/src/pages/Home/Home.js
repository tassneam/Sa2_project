import React, {useEffect, useState} from "react";
import classes from "./Home.module.css";
import {ProductCard} from "../ProductCard/ProductCard";
import {WarehouseCard} from "../WarehouseCard/WarehouseCard";

import {useHistory} from "react-router-dom";
import api, {getAllProducts, getWarehousesByUserId} from "../../api"; // Updated import statement

export const Home = ({setIsAuthenticated}) => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [productError, setProductError] = useState(false);
    const [warehouses, setWarehouses] = useState([]); // Updated state variable for warehouses
    const [warehouseError, setWarehouseError] = useState(false); // Updated state variable for warehouse error
    // const [weather, setWeather] = useState("");
    // const [weatherError, setWeatherError] = useState(false);
    const [latestProductAddedToCart, setLatestProductAddedToCart] = useState();
    const logoutHandler = () => {
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
        history.push("/");
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts(); // Using getAllProducts from API
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProductError(
                    "The Products Service is under maintenance and it will be back soon!, Thanks for your patience!!"
                );
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const userId = localStorage.getItem("userId")
                const response = await getWarehousesByUserId(userId); // Using getAllProducts from API
                setWarehouses(response.data);
            } catch (error) {
                console.error("Error fetching Warehouses:", error);
                setWarehouseError(
                    "The Warehouses Service is under maintenance and it will be back soon!, Thanks for your patience!!"
                );
            }
        };

        fetchWarehouses();
    }, []);

    const handleCreateWarehouse = () => {
        history.push("/create-warehouse"); // Redirect to the create warehouse form
    };


    // useEffect(() => {
    //     api
    //         .getWeather()
    //         .then((weather) => {
    //             console.log("weather", weather);
    //             setWeather(weather?.data?.value);
    //         })
    //         .catch((err) => {
    //             console.log("weather err", err);
    //             setWeatherError(
    //                 err?.response?.data?.message ||
    //                 "The Weather Service is under maintenance and it will be back soon!, Thanks for your patience!!"
    //             );
    //         });
    // }, []);

    return (
        <>
            {/*<span>Weather</span>*/}
            {/*<p className={classes.weather}>*/}
            {/*    {weatherError && <p className={classes.errorMsg}>{weatherError}</p>}*/}
            {/*    {!weatherError && weather}*/}
            {/*</p>*/}
            <span>Warehouses</span>
            <div className={classes.container}>
                {warehouseError && <p className={classes.errorMsg}>{warehouseError}</p>}
                {!warehouseError && (
                    <>
                        {warehouses?.length > 0 ? (
                            warehouses.map(({_id, name, location, capacity}, index) => (
                                <WarehouseCard
                                    key={index}
                                    details={{_id, name, location, capacity}}
                                    setLatestProductAddedToCart={setLatestProductAddedToCart}
                                />
                            ))
                        ) : (
                            <p className={classes.notFound}>No Warehouses found.</p>
                        )} <br/>
                        <button className={classes.createWarehouse} onClick={handleCreateWarehouse}>
                            Create Warehouse
                        </button>
                    </>
                )}
            </div>


            <br/>
            <span>Products</span>
            <div className={classes.container}>
                {productError && <p className={classes.errorMsg}>{productError}</p>}
                {!productError &&
                    (products?.length > 0 ? (
                        products.map(({_id, name, price, description}, index) => (
                            <ProductCard
                                key={index}
                                details={{_id, name, price, description}}
                                setLatestProductAddedToCart={setLatestProductAddedToCart}
                            />
                        ))
                    ) : (
                        <p className={classes.notFound}>No Products found.</p>
                    ))}
            </div>
            <button className={classes.logout} onClick={logoutHandler}>
                Logout
            </button>
        </>
    );
};
