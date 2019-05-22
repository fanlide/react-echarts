import React, {Component, CSSProperties} from "react";
import echarts, {EChartOption} from "echarts";
import _ from "lodash";

interface IProps {
  option: EChartOption;
  theme?: string | object;
  opts?: {
    devicePixelRatio?: number;
    renderer?: "canvas" | "svg";
    width?: number;
    height?: number;
  };
  style?: CSSProperties;
  on?: IEvent | IEvent[];
}

interface IEvent {
  eventName: "click" | "dblclick" | "mousedown" | "mousemove" | "mouseup" | "mouseover" | "mouseout" | "globalout" | "contextmenu";
  handler: (params: IHandlerParams) => void;
}

interface IHandlerParams {
  // 当前点击的图形元素所属的组件名称，
  // 其值如 'series'、'markLine'、'markPoint'、'timeLine' 等。
  componentType: string;
  // 系列类型。值可能为：'line'、'bar'、'pie' 等。当 componentType 为 'series' 时有意义。
  seriesType: string;
  // 系列在传入的 option.series 中的 index。当 componentType 为 'series' 时有意义。
  seriesIndex: number;
  // 系列名称。当 componentType 为 'series' 时有意义。
  seriesName: string;
  // 数据名，类目名
  name: string;
  // 数据在传入的 data 数组中的 index
  dataIndex: number;
  // 传入的原始数据项
  data: object;
  // sankey、graph 等图表同时含有 nodeData 和 edgeData 两种 data，
  // dataType 的值会是 'node' 或者 'edge'，表示当前点击在 node 还是 edge 上。
  // 其他大部分图表中只有一种 data，dataType 无意义。
  dataType: string;
  // 传入的数据值
  value: number | number[];
  // 数据图形的颜色。当 componentType 为 'series' 时有意义。
  color: string;
}

/**
 * EChart简单包装
 *
 * @author 慕枫
 */
export default class ReactEChart extends Component<IProps> {
  static defaultProps: IProps = {
    option: {},
    opts: {devicePixelRatio: window.devicePixelRatio},
  };

  divDom = React.createRef<HTMLDivElement>();
  chart: echarts.ECharts;

  componentDidMount() {
    const {theme, opts, option, on} = this.props;
    this.chart = echarts.init(this.divDom.current, theme, opts);
    this.chart.setOption(option);
    on && this.onEvent(on);
  }

  shouldComponentUpdate({option, style, opts}: Readonly<IProps>) {
    const {style: prevStyle, opts: prevOpts} = this.props;
    if (_.isEqual(prevStyle, style) && _.isEqual(prevOpts, opts)) {
      this.chart.setOption(option);
      return false;
    } else {
      this.chart.resize();
      return true;
    }
  }

  onEvent = (event: IEvent | IEvent[]) => {
    if (Array.isArray(event)) {
      event.forEach(item => this.chart.on(item.eventName, item.handler));
    } else {
      this.chart.on(event.eventName, event.handler);
    }
  };

  render = () => <div ref={this.divDom} style={this.props.style} />;
}

export const ECharts = echarts;
