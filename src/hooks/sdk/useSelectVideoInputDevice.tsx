// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';

import { useMeetingManager } from '../../providers/MeetingProvider';
import { useLocalVideo } from '../../providers/LocalVideoProvider';
import VideoInputDevice from 'amazon-chime-sdk-js/build/devicecontroller/VideoInputDevice';

export const useSelectVideoInputDevice = () => {
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const meetingManager = useMeetingManager();

  const selectVideo = useCallback(
    async (deviceId: VideoInputDevice) => {
      if (deviceId === 'none' && isVideoEnabled) {
        await toggleVideo();
      }
      await meetingManager.selectVideoInputDevice(deviceId);
    },
    [isVideoEnabled]
  );

  return selectVideo;
};

export default useSelectVideoInputDevice;
