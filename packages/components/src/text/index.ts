import './style.less';
import template from './template.html';
import { componentProxy } from '@/proxy';

componentProxy('ui-text', {
	template,
  props: {
    userSelect: {
      type: Boolean,
      default: false,
    }
  }
});