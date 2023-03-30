import React from 'react';
import { create } from 'react-test-renderer';
import * as ImagePicker from 'expo-image-picker';
import Add from './Add';
import Images from './Images';
import Post from './Post';

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
}));

describe('Creating and posting scrapbooks', () => {
  it("should open the user's photo library", async () => {
    // @ts-ignore
    const component = create(<Images />);
    const openLibrary = component.root.findByProps({ testID: 'open-library' });
    component.root.findAllByProps({
      uri: 'test.jpg',
    });

    openLibrary.props.onPress();

    expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledWith({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(component.root.instance.state.openLibrary).toBe('test.jpg');
  });

  it('should open the camera', async () => {
    // @ts-ignore
    const component = create(<Add />);
    const openCamera = component.root.findByProps({ testID: 'open-camera' });
    component.root.findAllByProps({
      uri: 'test.jpg',
    });

    openCamera.props.onPress();

    expect(ImagePicker.launchCameraAsync).toHaveBeenCalledWith({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(component.root.instance.state.openCamera).toBe('test.jpg');
  });

  it('should add details to a scrapbook before posting', () => {
    // @ts-ignore
    const component = create(<Post />);
    const nameField = component.root.findByProps({ id: 'add-scrapbook-name' });
    const descField = component.root.findByProps({
      id: 'add-scrapbook-description',
    });
    const tagsField = component.root.findByProps({ id: 'add-scrapbook-tags' });

    nameField.props.onChange({ target: { value: 'HWU scenary' } });
    descField.props.onChange({
      target: { value: 'A collection of pictures taken around campus' },
    });
    tagsField.props.onChange({ target: { value: 'hwu, campus, uni' } });

    expect(component.root.instance.state.name).toBe('HWU scenary');
    expect(component.root.instance.state.description).toBe(
      'A collection of pictures taken around campus'
    );
    expect(component.root.instance.state.tags).toBe('hwu, campus, uni');
  });
});
