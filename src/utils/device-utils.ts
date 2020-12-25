// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { DeviceType, SelectedDeviceId } from '../types';
import { Device, DefaultDeviceController } from 'amazon-chime-sdk-js';
import VideoInputDevice from 'amazon-chime-sdk-js/build/devicecontroller/VideoInputDevice';
import { isVideoTransformDevice } from 'amazon-chime-sdk-js/build/devicecontroller/VideoTransformDevice';
import { DefaultVideoTransformDevice } from 'amazon-chime-sdk-js';

export const getFormattedDropdownDeviceOptions = (
  jsonObject: any
): DeviceType[] => {
  const formattedJSONObject = Object.entries(jsonObject).map(entry => ({
    deviceId: entry[0].toLowerCase(),
    label: entry[1] as string
  }));
  return formattedJSONObject;
};

export const videoInputSelectionToDevice = (deviceId: VideoInputDevice): VideoInputDevice => {
  if (deviceId === 'blue') {
    return DefaultDeviceController.synthesizeVideoDevice('blue');
  }
  if (deviceId === 'smpte') {
    return DefaultDeviceController.synthesizeVideoDevice('smpte');
  }
  if (deviceId === 'none') {
    return null;
  }
  return deviceId;
};

export const audioInputSelectionToDevice = (deviceId: string): Device => {
  if (deviceId === '440') {
    return DefaultDeviceController.synthesizeAudioDevice(440);
  }
  if (deviceId === 'none') {
    return null;
  }
  return deviceId;
};

export const getSelectedVideoInputDeviceId = (videoInputDevice: VideoInputDevice): SelectedDeviceId => {
  if (videoInputDevice === null) {
    return null;
  }
  if(isVideoTransformDevice(videoInputDevice) && (videoInputDevice instanceof DefaultVideoTransformDevice)) {
    return videoInputDevice.getInnerDevice() as SelectedDeviceId;
  } else {
    return videoInputDevice as SelectedDeviceId;
  }  
}

export const isOptionActive = (
  meetingManagerDeviceId: SelectedDeviceId,
  currentDeviceId: string
): boolean => {
  if (currentDeviceId === 'none' && meetingManagerDeviceId === null) {
    return true;
  }
  return getSelectedVideoInputDeviceId(meetingManagerDeviceId) === currentDeviceId
};
