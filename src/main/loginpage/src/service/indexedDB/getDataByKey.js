export const getDataByKey = (key) => {
    return new Promise((res, rej) => {
        const req = indexedDB.open(process.env.REACT_APP_PUBLIC_INDEXED_DB_NAME, process.env.REACT_APP_PUBLIC_INDEXED_DB_VERSION);


        req.onerror = (event) => {
            rej('[ERROR] Failed to open the database');
        };

        req.onupgradeneeded = (event) => {
            return false;
        }

        req.onsuccess = ({ target }) => {
            const db = target.result;

            const transaction = db.transaction(key, 'readonly');
            const objectStore = transaction.objectStore(key);
            const req = objectStore.getAll(key);

            req.onsuccess = ({ target }) => {
                res(target.result);
            };

            req.onerror = ({ target }) => {
                rej(false);
            };
        };
    });
};