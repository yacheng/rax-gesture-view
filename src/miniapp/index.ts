import fmtEvent from './fmtEvent';

const startPoint = {
  x: 0,
  y: 0
};
let isHorizontal = true;
let touchMoveStarted = false;

Component({
  data: {},
  props: {
    style: "",
    onVerticalPan: () => {},
    onHorizontalPan: () => {}
  },
  didMount: function didMount() {},
  methods: {
    onTouchStart(e) {
      var event = fmtEvent(this.props, e);
      startPoint.x = e.changedTouches[0].pageX
      startPoint.y = e.changedTouches[0].pageY
    },
    onTouchMove(e) {
      var event = fmtEvent(this.props, e);
      if (!touchMoveStarted) {
        const touchMoveStartPoint = {
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY
        }
        touchMoveStarted = true;

        if (Math.abs(startPoint.x - touchMoveStartPoint.x) < 20) {
          isHorizontal = false;
        } else {
          isHorizontal = true;
        }

        if (isHorizontal) {
          e.state = 'onHorizontalPan:start';
          this.props.onHorizontalPan(e);
        } else {
          e.state = 'onVeriticalPan:start';
          this.props.onVerticalPan(e);
        }
      }

      if (isHorizontal) {
        e.state = 'onHorizontalPan:move';
        this.props.onHorizontalPan(e);
      } else {
        e.state = 'onVeriticalPan:move';
        this.props.onVerticalPan(e);
      }
    },
    onTouchEnd(e) {
      touchMoveStarted = false;

      if (isHorizontal) {
        e.state = 'onHorizontalPan:end';
        this.props.onHorizontalPan(e);
      } else {
        e.state = 'onVeriticalPan:end';
        this.props.onVerticalPan(e);
      }
    }
  }
});