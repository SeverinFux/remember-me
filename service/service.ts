import { get, push, ref, set, remove } from "@firebase/database";
import { useDatabase } from "../firebaseConfig";

export function writeRememberMeEntry(photo: string, details: string, location: string, time: Date) {
    console.log(time)
    const db = useDatabase;
    // Generate a unique ID for the new entry
    const newEntryRef = push(ref(db, 'remember-me'));
    const newEntryId = newEntryRef.key;
    // Use the unique ID to set the new entry data
    set(ref(db, `remember-me/${newEntryId}`), {
        id: newEntryId,
        image: photo,
        details: details,
        time: time.toLocaleTimeString(), //weird name cause time is reserved?
        date: time.toLocaleDateString(), //weird name cause time is reserved?
        location: location || 'Unknown location'
    }).then(() => {
        console.log('Data saved successfully!');
    }).catch((error) => {
        console.error('Error saving data: ', error);
    });
}

export async function getAllEntries() {
    const db = useDatabase;
    const snapshot = await get(ref(db, 'remember-me'));
    if (snapshot.exists()) {
        const entries = snapshot.val();
        // Transform the entries object into a list of objects
        return Object.keys(entries).map(key => ({
            id: key,
            ...entries[key]
        }));
    } else {
        console.log("No data available");
        return [];
    }
}

export async function deleteEntryById(id: string) {
    const db = useDatabase;
    remove(ref(db, `remember-me/${id}`))
        .then(() => {
            console.log(`Entry with id ${id} deleted successfully!`);
        })
        .catch((error) => {
            console.error(`Error deleting entry with id ${id}: `, error);
        });
}
