export const updateDataByIndex = (key, indexValue, newData) => {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(process.env.PUBLIC_INDEXED_DB_NAME, process.env.PUBLIC_INDEXED_DB_VERSION);

        req.onerror = (event) => {
            reject('[ERROR] Failed to open the database');
        };

        req.onsuccess = ({ target }) => {
            const db = target.result;

            const transaction = db.transaction(key, 'readwrite');
            const objectStore = transaction.objectStore(key);

            const index = objectStore.index('id');
            const getRequest = index.get(indexValue);

            getRequest.onsuccess = ({ target }) => {
                const data = target.result;
                if (data) {
                    // 데이터 수정
                    const putRequest = objectStore.put({ ...data, ...newData });
                    putRequest.onsuccess = () => {
                        resolve('Data updated successfully');
                    };
                    putRequest.onerror = () => {
                        reject('[ERROR] Failed to update Data');
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