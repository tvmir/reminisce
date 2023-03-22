import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { auth } from '../api/firebase';
import { chatListener, messageListener } from '../contexts/services/chat';
import {
  fetchUsersByID,
  fetchFollowingUser,
  updateFollowCount,
  FollowCount,
} from '../contexts/services/user';
import { writeChats } from '../contexts/slices/chats/chatsSlice';
import { AppDispatch, RootState } from '../contexts/store';

// Pre-typed Dispatch and Selector hooks to be used throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// React Query hooks
export const keys = {
  user: (uid: string) => ['users', uid],
  following: (uid: string, followedUID: string) => [
    'following',
    uid + followedUID,
  ],
};

export const useUserQuery = (
  uid: string,
  options = {}
): UseQueryResult<DocumentData | undefined, unknown> => {
  return useQuery(keys.user(uid), () => fetchUsersByID(uid), options);
};

export const useFollowingQuery = (
  uid: string,
  followedUID: string,
  options = {}
): UseQueryResult<boolean, unknown> => {
  return useQuery(
    keys.following(uid, followedUID),
    () => fetchFollowingUser(uid, followedUID),
    options
  );
};

export const useFollowMutation = (
  options = {}
): UseMutationResult<void, unknown, FollowCount, void> => {
  const queryClient = useQueryClient();
  return useMutation(updateFollowCount, {
    ...options,
    onMutate: (variables) => {
      queryClient.setQueryData(
        keys.following(auth.currentUser?.uid!, variables.followedUID),
        !variables.isFollowing
      );
    },
  });
};

// Custom hooks to get the most recent message from a chat
export const useChat = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  const handleChange = useCallback(
    (change: QuerySnapshot<DocumentData>) => {
      dispatch(
        writeChats(change.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
    },
    [dispatch]
  );

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser !== null) {
      unsubscribe = chatListener(handleChange);
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [currentUser, handleChange]);
};

export const useMessage = (cid: string) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const [messages, setMessages] = useState<DocumentData[]>([]);

  const handleMsgChange = useCallback(
    (change: QuerySnapshot<DocumentData>) => {
      setMessages(change.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    },
    [dispatch]
  );

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser !== null) {
      unsubscribe = messageListener(handleMsgChange, cid);
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [currentUser, handleMsgChange]);

  return { messages };
};
