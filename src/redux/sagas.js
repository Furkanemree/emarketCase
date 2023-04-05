import { all } from 'redux-saga/effects'
import auth from "./auth/sagas"
import apiCall from "./api-call/sagas"
import modal from "./modal/sagas"

export default function* rootSaga() {
  yield all([
    ...auth,
    ...apiCall,
    ...modal,
  ])
}
