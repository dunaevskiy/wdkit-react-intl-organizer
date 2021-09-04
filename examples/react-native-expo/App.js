import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IntlProvider } from 'react-intl';
import { MessagesProvider } from '@wdkit/react-intl-organizer';
import { translations, locales, messages } from './packages/i18n';
import { Page } from './pages';

const locale = locales?.[0];

export default () => (
	<IntlProvider locale={locale} messages={translations?.[locale]}>
		<MessagesProvider messages={messages}>
			<View style={styles.container}>
				<Page />
			</View>
		</MessagesProvider>
	</IntlProvider>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
});
