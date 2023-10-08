const data = [

];

const saveFeedback = async (req, res) => {
  try {
    data.push(req.body);
    res.json("done");
  } catch (error) {
    res.json("error");
  }
};

const result = async (req, res) => {
  try {
    const usageData = new Map();
    const goalData = new Map();
    const suggestions = []
    let avgRating = data.reduce((acc, el) => {
     return acc = acc + parseInt(el.rating);
    },0);
    data.forEach((el) => {
      if (!usageData.has(el.usage)) usageData.set(el.usage, 1);
      else {
        usageData.set(el.usage, usageData.get(el.usage) + 1);
      }
      suggestions.push(el.suggestions)
      el.goals.forEach((elem) => {
        if (!goalData.has(elem)) goalData.set(elem, 1);
        else {
          goalData.set(elem, goalData.get(elem) + 1);
        }
      });
    });
    const send = {
      usageData:Object.fromEntries(usageData),
      goal:Object.fromEntries(goalData),
      avgRating : Math.floor(avgRating/data.length),
      suggestions
    }
    res.json(send)
  } catch (error) {
    res.json("error");
  }
};

module.exports = {
  saveFeedback,
  result,
};
