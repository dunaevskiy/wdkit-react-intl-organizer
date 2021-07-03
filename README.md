<img align="left" src="./docs/assets/wdkit-logo.png" width="150" alt="wdkit logo"/>

<h1 align="right">WDKit<br/>react-intl-organizer</h1>

<div align="right">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" />
</div>

<br/>

React Intl Organizer helps to split messages/translations declaration into smaller atomic logical groups (namespaces) without unnecessary exports. Exported structures are ready to use with [react-intl](https://formatjs.io/docs/getting-started/installation/).

## Installation

```bash
yarn add @wdkit/react-intl-organizer
```

## Examples

- [React (NextJS)](./examples/nextjs)
- [React Native (Expo)](./examples/expo)

## Usage

### Definition of source

#### Folder structure
Create a folder/workspace with messages and translations, preserve defined structure (`./messages` and `./translations/<locale>` at the root):

```
.
├── PHRASES.js
├── messages
│  ├── buttons.ns.js
│  ├── numbers.ns.js
│  └── submodule
│     └── buttons.ns.js
└── translations
   └── en
      ├── buttons.ns.js
      ├── numbers.ns.js
      └── submodule
         └── buttons.ns.js
```

Inside `messages` can be a custom structure with `<namespace>.ns.js` files. `translations` requires `./<locale>/**/<namespace>.ns.js` structure.

#### Namespace (`*.ns.js`) files

```js
// ./messages/buttons.ns.js
export default {
   next: 'defaultMessage next {value}',
   previous: {
      defaultMessage: 'defaultMessage previous',
      description: 'Description',
   },
}
```

```js
// ./translations/en/buttons.ns.js
export default {
   next: 'Next {value}',
   previous: 'Previous {value}',
}
```

See FAQ section to understand how react-intl-organizer works with namespace files.

#### Export

Inside `PHRASES.js` (or just `index.js`) declare a dynamic import and merge the context via `mergeMessages()`.

```js
import { mergeMessages } from '@wdkit/react-intl-organizer';

const context = require.context('./', true, /^\..*\.ns\.js$/);
const optionalCallback = (namespace, key, message) => {
   // This callback is called when exported getMessage() cannot find a message
   // Use it e.g. for error tracking
   console.log(namespace, key, message);
   // 'buttons', 'does-not-exist-key', 'An informative human readable message'
};

export const { locales, messages, translations, getMessage } = mergeMessages(context, optionalCallback);
```

***NOTE: React Native with [Expo](https://expo.io) does not support `require.context`. Instead of it use `babel-plugin-import-glob` with transformation `transformBatchToContext` from this package. For more details, see the Expo example.***

- `locales` - all available locales, e.g. `['en', 'es_ES', 'custom']`
- `messages` - all messages
- `translations` - all translations grouped by locale, e.g. `{en: {...}, es_ES: {...}}`
- `getMessage('namespace', 'key')` - safe message getter, if pair does not exist, returns a default message and reports the missing message

### Usage without React

```js
import { getMessage } from './PHRASES.js';

export const message = getMessage('buttons', 'next');
```

### Usage with React

Wrap a part of an application with `MessagesProvider` (`react-intl` is optional).

```jsx
import { MessagesProvider } from '@wdkit/react-intl-organizer';
import { IntlProvider } from 'react-intl';
import { translations, locales, messages } from './PHRASES.js';

const locale = locales[0];

const App = ({ Component, pageProps }) => (
   <IntlProvider locale={locale} messages={translations?.[locale]}>
      <MessagesProvider messages={messages}>
         <Component {...pageProps} />
      </MessagesProvider>
   </IntlProvider>
);
```

Usage at child components. If there is a callback, consider the creation of a new hook.

```jsx
import { useMessages } from '@wdkit/react-intl-organizer';
import { FormattedMessage } from 'react-intl';

const optionalCallback = (namespace, key, message) => {
   // See optionalCallback example above
};

const Component = () => {
   const getMessage = useMessages(optionalCallback);
   return <FormattedMessage {...getMessage('buttons', 'next')} />;
};
```

## FAQ
- **Q:** Why I may consider to use `react-intl-organizer`?
    - **A:** I have too many message/translation declarations (probably in one file) that may be grouped into namespaces according to their type (buttonLabels, inputLabels, inputPlacehoders, etc.) and split into smaller atomic files (e.g. group of buttonLabels into files per page).
- **Q:** Where are messages/translation IDs?
    - **A:** IDs are auto-generated from file namespace and provided key. E.g. `buttons.ns.js` and key declaration `export default {next: 'Next'}` can be called as `getMessage('buttons', 'next')`.
- **Q:** Why provide namespace and key as string values and increase the chance of typo?
    - **A:** There are cases when messages are chosen dynamically (`label.${valueFromServer}`) – string values persist a unified get-interface. For typos and other missing translations there is a special `optionalCallback()` function that can be provided as a parameter of `mergeMessages()` or `useMessages()`, see Usage section.
- **Q:** What if I declare multiple `buttons.ns.js` name files in subdirectories?
    - **A:** `react-intl-organizer` will try to merge all of them into one `buttons` namespace and notify about possible key conflicts.
- **Q:** Can I use it without webpack?
    - **A:** Yes, if the interface of `context` variable will be the same. I.e. it provides data and keys property (see `prepareMessages.test.js`).

## License

This repository is [MIT licensed](./LICENSE).
