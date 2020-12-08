let models = require("../../models");
let { getUrlTitle, isValidUrl } = require("../../modules/utils");

module.exports = {
  get: function (req, res) {
    models.url
      .findAll()
      .then(function (results) {
        res.send(results);
      })
      .catch(function (err) {});
  },

  post: async function (req, res) {
    const { url } = req.body;
    getUrlTitle(req.body.url, async (err, title) => {
      let [newData, created] = await models.url.findOrCreate({
        where: { url },
        defaults: {
          url,
          title,
        },
      });
      res.status(201).json(newData);
    });
  },

  getId: async function (req, res) {
    let id = parseInt(req.params.id);
    let url = await models.url.findOne({ where: { id } });
    await models.url.update(
      { visits: url.visits + 1 },
      {
        where: { id },
      }
    );
    res.status(302).redirect(url.url);
  },
};

// 한명의 유저는 여러 url을 만들 수 있다.
// 하나의 url은 한명의 유저에게만 만들어 질 수 있다.
// 고로 유저는: 1, url: n
