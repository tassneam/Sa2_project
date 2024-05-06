import axios from 'axios';

// Assuming these are the base URLs where your services are running
const usersServiceApi = axios.create({
    baseURL: 'http://localhost:8080',
});

const productsServiceApi = axios.create({
    baseURL: 'http://localhost:8081',
});
const warehousesServiceApi = axios.create({
    baseURL: 'http://localhost:8082',
});

// User API interactions
export const registerUser = payload => usersServiceApi.post('/Register', payload);
export const loginUser = payload => usersServiceApi.post('/Login', payload);
export const getAllUsers = () => usersServiceApi.get('/admin/getAllUsers');
export const updateUser = (id, payload) => usersServiceApi.put(`/admin/updateUser/${id}`, payload);
export const deleteUser = id => usersServiceApi.delete(`/admin/deleteUser?id=${id}`);

// Product API interactions
export const getAllProducts = () => productsServiceApi.get('/getAllProducts');
export const createProduct = payload => productsServiceApi.post('/admin/createProduct', payload);
export const updateProduct = (id, payload) => productsServiceApi.put(`/admin/updateProduct/${id}`, payload);
export const deleteProduct = id => productsServiceApi.delete(`/admin/deleteProduct?id=${id}`);

// warehouse API interactions
export const getWarehousesByUserId = userId => warehousesServiceApi.get(`/getWarehousesByUserId?userId=${userId}`);
export const createWarehouse = payload => warehousesServiceApi.post('/createWarehouse', payload);
export const updateWarehouse = ( payload) => warehousesServiceApi.put(`/updateWarehouse`, payload);
export const deleteWarehouse = id => warehousesServiceApi.delete(`/deleteWarehouse?ID=${id}`);
export const getWarehouseById = id => warehousesServiceApi.get(`/getById?ID=${id}`);
export const getWarehouseByName = name => warehousesServiceApi.get(`/getWarehouseByName?Name=${name}`);

// Exporting all API functions
const apis = {
    registerUser,
    loginUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getWarehousesByUserId,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    getWarehouseById,
    getWarehouseByName
};

export default apis;
