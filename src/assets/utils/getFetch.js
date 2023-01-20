
export async function getProducts() {
    const products = await fetch('./../src/assets/data/products.json')
    const productsParse = await products.json()
    return productsParse
}

getProducts()