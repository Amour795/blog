
import moment from 'moment'

const dateFormat = (v, format = 'YYYY-MM-DD')=> {
      return v ? moment(v).format(format) : ''
}

export {
    dateFormat
}