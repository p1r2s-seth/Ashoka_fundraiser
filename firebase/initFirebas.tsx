import { initializeApp, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

function initializeAppIfNecessary() {
  try {
    return getApp()
  } catch (any) {
    const firebaseConfig = {
      apiKey: 'AIzaSyCzWT5KCZSE_ILiU1FWXMmsL6XMi8BUp9g',
      authDomain: 'ashoka-fundraiser.firebaseapp.com',
      projectId: 'ashoka-fundraiser',
      storageBucket: 'ashoka-fundraiser.appspot.com',
      messagingSenderId: '505968989310',
      appId: '1:505968989310:web:4be3ee0144bca3ae09b42f',
      measurementId: 'G-NYZH5GR86S',
    }
    return initializeApp(firebaseConfig)
  }
}
const app = initializeAppIfNecessary()
const db = getFirestore(app)

export { db }
