import { Schema, model, models } from "mongoose";

const testSchmea = new Schema({
  name: {
    type: String,
  },
});
const Test = models.test || model("test", testSchmea);
export default Test;
