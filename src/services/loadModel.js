const tf = require('@tensorflow/tfjs-node');

const loadModel = async () => {
  const modelPath = process.env.MODEL_URL;
  console.log(`Trying to load model from: ${modelPath}`);

	try {
		return await tf.loadGraphModel(modelPath);
	} catch (error) {
		console.error("Error loading model:", error);
		throw error;
	}
}

module.exports = loadModel;