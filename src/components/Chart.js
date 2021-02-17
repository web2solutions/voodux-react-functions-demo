import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer
} from 'recharts'

import moment from 'moment'

import Title from './Title'

let onAddDocEventListener = null
let onEditDocEventListener = null
let onDeleteDocEventListener = null

/**
 * @author Eduardo Perotta de Almeida <web2solucoes@gmail.com>
 * @constructor Chart
 * @description React main component
 */
export default function Chart (props) {
  const [series, setSeries] = useState([
    { time: '00:00', amount: 0 },
    { time: '24:00', amount: undefined }
  ])
  const { Order } = props.foundation.data
  const theme = useTheme()

  const _setSeries = async () => {
    // console.debug('chart _setSeries')
    const { data } = await Order.find({})
    if (!data) {
      return
    }
    let _total = 0
    const series = data.reverse().map(({ date, amount }) => {
      _total = _total + amount
      return {
        amount: _total,
        time: moment(date).format('HH:mm:ss'),
        mseconds: (new Date(date)).getTime()
      }
    })
    
    const final = [
      { time: '00:00', amount: 0 },
      ...(series.slice().sort((a, b) => a.mseconds - b.mseconds)),
      { time: '24:00', amount: undefined }
    ]
    // console.log(final)
    setSeries(final)
  }

  const handlerChangeOrder = async (eventObj) => {
    // console.debug('chart handlerChangeOrder')
    const { error } = eventObj
    if (error) {
      return
    }
    await _setSeries()
  }

  useEffect(() => {
    // console.debug('------->>>>> Chart.js mount events', props.foundation.stopListenTo)
    // listen to add Order Collection event on Data API
    onAddDocEventListener = props.foundation.on(`collection:add:${props.entity.toLowerCase()}`, handlerChangeOrder)

    // listen to edit Order Collection event on Data API
    onEditDocEventListener = props.foundation.on(`collection:edit:${props.entity.toLowerCase()}`, handlerChangeOrder)

    // listen to delete Order Collection event on Data API
    onDeleteDocEventListener = props.foundation.on(`collection:delete:${props.entity.toLowerCase()}`, handlerChangeOrder)
    
    ;(async () => (await _setSeries()))();

    return () => {
      // stop to listen events on component unmount
      // console.debug('------->>>>> Chart.js remove events')
      props.foundation.stopListenTo(onAddDocEventListener)
      props.foundation.stopListenTo(onEditDocEventListener)
      props.foundation.stopListenTo(onDeleteDocEventListener)
    }
  }, [series]) // run one time only

  return (
    <>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={series}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey='time' stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position='left'
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            type='monotone'
            dataKey='amount'
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
