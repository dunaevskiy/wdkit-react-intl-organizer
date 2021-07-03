import { IntlProvider } from 'react-intl';
import { MessagesProvider } from '@wdkit/react-intl-organizer';
import { translations, locales, messages } from '../packages/i18n';

const locale = locales?.[0];

const App = ({ Component, pageProps }) => (
	<IntlProvider locale={locale} messages={translations?.[locale]}>
		<MessagesProvider messages={messages}>
			<Component {...pageProps} />
		</MessagesProvider>
	</IntlProvider>
);

export default App;
