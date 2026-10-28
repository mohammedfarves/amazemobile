// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useMemo} from 'react';
import {type StyleProp, StyleSheet, type TextStyle, View, type ViewStyle, Image} from 'react-native';

import Badge from '@components/badge';
import CompassIcon from '@components/compass_icon';
import TouchableWithFeedback from '@components/touchable_with_feedback';
import {useTheme} from '@context/theme';
import {changeOpacity} from '@utils/theme';

type Props = {
    badgeBackgroundColor?: string;
    badgeBorderColor?: string;
    badgeColor?: string;
    badgeStyle?: StyleProp<TextStyle>;
    hasUnreads: boolean;
    iconColor?: string;
    mentionCount: number;
    onPress?: () => void;
    size?: number;
    style?: StyleProp<ViewStyle>;
    testID?: string;
    unreadStyle?: StyleProp<TextStyle>;
}

const hitSlop = {top: 20, bottom: 5, left: 40, right: 20};

const styles = StyleSheet.create({
    badge: {
        left: 13,
        top: -8,
    },
    unread: {
        left: 18,
        top: -5,
    },
});

export default function ServerIcon({
    badgeBackgroundColor,
    badgeBorderColor,
    badgeColor,
    badgeStyle,
    hasUnreads,
    iconColor,
    mentionCount,
    onPress,
    size = 24,
    style,
    testID,
    unreadStyle,
}: Props) {
    const theme = useTheme();
    const isDark = Boolean(
        theme.type === 'indigo' ||
        theme.type === 'onyx' ||
        (theme.sidebarBg && parseInt(theme.sidebarBg.replace('#', '').slice(0, 2), 16) < 128)
    );
    const iconSource = isDark ? require('@assets/images/icon_dark.png') : require('@assets/images/icon_light.png');
    const hasBadge = Boolean(mentionCount || hasUnreads);
    const count = mentionCount || (hasUnreads ? -1 : 0);
    const memoizedStyle = useMemo(() => {
        return [(badgeStyle || styles.badge), count > -1 ? undefined : (unreadStyle || styles.unread)];
    }, [badgeStyle, count, unreadStyle]);

    return (
        <View style={style}>
            <TouchableWithFeedback
                disabled={onPress === undefined}
                onPress={onPress}
                type='opacity'
                testID={testID}
                hitSlop={hitSlop}
            >
                <Image
                    source={iconSource}
                    style={{width: size, height: size, borderRadius: 6}}
                    resizeMode='contain'
                />
                <Badge
                    borderColor={badgeBorderColor || theme.sidebarTeamBarBg}
                    backgroundColor={badgeBackgroundColor}
                    color={badgeColor}
                    visible={hasBadge}
                    style={memoizedStyle}
                    testID={`${testID}.badge`}
                    value={count}
                />
            </TouchableWithFeedback>
        </View>
    );
}

