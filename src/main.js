/* globals document */

// import React
import React from 'react'
import ReactDOM from 'react-dom'

// import React app
import App from './App'

// import voodux
import voodux from 'voodux'

// import data schemas
import UserSchema from './schemas/User'
import ProductSchema from './schemas/Product'
import OrderSchema from './schemas/Order'
import CustomerSchema from './schemas/Customer'

// foundation event handlers
import onApplicationStart from './events/onApplicationStart'
import onWorkerResponseClientId from './events/onWorkerResponseClientId'

(async () => {
  const foundation = new voodux.Foundation({
    name: 'My App',
    schemas: {
      User: UserSchema,
      Product: ProductSchema,
      Order: OrderSchema,
      Customer: CustomerSchema
    }
  })
  
  const appStartListener = foundation.on('foundation:start', onApplicationStart.bind(foundation))
  const workerSendClientIdListener = foundation.on('worker:responseClientId', onWorkerResponseClientId.bind(foundation))
  window.addEventListener('unload', (event) => {
    foundation.stopListenTo(appStartListener)
    foundation.stopListenTo(workerSendClientIdListener)
  })

  const start = await foundation.start()
  if (start.error) {
    throw new Error(`Error starting foundation stack: ${start.error}`)
  }

  // console.debug('start', start)
  ReactDOM.render(
    <App foundation={foundation} />,
    document.getElementById('root')
  )
})()
