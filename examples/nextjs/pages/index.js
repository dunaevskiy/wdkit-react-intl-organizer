import Head from 'next/head';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMessages } from '@wdkit/react-intl-organizer';
import { getMessageOutOfReact } from './util';

const msg = getMessageOutOfReact();

const useUserHookWithReporting = () => {
	const callback = ({ ns, key, message }) => {
		// Send report to error tracker
		console.error(message);
	};

	return useMessages(callback);
};

const Main = () => {
	const intl = useIntl();
	const getMessage = useUserHookWithReporting();

	return (
		<div>
			<Head>
				<title>React Intl Organizer - Example</title>
				<meta name="description" content="React Intl Organizer - Example" />
			</Head>

			<dl>
				<dt>Simple message with translation</dt>
				<dd>
					<FormattedMessage {...getMessage('titles', 'primary')} />
				</dd>

				<dt>Missing translation (ignore)</dt>
				<dd>
					<FormattedMessage {...getMessage('titles', 'secondary')} />
				</dd>

				<dt>Missing key in namespace (warning in console, optional warning callback)</dt>
				<dd>
					<FormattedMessage {...getMessage('titles', 'tertiary')} />
				</dd>

				<dt>Missing namespace (warning in console, optional warning callback)</dt>
				<dd>
					<FormattedMessage {...getMessage('title', 'tertiary')} />
				</dd>

				<dt>
					Split namespaces (multiple <em>button.ns.js</em>)
				</dt>
				<dd>
					<button>{intl.formatMessage(getMessage('buttons', 'previous'), { type: 'Page' })}</button>
					<button>{intl.formatMessage(getMessage('buttons', 'last'), { type: 'Page' })}</button>
					<button>{intl.formatMessage(getMessage('buttons', 'next'), { type: 'Page' })}</button>
				</dd>

				<dt>Message without react hook</dt>
				<dd>
					<FormattedMessage {...msg} values={{ type: 'Project' }} />
				</dd>
			</dl>
		</div>
	);
};

export default Main;
