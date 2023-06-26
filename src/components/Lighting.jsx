import React, { useEffect, useState } from 'react';
import InventoryForm from './InventoryForm'
import { getAuth,signOut } from 'firebase/auth';
import '../index.css'
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';


const Lighting = () => {

  const [ inventory , setInventory ] = useState([]);
  const currentUser = getAuth().currentUser;

  const fetchInventory = async () => { 
    const db = getFirestore();
    const inventoryCollection = collection(db, 'users', currentUser.uid, 'Inventory');
    const inventorySnapshot = await getDocs(inventoryCollection);
    const inventoryList = inventorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setInventory(inventoryList);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const deleteInventory = async (inventory) => {
    const user = getAuth().currentUser;
    const db = getFirestore();
    const inventoryRef = doc(db, 'users', user.uid, 'Inventory', inventory.id);  // use project.id here
    await deleteDoc(inventoryRef);
    toast('Inventory deleted', { type: 'success' });
    fetchInventory();
  };

  const updateCount = async (inventory, delta) => {
    const user = getAuth().currentUser;
    const db = getFirestore();
    const inventoryRef = doc(db, 'users', user.uid, 'Inventory', inventory.id);
    const newCount = inventory.count + delta;
    await updateDoc(inventoryRef, { count: newCount });
    fetchInventory();
  }

  const total = inventory.reduce((acc, item) => acc + item.count, 0);

  return (
    <div>
      <div className='border-b '>
        <InventoryForm onFormSubmit={fetchInventory}/>
      </div>
      <div className='border-t'>
        <div className='m-2 border-teal-300 items-center border rounded-md bg-lime-400 p-2'> <h2 className='text-center'>Total count: {total}</h2></div>
       
        {inventory.map((inventory, index) => ( 
          <div key={index} className="p-4 border-b space-x-3"> 
            <h2 className="text-xl">{inventory.type}</h2>
            <p>Quantity: {inventory.count}</p>
            <div className='justify-between items-center  space-x-5 '>
            <button className='border rounded-full p-1 bg-green-100' onClick={() => updateCount(inventory, 1)}>+</button>
            <button className='border rounded-full p-1 bg-red-100'  onClick={() => updateCount(inventory, -1)}>-</button>
            <button className='border absolute  rounded-md bg-red-700 p-1' onClick={() => deleteInventory(inventory)}>x</button> 
           
            </div>
         
          </div>
        ))}
      </div>  
    </div>
  )
}

export default Lighting;
