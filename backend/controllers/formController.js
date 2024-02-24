const FormModel = require('../model/formModel');

exports.postQA = async (req, res) => {
  try {
    await FormModel.create(req.body);
    res.status(200).json({ success: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

exports.postDD = async (req, res) => {
  try {
    await FormModel.create(req.body);
    res.status(200).json({ success: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

exports.getList = async (req, res) => {
  try {
    const data = await FormModel.find();
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};
