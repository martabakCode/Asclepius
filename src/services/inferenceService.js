const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

const predictClassification = async (image, model) => {
  try {
    console.log('image', image)
    console.log('model', model)
    const tensor = tf.node
      .decodeImage(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();
  console.log('tensor', tensor)
    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['Non-cancer', 'Cancer'];

    const index = score.indexOf(Math.max(...score));
    const predictionLabel = confidenceScore <= 50 ? classes[index] : 'Cancer';

    let suggestion;

    if (predictionLabel === 'Non-cancer') {
      suggestion = 'Penyakit kanker tidak terdeteksi.';
    }

    if (predictionLabel === 'Cancer') {
      suggestion = 'Segera periksa ke dokter!';
    }

    return {
      predictionLabel,
      confidenceScore,
      suggestion,
    };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`);
  }
};

module.exports = predictClassification;