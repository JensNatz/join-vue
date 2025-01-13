import { getFirebaseUrl } from '@/services/securityService';

const FIREBASE_URL = getFirebaseUrl();


export async function loadFromDatabase(path) {
    let response = await fetch(FIREBASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}


export async function postToDatabase(path, data) {
    let response = await fetch(FIREBASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let responseToJson = await response.json();
    return responseToJson;
}

export async function updateOnDatabase(path, data) {
    let response = await fetch(FIREBASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let responseToJson = await response.json();
    return responseToJson;
}

export async function deleteFromDatabase(path) {
    let response = await fetch(FIREBASE_URL + path + ".json", {
        method: "DELETE",
    });
    let responseToJson = await response.json();
    return responseToJson;
}
