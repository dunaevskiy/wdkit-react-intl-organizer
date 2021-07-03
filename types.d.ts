export declare const mergeMessages: (
	context: Object,
	warningCallback?: ({ ns, key, message }) => void,
) => {
	locales: string[];
	messages: {};
	translations: {};
	getMessage: (ns: string, key: string) => Object;
};
export declare const MessagesProvider: ({ messages, children }) => Object;
export declare const MessagesContext: Object;
export declare const useMessages: (
	warningCallback?: ({ ns, key, message }) => void,
) => (ns: string, key: string) => Object;
