var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from "react";
import echarts from "echarts";
import _ from "lodash";
/**
 * EChart简单包装
 *
 * @author 慕枫
 */
var ReactEChart = /** @class */ (function (_super) {
    __extends(ReactEChart, _super);
    function ReactEChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.divDom = React.createRef();
        _this.onEvent = function (event) {
            if (Array.isArray(event)) {
                event.forEach(function (item) { return _this.chart.on(item.eventName, item.handler); });
            }
            else {
                _this.chart.on(event.eventName, event.handler);
            }
        };
        _this.render = function () { return React.createElement("div", { ref: _this.divDom, style: _this.props.style }); };
        return _this;
    }
    ReactEChart.prototype.componentDidMount = function () {
        var _a = this.props, theme = _a.theme, opts = _a.opts, option = _a.option, on = _a.on;
        this.chart = echarts.init(this.divDom.current, theme, opts);
        this.chart.setOption(option);
        on && this.onEvent(on);
    };
    ReactEChart.prototype.shouldComponentUpdate = function (_a) {
        var option = _a.option, style = _a.style, opts = _a.opts;
        var _b = this.props, prevStyle = _b.style, prevOpts = _b.opts;
        if (_.isEqual(prevStyle, style) && _.isEqual(prevOpts, opts)) {
            this.chart.setOption(option);
            return false;
        }
        else {
            this.chart.resize();
            return true;
        }
    };
    ReactEChart.defaultProps = {
        option: {},
        opts: { devicePixelRatio: window.devicePixelRatio }
    };
    return ReactEChart;
}(Component));
export default ReactEChart;
export var ECharts = echarts;
//# sourceMappingURL=index.js.map