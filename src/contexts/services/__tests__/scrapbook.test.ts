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
import { db, app } from '../../../api/firebase';

// mockFirebase({
//   database: {
//     // @ts-ignore
//     scrapbooks: [
//       {
//         id: '123',
//         // uid: '1',
//         name: 'test',
//         description: 'test',
//         location: { lat: 1, lng: 1 },
//         images: ['test'],
//         createdAt: 'test',
//         likes_count: 0,
//         comments_count: 0,
//         tags: ['test'],
//       },
//       {
//         id: '456',
//         // uid: '2',
//         name: 'test',
//         description: 'test',
//         location: { lat: 1, lng: 1 },
//         images: ['test'],
//         createdAt: 'test',
//         likes_count: 0,
//         comments_count: 0,
//         tags: ['test'],
//       },
//     ],
//   },
// });

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

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

function maybeGetUsersInState(state: any) {
  const q = query(collection(db, 'scrapbooks'), where('state', '==', state));

  // if (state) {
  //   q = where(query, 'state', '==', state);
  // }

  return getDocs(q);
}

describe('we can query', () => {
  mockFirebase({
    database: {
      users: [
        {
          id: 'abc123',
          name: 'Homer Simpson',
          state: 'connecticut',
        },
        {
          id: 'abc456',
          name: 'Lisa Simpson',
          state: 'alabama',
        },
      ],
    },
  });

  test('query with state', async () => {
    await maybeGetUsersInState('alabama');

    // Assert that we call the correct Firestore methods
    // expect(mockCollection).toHaveBeenCalledWith('users');
    expect(mockWhere).toHaveBeenCalledWith('state', '==', 'alabama');
  });
});
