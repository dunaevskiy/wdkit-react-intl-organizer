import { useContext } from 'react';

import { makeFindMessage } from './helpers/makeFindMessage';
import { MessagesContext } from './MessagesContext';

export const useMessages = (warningCallback = () => {}) => {
	const messages = useContext(MessagesContext);

	return makeFindMessage(messages, warningCallback);
};
