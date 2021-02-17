import React, { useState, useEffect } from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import moment from 'moment'

import Title from './Title'

function preventDefault (event) {
  event.preventDefault()
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
})

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

let onAddDocEventListener = null
let onEditDocEventListener = null
let onDeleteDocEventListener = null

export default function Deposits (props) {
  const [total, setTotal] = useState(0)
  const { Order } = props.foundation.data
  const classes = useStyles()

  const _setTotal = async () => {
    const findOrders = await Order.find({})
    if (!findOrders) {
      return
    }
    if (findOrders.data) {
      let total = 0
      findOrders.data.forEach(({ amount }) => {
        total = total + amount
      }) //
      setTotal(total)
    }
  }

  useEffect(() => {
    // console.debug('------->>>>> Deposits.js mount events', props.foundation.stopListenTo)
    onAddDocEventListener = props.foundation.on(`collection:add:${props.entity.toLowerCase()}`, async function (eventObj) {
      const { error /* , document, foundation, data */ } = eventObj
      if (error) {
        // console.error(`Error adding user: ${error}`)
        return
      }
      await _setTotal()
    })

    // listen to update Order Collection event on Data API
    onEditDocEventListener = props.foundation.on(`collection:edit:${props.entity.toLowerCase()}`, async function (eventObj) {
      const { /* data, primaryKey,  document, foundation, */ error } = eventObj
      if (error) {
        // console.error(`Error updating user: ${error}`)
        return
      }
      await _setTotal()
    })

    // listen to delete Order Collection event on Data API
    onDeleteDocEventListener = props.foundation.on(`collection:delete:${props.entity.toLowerCase()}`, async function (eventObj) {
      const { error /* , document, foundation,  data */ } = eventObj
      if (error) {
        // console.error(`Error deleting user: ${error}`)
        return
      }
      await _setTotal()
    })
      // got total
    ; (async () => (await _setTotal()))()
    
    return () => {
      // stop to listen events on component unmount
      // console.debug('------->>>>> Deposits.js remove events')
      props.foundation.stopListenTo(onAddDocEventListener)
      props.foundation.stopListenTo(onEditDocEventListener)
      props.foundation.stopListenTo(onDeleteDocEventListener)
    }
  }, [total]) // run one time only

  return (
    <>
      <Title>Recent Deposits</Title>
      <Typography component='p' variant='h4'>
        USD {formatter.format(total)}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        {moment().format('MMMM Do YYYY, h:mm:ss a')}
      </Typography>
      <div>
        <Link color='primary' href='#' onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </>
  )
}
