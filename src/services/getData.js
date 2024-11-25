const { Firestore } = require('@google-cloud/firestore');

const getData = async () => {
  const db = new Firestore();

  const predictCollection = db.collection('predictions');
  const snapshot = await predictCollection.get();

  const data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
}

module.exports = getData;