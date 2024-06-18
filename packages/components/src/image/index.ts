import './style.less';
import template from './template.html';
import { componentProxy } from '@/proxy';

componentProxy('ui-image', {
	template,
  props: {
    src: {
      type: String,
      default: '',
    }
  }
});