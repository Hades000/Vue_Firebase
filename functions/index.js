const functions = require('firebase-functions')

var admin = require('firebase-admin')

var serviceAccount = require('./key.json')
// const { namespace } = require('firebase-functions/v1/firestore')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: functions.config().admin.db_url
})

const db = admin.database()
const fdb = admin.firestore()

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user
  const time = new Date()
  const u = {
    email,
    displayName,
    photoURL,
    createAt: time,
    level: email === functions.config().admin.email ? 0 : 5
  }

  await fdb.collection('users').doc(uid).set(u)
  u.createAt = time.getTime()
  await db.collection('users').doc(uid).set(u)
})

exports.deleteUser = functions.auth.user().onDelete(async (user) => {
  const { uid } = user
  await db.ref('users').child(uid).remove()
  await fdb.collection('users').doc(uid).delete()
})

exports.incrementBoardCount = functions.firestore.document('boards/{bid}').onCreate(async (snap, context) => {
  try {
    await fdb.collection('meta').doc('boards').update('count', admin.firestore.FieldValue.increment(1))
  } catch (e) {
    await fdb.collection('meta').doc('boards').set({ count: 1 })
  }
})

exports.decrementBoardCount = functions.firestore.document('boards/{bid}').onDelete(async (snap, context) => {
  await fdb.collection('meta').doc('boards').update('count', admin.firestore.FieldValue.increment(-1))
})
