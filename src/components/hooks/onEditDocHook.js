import React from 'react'

const onEditDocHook = (Model) => {
  // 1
  const [editedDoc, editedDocSet] = React.useState(null)
  let onEditDocEventListener = null

  React.useEffect(() => {
    if (editedDoc === null) {
      console.log('------->>>>> onEditDocHook add events')
      onEditDocEventListener = Model.on('edit', (eventObj) => {
        console.log('------->>>>> onEditDocHook received new doc', eventObj)
        const { error, /* document, foundation, */ data } = eventObj
        if (error) {
          return
        }
        editedDocSet(data)
      })
    }
  }, [editedDoc])

  React.useEffect(() => {
    return () => {
      console.log('------->>>>> onEditDocHook remove events')
      // stop to listen events on component unmount
      Model.stopListenTo(onEditDocEventListener)
      onEditDocEventListener = null
    }
  }, [])

  // 2
  return [editedDoc]
}

export default onEditDocHook
