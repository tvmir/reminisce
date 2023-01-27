import React, { useEffect, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { clear } from '../../../contexts/slices/modals/modalsSlice';
import Comment from './Comment';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../shared/Theme';

export default function Modal() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);
  const bottomSheetModalRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (modal.isOpen && bottomSheetModalRef.current) {
      bottomSheetModalRef.current.expand();
    }
  }, [modal]);

  const renderModal = () => {
    switch (modal.modalType) {
      case 0:
        return <Comment item={modal.data!} />;
      default:
        return <></>;
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetModalRef}
      snapPoints={useMemo(() => ['70'], [])}
      index={-1}
      handleHeight={50}
      enablePanDownToClose
      enableOverDrag
      keyboardBehavior="extend"
      handleIndicatorStyle={{
        backgroundColor: theme.colors.primary,
        opacity: 0.5,
      }}
      handleStyle={{ paddingVertical: 15 }}
      onClose={() => dispatch(clear())}
      backgroundComponent={() => (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: theme.colors.background,
          }}
        />
      )}
    >
      {renderModal()}
    </BottomSheet>
  );
}
