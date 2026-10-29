// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Redirect, type Href} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';

import {determineInitialExpoRoute, type ExpoRouterLaunchResult} from '@init/launch';
import {propsToParams} from '@screens/navigation';

// Gives the redirected screen time to draw its first frame before the splash fades
const SPLASH_HIDE_DELAY = 150;

export default function RootIndex() {
    const [launchResult, setLaunchResult] = useState<ExpoRouterLaunchResult | null>(null);

    useEffect(() => {
        async function initializeLaunch() {
            const result = await determineInitialExpoRoute();
            setLaunchResult(result);
        }

        initializeLaunch();
    }, []);

    useEffect(() => {
        if (launchResult) {
            // Not cleared on unmount: the redirect unmounts this route right away
            setTimeout(() => SplashScreen.hideAsync(), SPLASH_HIDE_DELAY);
        }
    }, [launchResult]);

    if (!launchResult) {
        return null; // Still determining initial route; the splash stays up meanwhile
    }

    // Redirect to the determined route with params
    const href: Href = {pathname: launchResult.route, params: propsToParams(launchResult.params)};
    return <Redirect href={href}/>;
}
