import React from 'react';
import { create } from 'react-test-renderer';
import Chat from '.';
import AddChat from '../../ui/components/Chat/AddChat';
import Create from './Create';

describe('Chat screen functionalities', () => {
  it('should navigate to the create chat screen', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    const screen = create(<Chat />);
    const createChat = screen.root.findByProps({ testID: 'create-chat' });

    createChat.props.onPress();
    expect(navigation.navigate).toHaveBeenCalled();
  });

  it('should create a new chat', () => {
    // @ts-ignore
    const component = create(<Create />);
    const nameField = component.root.findByProps({ id: 'chat-name' });
    const membersField = component.root.findByProps({ id: 'chat-members' });

    nameField.props.onChange({ target: { value: 'Backpackers' } });
    membersField.props.onChange({ target: { value: 'teej, jess' } });

    expect(component.root.instance.state.name).toBe('Backpacker');
    expect(component.root.instance.state.bio).toBe('teej, jess');
  });

  it('should navigate to a specific chat', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    const screen = create(<AddChat />);
    const openChat = screen.root.findByProps({ testID: 'open-chat' });

    openChat.props.onPress();
    expect(navigation.navigate).toHaveBeenCalled();
  });
});
