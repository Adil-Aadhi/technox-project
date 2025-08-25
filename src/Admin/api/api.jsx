function Api(){
    const users='http://localhost:3000/users';
    const products='http://localhost:3000/products'
    return{
        users,
        products
    }
}

export default Api