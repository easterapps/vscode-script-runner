// Source: https://gist.github.com/gcnew/5d78006b0cf80a292969

// Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegExp(string: string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * overloads:
 *   strtr(String string, String from, String to): String
 *   strtr(String string, Dictionary<String, String> translations): String
 */
export function strtr(string: string, from: { [id: string]: string }|string , to?: string): string {
	let translations: { [id: string]: string } = {};

	if (typeof(from) === 'string') {
		// translations[from] = to;

		return strtr(string, translations);
	}

	translations = from;
	return Object.keys(translations)
		.reduce(function(acc, from) {
			let fromRx = new RegExp(escapeRegExp(from), 'g');
			let to = String(translations[from]).replace(/\$/g, '$$$$');

			return acc.replace(fromRx, to);
		}, string);
}