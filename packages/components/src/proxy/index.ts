function toCamelCase(attr) {
	return attr.toLowerCase().replace(/-(.)/g, function(match, group1) {
    return group1.toUpperCase();
  });
}

function makeAttrParams(attrs) {
	const result = {};

	for (const attr in attrs) {
		if (!/^data-/.test(attr)) {
			continue;
		}

		const theAfter = attr.replace(/^data-/, '');
		const transAttr = toCamelCase(theAfter);

		result[transAttr] = attrs[attr];
	}

	return result;
}

export function componentProxy(name, opts) {
	opts.mixins = [{
		created() {
			for (let attr in this.$attrs) {
				if (!/^bind/.test(attr)) {
					continue;
				}

				if (!this.$attrs[attr]) {
					continue;
				}

				const eventName = attr.replace(/^bind/, '');
				const { methodName, params } = this.$attrs[attr];
				const { id } = this.$vnode.context._bridgeInfo;

				this.$on(eventName, (sysParams) => {
					const _event = {
						detail: {
							...sysParams
						},
						currentTarget: {
							dataset: makeAttrParams(this.$attrs)
						}
					};
					const paramsList = params.map(param => {
						if (param === '$event') {
							return _event;
						}
						return param;
					});
					
					if (!paramsList.length) {
						paramsList.push(_event);
					}

					window.JSBridge.onReceiveUIMessage({
						type: 'triggerEvent',
						body: {
							methodName,
							id,
							paramsList
						}
					});
				});
			}
		}
	}];

	(window as any).Vue.component(name, opts);
}