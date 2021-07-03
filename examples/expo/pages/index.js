import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Text } from 'react-native';
import React from 'react';
import { useMessages } from '@wdkit/react-intl-organizer';
import { getMessageOutOfReact } from './util';

const msg = getMessageOutOfReact();

const useUserHookWithReporting = () => {
	const callback = ({ ns, key, message }) => {
		// Send report to error tracker
		// console.error(message);
	};

	return useMessages(callback);
};

export const Page = () => {
	const intl = useIntl();
	const getMessage = useUserHookWithReporting();

	return (
		<>
			<Text style={{ fontWeight: 'bold', marginTop: 10 }}>Simple message with translation</Text>
			<Text>
				<FormattedMessage {...getMessage('titles', 'primary')} />
			</Text>

			<Text style={{ fontWeight: 'bold', marginTop: 10 }}>Missing translation (ignore)</Text>
			<Text>
				<FormattedMessage {...getMessage('titles', 'secondary')} />
			</Text>

			<Text style={{ fontWeight: 'bold', marginTop: 10 }}>
				Missing key in namespace (warning in console, optional warning callback)
			</Text>
			<Text>
				<FormattedMessage {...getMessage('titles', 'tertiary')} />
			</Text>

			<Text style={{ fontWeight: 'bold', marginTop: 10 }}>
				Missing namespace (warning in console, optional warning callback)
			</Text>
			<Text>
				<FormattedMessage {...getMessage('title', 'tertiary')} />
			</Text>

			<Text style={{ fontWeight: 'bold', marginTop: 10 }}>Split namespaces (multiple button.ns.js)</Text>
			<Button title={intl.formatMessage(getMessage('buttons', 'previous'), { type: 'Page' })} />
			<Button title={intl.formatMessage(getMessage('buttons', 'last'), { type: 'Page' })} />
			<Button title={intl.formatMessage(getMessage('buttons', 'next'), { type: 'Page' })} />

			<Text style={{ fontWeight: 'bold', marginTop: 10 }}>Message without react hook</Text>
			<Text>
				<FormattedMessage {...msg} values={{ type: 'Project' }} />
			</Text>
		</>
	);
};
