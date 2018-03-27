import { all } from 'redux-saga/effects';
import { watchSignUpAsync, watchSignInAsync, watchLogout } from './authSaga';
import {
  watchFetchCentersAsync,
  watchAddCenterAsync,
  watchGetSingleCenterAsync,
  watchEditCenterAsync,
  watchDeleteCenterAsync
} from './centersSaga';
import {
  watchGetEventsAsync,
  watchGetSingleEventAsync,
  watchAddEventAsync,
  watchEditEventAsync,
  watchDeleteEventAsync
  // watchshowEditFormAsync
} from './eventsSaga';

/**
 * single entry point to start all sagas at once
 * @returns {functions} forked sagas
 * @export
 */
export default function* rootSaga() {
  yield all([
    watchSignUpAsync(),
    watchSignInAsync(),
    watchFetchCentersAsync(),
    watchGetSingleCenterAsync(),
    watchAddCenterAsync(),
    watchEditCenterAsync(),
    watchDeleteCenterAsync(),
    watchGetEventsAsync(),
    watchGetSingleEventAsync(),
    watchAddEventAsync(),
    watchEditEventAsync(),
    watchDeleteEventAsync(),
    watchLogout()
    // watchshowEditFormAsync()
  ]);
}
