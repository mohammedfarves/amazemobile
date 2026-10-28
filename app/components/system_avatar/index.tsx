// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Image} from 'react-native';

import {View as ViewConstants} from '@constants';

type Props = {
    theme: Theme;
};

const logo = require('@assets/images/icon.png');

const SystemAvatar = ({theme}: Props) => {
    return (
        <Image
            source={logo}
            style={{
                width: ViewConstants.PROFILE_PICTURE_SIZE,
                height: ViewConstants.PROFILE_PICTURE_SIZE,
                borderRadius: ViewConstants.PROFILE_PICTURE_SIZE / 2,
            }}
            resizeMode='contain'
        />
    );
};

export default SystemAvatar;
