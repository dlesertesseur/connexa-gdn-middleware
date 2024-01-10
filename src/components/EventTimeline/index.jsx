/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Group, ScrollArea, Stack, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import Column from "./Column";
import Row from "./Row";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import Item from "./Item";
import { daysInYear } from "../../utils/utils";

const EventTimeline = ({
  startYear,
  endYear,
  data,
  h,
  headerHeight = 36,
  rowHeight = 46,
  minItemWidth = 200,
  cw = 100,
  onRowClick,
  monthLabels = null,
}) => {
  const targetRef = useRef();
  const itemRef = useRef();
  const bodyRef = useRef();

  const [totalWidth, setTotalWidth] = useState(0);
  const [objCols, setObjCols] = useState(null);
  const [objRows, setObjRows] = useState(null);
  const [objItems, setObjItems] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [columnWidth, setColumnWidth] = useState(cw);
  const [totalDays, setTotalDays] = useState(0);

  const [scrollXPos, setScrollXPos] = useState(null);
  const [scrollYPos, setScrollYPos] = useState(null);
  const [sizes, setSizes] = useState([200, "auto"]);

  useEffect(() => {
    if (endYear >= startYear) {
      setSizes([minItemWidth, "auto"]);
      let w = columnWidth * 12 * (endYear - startYear + 1);
      setTotalWidth(w);

      const columns = createMonthsList(startYear, endYear);
      setObjCols(columns);

      const rows = data?.map((r, index) => createRows(r, index));
      setObjRows(rows);

      const items = data?.map((r, index) => createItems(r, index));
      setObjItems(items);

      let totalDays = 0;
      for (let year = startYear; year <= endYear; year++) {
        totalDays += daysInYear(year);
      }
      setTotalDays(totalDays);
    }
  }, [startYear, endYear, data]);

  useEffect(() => {
    if (selectedRowId) {
      const rows = data?.map((r, index) => createRows(r, index));
      setObjRows(rows);

      const items = data?.map((r, index) => createItems(r, index));
      setObjItems(items);
    }
  }, [selectedRowId]);

  const createMonthsList = (startYear, endYear) => {
    const ret = [];
    const totlalYears = endYear - startYear + 1;

    for (let years = 0; years < totlalYears; years++) {
      for (let month = 0; month < 12; month++) {
        const yyyy = startYear + years;
        const mm = month + 1;
        const id = `${yyyy}${mm.toString().padStart(2, "0")}`;
        const label = monthLabels ? monthLabels[month] : null;
        const text = `${yyyy} / ${mm.toString().padStart(2, "0")}`;
        const col = <Column key={id} id={id} text={text} label={label} w={columnWidth} align={"center"} />;
        ret.push(col);
      }
    }
    return ret;
  };

  const onRowSelected = (id) => {
    setSelectedRowId(id);
    if (onRowClick) {
      onRowClick(id);
    }
  };

  const createRows = (r, index) => {
    const ret = (
      <Row key={r.id} id={r.id} order={index} selected={r.id === selectedRowId ? true : false} onClick={onRowSelected}>
        <Group px={3} h={rowHeight} justify="flex-start" align="center">
          <Text fw={500} size="sm">
            {r.name}
          </Text>
        </Group>
      </Row>
    );
    return ret;
  };

  const createItems = (r, index) => {
    const bgColor = index % 2 === 0 ? "white" : "gray.2";
    const ret = (
      <Item
        key={r.id}
        id={r.id}
        label={r.label}
        order={index}
        selected={r.id === selectedRowId ? true : false}
        onClick={onRowSelected}
        bg={bgColor}
        miw={minItemWidth}
      >
        <Group px={3} h={rowHeight} justify="flex-start" align="center" miw={minItemWidth}>
          <Text fw={500} size="sm">
            {r.name}
          </Text>
        </Group>
      </Item>
    );
    return ret;
  };

  return (
    <div style={{ height: h }}>
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane minSize={minItemWidth} maxSize="50%">
          <Stack h={h} gap={0} style={{ borderTop: "1px solid #C5C5C5", borderLeft: "1px solid #C5C5C5" }}>
            <Group gap={0} h={headerHeight - 1} style={{ borderBottom: "1px solid #C5C5C5" }} />
            <ScrollArea
              //offsetScrollbars
              viewportRef={itemRef}
              scrollbars={"y"}
              w={"100%"}
              onScrollPositionChange={(e) => {
                bodyRef?.current.scrollTo({ top: e.y });
              }}
            >
              <Stack h={h - headerHeight} gap={0}>
                {objItems}
              </Stack>
            </ScrollArea>
          </Stack>
        </Pane>

        <Stack ref={targetRef} gap={"xs"} h={h} style={{ borderLeft: "1px solid #C5C5C5" }}>
          <ScrollArea
            scrollbars={"x"}
            onScrollPositionChange={(e) => {
              setScrollXPos(e.x);
            }}
          >
            <Header h={headerHeight}>{objCols}</Header>
            <ScrollArea
              type="never"
              viewportRef={bodyRef}
              scrollbars={"y"}
              w={totalWidth}
              onScrollPositionChange={(e) => {
                itemRef?.current.scrollTo({ top: e.y });
              }}
            >
              <Body h={h - headerHeight}>{objRows}</Body>
            </ScrollArea>
          </ScrollArea>
        </Stack>
      </SplitPane>
    </div>
  );
};

export default EventTimeline;
