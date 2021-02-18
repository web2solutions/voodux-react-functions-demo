import React from 'react'

const onAddDocHook = (Model) => {
  // 1
  const [newDoc, newDocSet] = React.useState(null)
  let onAddDocEventListener = null

  React.useEffect(() => {
    if (newDoc === null) {
      console.log('------->>>>> onAddDocHook add events')
      onAddDocEventListener = Model.on('add', (eventObj) => {
        console.log('------->>>>> onAddDocHook received new doc', eventObj)
        const { error, /* document, foundation, */ data } = eventObj
        if (error) {
          return
        }
        newDocSet(data)
      })
    }
  }, [newDoc])

  React.useEffect(() => {
    return () => {
      console.log('------->>>>> onAddDocHook remove events')
      // stop to listen events on component unmount
      Model.stopListenTo(onAddDocEventListener)
      onAddDocEventListener = null
    }
  }, [])

  // 2
  return [newDoc]
}

export default onAddDocHook
