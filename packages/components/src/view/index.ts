import './style.less';
import template from './template.html';
import { componentProxy } from '@/proxy';

componentProxy('ui-view', {
	template,
	methods: {
		clicked() {
			(this as any).$emit('tap');
		}
	}
});