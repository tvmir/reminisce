import { useNavigation } from '@react-navigation/native';
import { writeComment, writeScrapbook } from '../scrapbook';
import renderer from 'react-test-renderer';
import { mockFirebase } from 'firestore-jest-mock';
import {
  mockCollection,
  mockDoc,
  mockWhere,
} from 'firestore-jest-mock/mocks/firestore';
import {
  collection,
  getDocs,
  getDoc,
  getFirestore,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../api/firebase';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

mockFirebase({
  database: {
    users: [
      { id: 'abc123', name: 'Homer Simpson' },
      { id: 'abc456', name: 'Lisa Simpson' },
    ],
  },
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('testing stuff', async () => {
  const userRef = collection(db, 'users');
  const user = await getDocs(userRef).then((userDoc) => {
    console.log(userDoc.docs.map((doc) => doc.data()));
  });
  expect(user).toBe('Homer Simpson');
});

// describe('Fetching scrapbooks in descending order', () => {
//   it(`should return the latest scrapbook's name`, async () => {
//     const q = query(collection(db, 'scrapbooks'), orderBy('createdAt', 'desc'));
//     const querySnapshot = await getDocs(q);
//     const scrapbooks = querySnapshot.docs.map((doc) => doc.data());
//     expect(mockDoc).toHaveBeenCalledWith('456');
//     // expect(mockCollection).toHaveBeenCalledWith('scrapbooks');
//     expect(scrapbooks[0].name).toBe('test');
//   });
// });
