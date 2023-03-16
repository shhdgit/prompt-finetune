import {
  Axis,
  Chart,
  LineSeries,
  Position,
  ScaleType,
  Settings,
  timeFormatter,
  niceTimeFormatByDay,
  Tooltip,
  LineAnnotation
} from '@elastic/charts'

const CaseCountChart: React.FC<{ data: { error: number; time: number; total: number }[] }> = ({ data }) => {
  const errorData = data.map((d) => [d.time, d.error])
  const totalData = data.map((d) => [d.time, d.total])
  return (
    // React@18 compatibility issue about React children type
    // @ts-ignore
    <Chart size={{ height: 300 }}>
      <Settings showLegend showLegendExtra legendPosition={Position.Right} legendSize={100} />
      <Tooltip stickTo="MousePosition" />
      <Axis
        id="bottom"
        position={Position.Bottom}
        showOverlappingTicks
        tickFormat={timeFormatter(niceTimeFormatByDay(31))}
      />
      <Axis id="left" title="Count" position={Position.Left} />
      <LineSeries
        id="error"
        name="Error"
        xScaleType={ScaleType.Time}
        yScaleType={ScaleType.Linear}
        xAccessor={0}
        yAccessors={[1]}
        data={errorData}
      />
      <LineSeries
        id="total"
        name="Total"
        xScaleType={ScaleType.Time}
        yScaleType={ScaleType.Linear}
        xAccessor={0}
        yAccessors={[1]}
        data={totalData}
      />
    </Chart>
  )
}

export default CaseCountChart
