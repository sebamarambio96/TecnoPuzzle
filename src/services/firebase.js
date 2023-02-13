import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where, addDoc, updateDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCOzl-mgusqSZvzyl3mCBOcrF5O_JK3Heo",
    authDomain: "tecnopuzzle-react.firebaseapp.com",
    projectId: "tecnopuzzle-react",
    storageBucket: "tecnopuzzle-react.appspot.com",
    messagingSenderId: "495457892384",
    appId: "1:495457892384:web:b3cff8fd95d951c5f9e445",
    measurementId: "G-K6BN14HCXG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

//Retorna todos los item de la colección
export async function getItems(collectionFirebase) {
    //Se crea una referencia
    const itemsCollectionRef = collection(db, `${collectionFirebase}`)
    //Traer documentos de la selección
    const snapshot = await getDocs(itemsCollectionRef)
    const docsData = snapshot.docs.map(item => {
        return { ...item.data(), id: item.id }
    })
    return docsData
}
//Retorna elemento según su id
export async function getItemByID(collectionFirebase, id) {
    //Referencia a un documento
    const itemRef = doc(db, `${collectionFirebase}`, id)
    //Traer documentos de la selección
    const snapshot = await getDoc(itemRef)
    return { ...snapshot.data(), id: snapshot.id }
}
//Retorna productos por categoria
export async function getItemByCategory(categoryId) {
    //Referencia a documentos
    const itemsCollectionRef = collection(db, `products`)
    //query
    const queryCollectionFilter = query(itemsCollectionRef, where('category', '==', categoryId))
    const snapshot = await getDocs(queryCollectionFilter)
    //agregamos id
    const docsData = snapshot.docs.map(item => {
        return { ...item.data(), id: item.id }
    })
    return docsData
}
//Crear orders
export async function createOrder(cartList,precioFinal,dataForm) {
    const order= {}
    order.buyer = dataForm
    order.items = cartList.map(({ id, name, price,amount }) => ({ name, price, id,amount }))
    order.total = precioFinal
    //Creamos una referencia
    const collectionRef = collection(db, `orders`)
    //Enviar documentos
    addDoc(collectionRef,order)
    .then(resp=> console.log(resp))

}
//Actualizar stock
export async function updateStock(id,newStock) {
    //Referencia a un documento
    const itemRef = doc(db, 'products', id)
    //Actualizar datos de la selección
    updateDoc(itemRef, {
        stock:newStock
    })
}
