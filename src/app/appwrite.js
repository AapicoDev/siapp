import { Client, Account, Databases, Storage, ID } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') //https://apigw.aapico.com/v1
    .setProject('66ced9640012cff87117'); // Replace with your project ID

const databases = new Databases(client);
export { databases };
export const account = new Account(client);
export { ID } from 'appwrite';

const storage = new Storage(client);
export { storage };

export const login = async (email, password) => {
    try {
        let accountData = await account.createEmailPasswordSession(email, password);
        console.log(accountData);
        return await account.get();
    } catch (error) {
        throw new Error("Login failed: " + error.message);
    }
};

export const getLoggedInUser = async () => {
    try {
        return await account.get();
    } catch (error) {
        throw new Error("Failed to get logged-in user: " + error.message);
    }
};
export async function fetchContactData(databaseId, collectionId, documentId) {
    try {
        const response = await databases.getDocument(
            databaseId,
            collectionId,
            documentId
        );
        return response;
    } catch (error) {
        console.error("Error fetching contact data:", error);
        throw error;
    }
}


export async function fetchData(databaseId, collectionId, query) {
    try {
        const response = await databases.listDocuments(
            databaseId,
            collectionId,
            query
        );
        return response;
    } catch (error) {
        console.error("Error fetching contact data:", error);
        throw error;
    }
}

export async function createDocumentOnServer(databaseId, collectionId, data) {
    console.log(databaseId, collectionId, data);

    try {
        return databases.createDocument(databaseId, collectionId, ID.unique(), data)
    } catch (error) {
        console.log(error);
        return null
    }
}

export async function fetchOneContactData(databaseId, collectionId, documentId) {
    try {
        const response = await databases.getDocument(
            databaseId,
            collectionId,
            documentId
        );

        // count scan
        console.log(response);

        await databases.updateDocument(
            databaseId,
            collectionId,
            documentId,
            { scan_count: response.scan_count + 1 },

        );

        return response;
    } catch (error) {
        console.error("Error fetching contact data:", error);
        throw error;
    }
}