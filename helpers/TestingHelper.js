import { Platform } from 'react-native';

const addTestIds = true;

const getPlatformTestId = (id: string) =>
    Platform.OS === 'ios' ? { testID: id } : { accessible: true, accessibilityLabel: id };

const setTestID = (id: string) =>
    addTestIds ? getPlatformTestId(id) : null;

export default setTestID;
