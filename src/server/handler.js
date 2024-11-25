const crypto = require('crypto');
const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData');
const getData = require('../services/getData');

const postPredictHandler = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;
  console.log(image);
  const { predictionLabel, suggestion } = await predictClassification(image, model);
  
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: predictionLabel,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  await storeData(id, data);

  return h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data,
  }).code(201);
};

const getPredictHistoriesHandler = async (request, h) => {
  const result = await getData();

  const data = result.map((item) => {
    return {
      id: item.id,
      history: {
        result: item.result,
        createdAt: item.createdAt,
        suggestion: item.suggestion,
        id: item.id,
      }
    };
  });
  
  return h.response({
    status: 'success',
    data: data,
  });
};

module.exports = { postPredictHandler, getPredictHistoriesHandler };