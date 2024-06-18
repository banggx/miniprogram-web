import './style.less';
import '../../lib/swiper.less';
import template from './template.html';
import { componentProxy } from '@/proxy';
import Swiper from 'swiper';

componentProxy('ui-swiper', {
	template,
  props: {
    vertical: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    initSwiper() {
      const self = this as any;
      new Swiper((this as any).$el, {
        longSwipesRatio: 0.2,
        direction: (this as any).vertical ? 'vertical' : 'horizontal',
        on: {
          slideChangeTransitionEnd: function() {
            self.$emit('change', {
              current: (this as any).activeIndex,
            });
          }
        }
      })
    }
  },
  mounted() {
    this.initSwiper();
  }
});