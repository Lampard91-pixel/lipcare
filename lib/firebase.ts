import { initializeApp, getApps } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!getApps().length) {
  if (Object.values(firebaseConfig).some((v) => !v)) {
    // Soft fail: initialization will error at usage time if not configured
    // You should set all NEXT_PUBLIC_FIREBASE_* env vars in .env.local
  }
  initializeApp(firebaseConfig as any);
}

export const storage = getStorage();

export async function uploadImageToStorage(file: File, folder: string = "products"): Promise<string> {
  const timestamp = Date.now();
  const cleanName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
  const storageRef = ref(storage, `${folder}/${timestamp}-${cleanName}`);
  const snapshot = await uploadBytes(storageRef, file, { contentType: file.type });
  const url = await getDownloadURL(snapshot.ref);
  return url;
}


