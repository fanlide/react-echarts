import React, { Component, CSSProperties } from "react";
import echarts from "echarts";
interface IProps {
    option: echarts.EChartOption;
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
    componentType: string;
    seriesType: string;
    seriesIndex: number;
    seriesName: string;
    name: string;
    dataIndex: number;
    data: object;
    dataType: string;
    value: number | number[];
    color: string;
}
/**
 * EChart简单包装
 *
 * @author 慕枫
 */
export default class ReactEChart extends Component<IProps> {
    static defaultProps: IProps;
    divDom: React.RefObject<HTMLDivElement>;
    chart: echarts.ECharts;
    componentDidMount(): void;
    shouldComponentUpdate({ option, style, opts }: Readonly<IProps>): boolean;
    onEvent: (event: IEvent | IEvent[]) => void;
    render: () => JSX.Element;
}
export declare const ECharts: typeof echarts;
export {};
