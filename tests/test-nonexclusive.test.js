const test = require("ava")
const bent = require("bent")

const getJSON = bent("json")

test("nonexclusive", async (t) => {
  // TODO actually start server here, for now i'm just gonna assume it's already
  // runn'in
  const { interface, samples } = await getJSON(
    "http://localhost:3000/api/captions?labels=dog,cat"
  )

  t.is(samples.length, 8642)
})

test("exclusive", async (t) => {
  // TODO actually start server here, for now i'm just gonna assume it's already
  // runn'in
  const { interface, samples } = await getJSON(
    "http://localhost:3000/api/captions?labels=dog,cat&exclusive"
  )

  t.is(samples.length, 8397)
  t.is(typeof samples[0].annotation, "string")
})
