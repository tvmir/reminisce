import React from 'react';
import { create } from 'react-test-renderer';
import Login from './Login';
import Signup from './Signup';

describe('Authentications screen functionalities', () => {
  it('should enter the email and password before logging in', () => {
    // @ts-ignore
    const screen = create(<Login />);
    const emailField = screen.root.findByProps({ id: 'login-email' });
    const passField = screen.root.findByProps({ id: 'login-pwd' });

    emailField.props.onChange({ target: { value: 'elijah' } });
    passField.props.onChange({ target: { value: 'Klar123@' } });

    expect(screen.root.instance.state.email).toBe('elijah');
    expect(screen.root.instance.state.password).toBe('Klar123@');
  });

  it('should navigate from the Login to Signup screen', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    const screen = create(<Login />);
    const loginToSignup = screen.root.findByProps({
      testID: 'login-to-signup',
    });

    loginToSignup.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith('Signup');
  });

  it('should navigate from the Login the Feed screen if all details have been added successfully', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    const screen = create(<Login />);
    const loginToFeed = screen.root.findByProps({
      testID: 'login-btn',
    });

    loginToFeed.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith('Feed');
  });

  it('should enter the name, username, email and password before signing up', () => {
    // @ts-ignore
    const screen = create(<Signup />);
    const nameField = screen.root.findByProps({ id: 'signup-name' });
    const usernameField = screen.root.findByProps({ id: 'signup-username' });
    const emailField = screen.root.findByProps({ id: 'signup-email' });
    const passField = screen.root.findByProps({ id: 'signup-password' });

    nameField.props.onChange({ target: { value: 'Elijah' } });
    usernameField.props.onChange({ target: { value: 'elijah' } });
    emailField.props.onChange({ target: { value: 'elijah@gmail.com' } });
    passField.props.onChange({ target: { value: 'Klar123@' } });

    expect(screen.root.instance.state.name).toBe('Elijah');
    expect(screen.root.instance.state.username).toBe('elijah');
    expect(screen.root.instance.state.email).toBe('elijah@gmail.com');
    expect(screen.root.instance.state.password).toBe('Klar123@');
  });

  it('should navigate from the Signup to the Feed screen if all details have been added successfully', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    const screen = create(<Signup />);
    const signupToFeed = screen.root.findByProps({
      testID: 'signup-btn',
    });

    signupToFeed.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith('Feed');
  });
});
