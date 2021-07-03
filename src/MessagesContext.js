import React from 'react';
import { node, shape } from 'prop-types';

export const MessagesContext = React.createContext({});

export const MessagesProvider = ({ messages, children }) => (
	<MessagesContext.Provider value={messages}>{children}</MessagesContext.Provider>
);

MessagesProvider.propTypes = {
	messages: shape({}).isRequired,
	children: node.isRequired,
};
