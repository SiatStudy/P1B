export const addData = (key, data) => {
    return new Promise((res, rej) => {
        const req = indexedDB.open(process.env.PUBLIC_INDEXED_DB_NAME, process.env.PUBLIC_INDEXED_DB_VERSION);

        req.onerror = (event) => {
            rej('[ERROR] Failed to open the database');
        };

        req.onupgradeneeded = (event) => {
            const db = event.target.result;

            // 새로운 Object Store 생성
            if (!db.objectStoreNames.contains(key)) {
                const objectStore = db.createObjectStore(key, { keyPath: "id", autoIncrement: true });
                objectStore.add(data);
            }
        };

        req.onsuccess = ({ target }) => {
            const db = target.result;

            const transaction = db.transaction(key, "readwrite");
            const objectStore = transaction.objectStore(key);

            const req = objectStore.add(data);

            req.onsuccess = ({ target }) => {
                res(target.result);
            };

            req.onerror = ({ target }) => {
                rej('[ERROR] Failed to add Data');
            };
        };
    });
};