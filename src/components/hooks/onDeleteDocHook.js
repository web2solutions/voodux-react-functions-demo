import React from 'react'

const onDeleteDocHook = (Model) => {
  // 1
  const [deletedDoc, deletedDocSet] = React.useState(null)
  let onDeleteDocEventListener = null

  React.useEffect(() => {
    if (deletedDoc === null) {
      console.log('------->>>>> onDeleteDocHook add events')
      onDeleteDocEventListener = Model.on('delete', (eventObj) => {
        console.log('------->>>>> onDeleteDocHook received new doc', eventObj)
        const { error, /* document, foundation, */ data } = eventObj
        if (error) {
          return
        }
        deletedDocSet(data)
      })
    }
  }, [deletedDoc])

  React.useEffect(() => {
    return () => {
      console.log('------->>>>> onDeleteDocHook remove events')
      // stop to listen events on component unmount
      Model.stopListenTo(onDeleteDocEventListener)
      onDeleteDocEventListener = null
    }
  }, [])

  // 2
  return [deletedDoc]
}

export default onDeleteDocHook
