// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {type ReactNode} from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Colours sampled from the Amaze One logo files in assets/brand
export const BRAND_NAVY = '#01122C';
export const BRAND_ORANGE = '#FA5000';

// The brand wordmark artwork is 1024x341 with transparent padding around the
// lettering (x 15-1003, y 91-236); these offsets trim it for layout.
const WORDMARK_WIDTH = 268;
const WORDMARK_SCALE = WORDMARK_WIDTH / 1024;

type Props = {
    children: ReactNode;
    testID?: string;
};

const styles = StyleSheet.create({
    hero: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: BRAND_NAVY,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        overflow: 'hidden',
        paddingBottom: 72,
    },
    content: {
        width: '100%',
        maxWidth: 600,
        paddingHorizontal: 24,
    },
    mark: {
        position: 'absolute',
        top: -24,
        right: -48,
        width: 240,
        height: 230,
        opacity: 0.14,
    },
    wordmark: {
        width: WORDMARK_WIDTH,
        height: 341 * WORDMARK_SCALE,
        marginTop: -91 * WORDMARK_SCALE,
        marginBottom: (-(341 - 236) * WORDMARK_SCALE) + 32,
        marginLeft: -15 * WORDMARK_SCALE,
    },
});

/**
 * Navy brand band used at the top of the server and login screens: the Amaze One
 * wordmark for dark backgrounds, with the arrow mark as a faint accent.
 */
const BrandHero = ({children, testID}: Props) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[styles.hero, {paddingTop: insets.top + 40}]}
            testID={testID}
        >
            <StatusBar barStyle='light-content'/>
            <Image
                source={require('@assets/images/amaze_mark.png')}
                style={styles.mark}
                resizeMode='contain'
            />
            <View style={styles.content}>
                <Image
                    source={require('@assets/images/logo_dark.png')}
                    style={styles.wordmark}
                    resizeMode='contain'
                    accessibilityLabel='Amaze One'
                />
                {children}
            </View>
        </View>
    );
};

export default BrandHero;
