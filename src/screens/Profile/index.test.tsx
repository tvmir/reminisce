import React from 'react';
import { create } from 'react-test-renderer';
import ProfileDetails from '../../ui/components/Profile/ProfileDetails';
import Tabs from '../../ui/components/Profile/Tabs';
import Edit from './Edit';

describe('Profile screen functionalities', () => {
  it('should go to the about tab section', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    const component = create(<Tabs />);
    const openAbout = component.root.findByProps({ testID: 'about' });

    openAbout.props.onPress();
    expect(navigation.navigate).toHaveBeenCalled();
  });

  it('should navigate to the edit profile screen', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    // @ts-ignore
    const component = create(<ProfileDetails />);
    const editProfile = component.root.findByProps({
      testID: 'edit-profile-btn',
    });

    editProfile.props.onPress();
    expect(navigation.navigate).toHaveBeenCalledWith('EditProfile');
  });

  it("should update the user's profile picture", () => {
    // @ts-ignore
    const component = create(<Edit />);
    const profilePic = component.root.findByProps({
      testID: 'edit-profile-picture',
    });

    profilePic.props.onPress();
    expect(component.root.instance.state.profilePic).toBe('new-profile-pic');
  });

  it("should update the user's name and bio", () => {
    // @ts-ignore
    const component = create(<Edit />);
    const nameField = component.root.findByProps({ id: 'edit-name' });
    const bioField = component.root.findByProps({ id: 'edit-bio' });

    nameField.props.onChange({ target: { value: 'Sara' } });
    bioField.props.onChange({ target: { value: 'photography hobyist' } });

    expect(component.root.instance.state.name).toBe('Sara');
    expect(component.root.instance.state.bio).toBe('photography hobyist');
  });
});
