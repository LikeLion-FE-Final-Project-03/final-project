import {
  ref,
  push,
  set,
  query,
  orderByChild,
  get,
  child,
  startAt,
  endAt,
  equalTo,
  limitToLast,
} from 'firebase/database';

import { app, auth, database } from '../../../Firebase';
import { async, stringify } from '@firebase/util';

const dbRef = ref(database, 'items');

/**
 *
 * @param {string} searchKey : 데이터 검색에 필요한 Key
 * @param {string} searchValue : Key의 Value
 *
 */

export function SearchRTDB(searchKey, searchValue) {
  const que = query(dbRef, orderByChild(searchKey), equalTo(searchValue));

  return getQue(que);
}

/**
 *
 * @param {number} Centerlatitude : 위도(latitude)
 * @param {number} Centerlongitude  : 경도(longitude)
 */

export function SearchAreaScope(Centerlatitude, Centerlongitude) {
  const que1 = query(dbRef, orderByChild('latitude'), startAt(36.011), endAt(36.014));
  const que2 = query(dbRef, orderByChild('longitude'), startAt(129), endAt(130));

  const arrayOne = getQue(que1);
  const arrayTwo = getQue(que2);

  console.log(compareArray(arrayOne, arrayTwo), 'here!!!!');
}

function getQue(que) {
  return get(que)
    .then((snapshot) => {
      const receivedData = [];
      snapshot.forEach((childSnapshot) => {
        receivedData.push(childSnapshot.val());
      });

      return receivedData;
    })
    .catch((error) => {
      console.error(error.message);
      return { message: error.message };
    });
}
function compareArray(arr1, arr2) {
  const arr3 = [];

  for (let i = 0; i < arr1.length; i++) {
    for (let t = 0; t < arr2.length; t++) {
      if (arr1[i].prkplceNo === arr2[t].prkplceNo) {
        arr3.push(arr1[i]);
      }
    }

    return arr3;
  }
}
