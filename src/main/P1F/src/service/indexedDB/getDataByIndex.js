export const getDataByIndex = (key, indexValue) => {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(process.env.PUBLIC_INDEXED_DB_NAME, process.env.PUBLIC_INDEXED_DB_VERSION);

        req.onerror = (event) => {
            reject('[ERROR] Failed to open the database');
        };

        req.onsuccess = ({ target }) => {
            const db = target.result;

            const transaction = db.transaction(key, 'readonly');
            const objectStore = transaction.objectStore(key);

            const index = objectStore.index('title');
            const getRequest = index.getAll(indexValue);

            getRequest.onsuccess = ({ target }) => {
                const data = target.result;
                if (data && data.length > 0) {
                    resolve(data);
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
