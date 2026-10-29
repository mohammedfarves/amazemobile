// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {View} from 'react-native';

import BrandHero, {BRAND_ORANGE} from '@components/brand_hero';
import FormattedText from '@components/formatted_text';
import {useIsTablet} from '@hooks/device';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';
import {typography} from '@utils/typography';

type Props = {
    additionalServer: boolean;
    theme: Theme;
};

const getStyleSheet = makeStyleSheetFromTheme(() => ({
    accent: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: BRAND_ORANGE,
        marginBottom: 16,
    },
    connect: {
        letterSpacing: -1,
        color: '#FFFFFF',
        marginBottom: 10,
        ...typography('Heading', 900, 'SemiBold'),
        lineHeight: 42,
    },
    connectTablet: {
        width: undefined,
    },
    description: {
        color: changeOpacity('#FFFFFF', 0.72),
        ...typography('Body', 200, 'Regular'),
        lineHeight: 24,
    },
}));

const ServerHeader = ({additionalServer, theme}: Props) => {
    const isTablet = useIsTablet();
    const styles = getStyleSheet(theme);

    let title;
    if (additionalServer) {
        title = (
            <FormattedText
                defaultMessage='Add a server'
                id='servers.create_button'
                style={[styles.connect, isTablet ? styles.connectTablet : undefined]}
                testID='server_header.title.add_server'
            />
        );
    } else {
        title = (
            <FormattedText
                defaultMessage='Connect to your server'
                id='mobile.components.select_server_view.msg_connect'
                style={[styles.connect, isTablet ? styles.connectTablet : undefined]}
                testID='server_header.title.connect_to_server'
            />
        );
    }

    return (
        <BrandHero testID='server_header'>
            <View style={styles.accent}/>
            {title}
            <FormattedText
                defaultMessage="A server is your team's communication hub accessed using a unique URL"
                id='mobile.components.select_server_view.msg_description'
                style={styles.description}
                testID='server_header.description'
            />
        </BrandHero>
    );
};

export default ServerHeader;
