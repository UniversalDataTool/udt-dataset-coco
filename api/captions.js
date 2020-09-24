const { send, json } = require("micro")
const qs = require("qs")
const fs = require("fs")
const path = require("path")

const ds = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../captions.udt.json"))
)

module.exports = (req, res) => {
  let { labels, exclusive } = qs.parse(req.url.split("?")[1])

  exclusive = exclusive !== undefined

  if (!labels) {
    return send(res, 400, 'You need to give me "labels"!')
  }

  labels = labels.split(",")

  send(res, 200, {
    interface: {
      ...ds.interface,
      labels,
    },
    samples: ds.samples
      .filter((sample) =>
        !exclusive
          ? sample.annotation.some((label) => labels.includes(label))
          : sample.annotation.filter((label) => labels.includes(label))
              .length === 1
      )
      .map((sample) => ({
        ...sample,
        annotation: !exclusive
          ? sample.annotation.filter((label) => labels.includes(label))
          : sample.annotation.find((label) => labels.includes(label)),
      })),
  })
}
