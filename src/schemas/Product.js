// import voodux
import voodux from 'voodux'

const schema = new voodux.Foundation.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  vendor: {
    type: String,
    required: true,
    index: true
  },
  price_cost: {
    type: Number,
    required: true,
    default: 0,
    index: true
  }
})

schema.set('toJSON', {
  getters: true,
  virtuals: true
})

export default schema
