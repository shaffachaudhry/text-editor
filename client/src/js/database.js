import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//functionality to update content in the database.
export const putDb = async (content) => {
  // Open the 'jate' database with version: 1
  const jateDB = await openDB("jate", 1);
   // Start  a new transaction with the 'jate' object store for read-write access
  const tx = jateDB.transaction("jate", "readwrite");
  // Retrieve the object store
  const store = tx.objectStore("jate");
  //establishinhg the content into the object store with an id of 1
  const request = store.put({ id: 1, value: content });
  //await request completion
  const result = await request;
  // logging a success message 
  console.log("data uodated to the database!!", result);
};

// TODO: Add logic for a method that gets all the content from the database
// functionality to get all content in the database.
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  // Start a new transaction with the 'jate' object but this time for readonly access
  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
   
  console.log("data read!! ", result);

  return result.value;
}
// call the initdb function
initdb();
