const db = require("./index");

const beats = db.get("beats");

module.exports = {
  getAllBeats() {
    return beats.find({});
  },
  create(beat) {
    return beats.insert(beat);
  }
}
