// import voodux
import voodux from 'voodux'

const schema = new voodux.Foundation.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  username: {
    type: String,
    required: true,
    index: true
  }
})

schema.set('toJSON', {
  getters: true,
  virtuals: true
})

export default schema
