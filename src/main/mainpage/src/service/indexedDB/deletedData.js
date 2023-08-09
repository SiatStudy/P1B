export const deleteDataByIndex = (key, indexValue) => {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(process.env.PUBLIC_INDEXED_DB_NAME, process.env.PUBLIC_INDEXED_DB_VERSION);

        req.onerror = (event) => {
            reject('[ERROR] Failed to open the database');
        };

        req.onsuccess = ({ target }) => {
            const db = target.result;

            const transaction = db.transaction(key, 'readwrite');
            const objectStore = transaction.objectStore(key);

            const req = objectStore.index('id');
            const getRequest = req.get(indexValue);

            getRequest.onsuccess = ({ target }) => {
                const data = target.result;
                if (data) {
                    const deleteRequest = objectStore.delete(data.id);
                    deleteRequest.onsuccess = () => {
                        resolve('Data deleted successfully');
                    };
                    deleteRequest.onerror = () => {
                        reject('[ERROR] Failed to delete Data');
                    };
                } else {
                    reject('Data not found');
                }
            };

            getRequest.onerror = () => {
                reject('[ERROR] Failed to find Data');
            };
        };
    });
};
