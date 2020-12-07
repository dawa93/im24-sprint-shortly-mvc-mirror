let models = require("../../models");
let title = require("../../modules/utils")

module.exports = {
    get: function (req, res) {
        models.url.findAll().then(function (results) {
            res.send(results);
        }).catch(function (err) { });
    },
    post: async function (req, res) {
        let [url, created] = await models.url.findOrCreate({
            where: { url: req.body.url },
            defaults: {
                url: req.body.url,
                title: "GitHub"
            }
        })
        res.status(201).send(url);
    },
    id: {
        get: async function (req, res) {
            let id = parseInt(req.params.id);
            let url = await models.url.findOne({ where: { id } })
            await models.url.update({ visits: url.visits + 1 }, {
                where: { id }
            });
            res.status(302).redirect(url.url);
        }
    }
}