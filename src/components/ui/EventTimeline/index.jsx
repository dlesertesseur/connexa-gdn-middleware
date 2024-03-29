/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Group, ScrollArea, Stack, Text, UnstyledButton } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { daysInMonth, daysInTimeFrame, daysInYear, diffBetweenDays } from "../../../utils/utils";
import Header from "./Header";
import Body from "./Body";
import Column from "./Column";
import Row from "./Row";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import Item from "./Item";
import Layer from "./Layer";

const barColor = "gray.5";

const EventTimeline = ({
  startYear,
  endYear,
  data,
  h,
  headerHeight = 36,
  rowHeight = 46,
  minItemWidth = 200,
  onRowClick,
  monthLabels = null,
  relationPixeDay = 5,
  onInspect,
  layers,
  centered = true,
  offsetDays = 30,
  advanceHeight = 20,
  advantageColor="red"
}) => {
  const targetRef = useRef();
  const itemRef = useRef();
  const bodyRef = useRef();
  const horizontalRef = useRef();

  const [totalWidth, setTotalWidth] = useState(0);
  const [objCols, setObjCols] = useState(null);
  const [objRows, setObjRows] = useState(null);
  const [objItems, setObjItems] = useState(null);
  const [objLayers, setObjLayers] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [daysByYearMonth, setDaysByYearMonth] = useState(null);
  const [firstPosx, setFirstPosX] = useState(null);

  const [scrollXPos, setScrollXPos] = useState(null);
  const [scrollYPos, setScrollYPos] = useState(null);
  const [sizes, setSizes] = useState([200, "auto"]);

  useEffect(() => {
    if (data) {
      if (endYear > startYear) {
        setSizes([minItemWidth, "auto"]);

        const ret = daysInTimeFrame(startYear, endYear);
        setTotalDays(ret.totalDays);
        setDaysByYearMonth(ret.daysByYearMonth);

        const columns = createMonthsList(startYear, endYear, ret.daysByYearMonth);
        setObjCols(columns);

        const w = ret.totalDays * relationPixeDay;
        setTotalWidth(w);

        const arrPosX = [];
        const rows = data?.map((r, index) => createRows(r, index, arrPosX));
        setObjRows(rows);

        if (arrPosX?.length > 0) {
          arrPosX.sort();
          setFirstPosX(arrPosX[0]);
        }

        const items = data?.map((r, index) => createItems(r, index));
        setObjItems(items);
      } else {
        if (endYear === startYear) {
          setSizes([minItemWidth, "auto"]);

          const ret = daysInYear(startYear);
          setTotalDays(ret);

          const columns = createMonthsListFromYear(startYear);
          setObjCols(columns);

          const arrPosX = [];
          const rows = data?.map((r, index) => createRows(r, index, arrPosX));
          setObjRows(rows);

          if (arrPosX?.length > 0) {
            arrPosX.sort();
            setFirstPosX(arrPosX[0]);
          }

          const items = data?.map((r, index) => createItems(r, index));
          setObjItems(items);

          const w = ret * relationPixeDay;
          setTotalWidth(w);
        }
      }
    }

    if (layers) {
      const ret = [];
      layers?.forEach((l, index) => {
        const obj = createObjLayers(l, index);
        if (obj) {
          ret.push(obj);
        }
      });
      setObjLayers(ret);
    }
  }, [startYear, endYear, relationPixeDay, data, layers]);

  useEffect(() => {
    if (centered && firstPosx !== null) {
      const posX = firstPosx - relationPixeDay * offsetDays;
      horizontalRef?.current.scrollTo({ left: posX });
    }
  }, [firstPosx]);

  useEffect(() => {
    if (selectedRowId) {
      const rows = data?.map((r, index) => createRows(r, index));
      setObjRows(rows);

      const items = data?.map((r, index) => createItems(r, index));
      setObjItems(items);
    }
  }, [selectedRowId]);

  // useEffect(() => {
  //   if (layers) {
  //     const ret = [];
  //     layers?.forEach((l) => {
  //       const obj = createObjLayers(l);
  //       if (obj) {
  //         ret.push(obj);
  //       }
  //     });
  //     setObjLayers(ret);
  //   }
  // }, [layers]);

  function createObjLayers(layer, index) {
    let posX = 0;
    let ret = null;
    const startDate = new Date(startYear, 0, 1);

    const day1 = layer.startDateTime < startDate.getTime() ? startDate.getTime() : layer.startDateTime;

    if (layer.endDateTime.getTime() >= day1) {
      let diffInDays = diffBetweenDays(day1, layer.endDateTime);

      if (diffInDays === 0) {
        diffInDays = 1;
      }
      const blockW = diffInDays * relationPixeDay;

      if (layer.startDateTime < startDate.getTime()) {
        posX = 0;
      } else {
        posX = diffBetweenDays(startDate, layer.startDateTime) * relationPixeDay;
      }

      ret = (
        <Layer
          key={layer.id}
          id={layer.id}
          order={index}
          h={layer.h ? layer.h : h}
          w={blockW}
          left={posX}
          color={layer.color}
          border={layer.border}
          borderColor={layer.borderColor}
          borderWidth={layer.borderWidth}
        />
      );
    }

    return ret;
  }

  const createMonthsList = (startYear, endYear, daysByYearMonth) => {
    const ret = [];
    const totlalYears = endYear - startYear + 1;

    for (let years = 0; years < totlalYears && daysByYearMonth; years++) {
      for (let month = 0; month < 12; month++) {
        const yyyy = startYear + years;
        const mm = month + 1;
        const id = `${yyyy}${mm.toString().padStart(2, "0")}`;
        const label = monthLabels ? monthLabels[month] : null;
        const text = `${yyyy} / ${mm.toString().padStart(2, "0")}`;
        const days = daysByYearMonth.get(`${yyyy}-${month}`);
        const columnWidth = days * relationPixeDay;
        const col = <Column key={id} id={id} text={text} label={label} w={columnWidth} align={"center"} />;
        ret.push(col);
      }
    }
    return ret;
  };

  const createMonthsListFromYear = (year) => {
    const ret = [];

    for (let month = 0; month < 12; month++) {
      const yyyy = year;
      const mm = month + 1;
      const id = `${yyyy}${mm.toString().padStart(2, "0")}`;
      const label = monthLabels ? monthLabels[month] : null;
      const text = `${yyyy} / ${mm.toString().padStart(2, "0")}`;
      const days = daysInMonth(month + 1, year);
      const columnWidth = days * relationPixeDay;
      const col = <Column key={id} id={id} text={text} label={label} w={columnWidth} align={"center"} />;
      ret.push(col);
    }
    return ret;
  };

  const onRowSelected = (id) => {
    setSelectedRowId(id);
    if (onRowClick) {
      onRowClick(id);
    }
  };

  const createRows = (r, index, arrPosX) => {
    let ret = null;
    if (r.parts) {
      ret = createRowsInParts(r, index, arrPosX);
    } else {
      ret = createRowsInBlock(r, index, arrPosX);
    }

    return ret;
  };

  const createRowsInParts = (r, index, arrPosX) => {
    const parts = createParts(r.id, r.parts, arrPosX);
    const advantage = calculateAdvantage(r.parts);

    const ret = (
      <Row key={r.id} id={r.id} order={index} selected={r.id === selectedRowId ? true : false} onClick={onRowSelected}>
        <Stack gap={0} h={rowHeight} w={"100%"}>
          <Group gap={0} h={rowHeight - advanceHeight}>
            {parts}
          </Group>
          <Group h={advanceHeight} w={"100%"}>
            <Box
              pos={"relative"}
              bg={advantageColor}
              left={advantage.posX}
              w={advantage.blockW}
              h={"100%"}
            >
              <Group h={"100%"} align="center" w={"100%"} justify="center">
                <Text size="xs" fw={700}>
                  {`${advantage.percentage}%`}
                </Text>
              </Group>
            </Box>
          </Group>
        </Stack>
      </Row>
    );
    return ret;
  };

  function createParts(id, parts, arrPosX) {
    const blocks = [];
    let posX = -1;

    const ret = parts.forEach((p, index) => {
      const startDate = new Date(startYear, 0, 1);
      const day1 = p.startDateTime < startDate.getTime() ? startDate.getTime() : p.startDateTime;

      const diffInDays = diffBetweenDays(day1, p.endDateTime);

      const blockW = diffInDays * relationPixeDay;

      if (posX < 0) {
        if (p.startDateTime < startDate.getTime()) {
          posX = 0;
        } else {
          posX = diffBetweenDays(startDate, p.startDateTime) * relationPixeDay;
        }
        arrPosX?.push(posX);
      }

      const ret = createPart(id, p, posX, blockW, index);
      blocks.push(ret);
    });

    return blocks;
  }

  function calculateAdvantage(parts) {
    let posX = -1;
    let blockW = 0;
    let advantagePercentage = 0;

    parts.forEach((p, index) => {
      const startDate = new Date(startYear, 0, 1);
      const day1 = p.startDateTime < startDate.getTime() ? startDate.getTime() : p.startDateTime;

      const diffInDays = diffBetweenDays(day1, p.endDateTime);

      blockW += (diffInDays * relationPixeDay * p.percentage) / 100.0;
      advantagePercentage += p.percentage;

      if (posX < 0) {
        if (p.startDateTime < startDate.getTime()) {
          posX = 0;
        } else {
          posX = diffBetweenDays(startDate, p.startDateTime) * relationPixeDay;
        }
      }
    });

    const totalPercentage = parts.length * 100;
    const percentage = (advantagePercentage * 100.0) / totalPercentage;

    return { posX: posX, blockW: blockW, percentage: percentage };
  }

  function createPart___(r, posX, blockW) {
    const ret = (
      <Box py={2} pos={"relative"} h={rowHeight} w={blockW} left={posX}>
        <UnstyledButton
          onClick={() => {
            onInspect ? onInspect(r) : null;
          }}
          h={"100%"}
          w={"100%"}
          bg={r.color ? r.color : barColor}
          style={{ borderRadius: 0 }}
        >
          <Box
            pos={"absolute"}
            top={5}
            left={0}
            h={rowHeight - 10}
            w={`${r.percentage}%`}
            bg={"rgba( 0, 0, 0, 0.1 )"}
          ></Box>

          <Group gap={0} px={5} justify="center">
            <Stack gap={0} align="center">
              <Text truncate="end" fw={500} size="sm" mr={"xs"}>
                {r.name}
              </Text>
              <Text fw={500} size="lg">{`${r.percentage}%`}</Text>
            </Stack>
          </Group>
        </UnstyledButton>
      </Box>
    );

    return ret;
  }

  function createPart(id, r, posX, blockW, index) {
    const ret = (
      <Box key={`${id}-${r.id}`} py={2} pos={"relative"} h={rowHeight - advanceHeight} w={blockW} left={posX}>
        <Stack gap={0} h={"100%"}>
          <UnstyledButton
            onClick={() => {
              onInspect ? onInspect(r) : null;
            }}
            h={"100%"}
            w={"100%"}
            bg={index % 2 ? "blue.5" : "blue.4"}
            style={{ borderRadius: 0 }}
          >
            <Group gap={0} px={5} justify="center" h={"100%"} align="flex-start">
              <Stack gap={0} align="center" mt={index * 12}>
                <Text truncate="end" fw={600} size="xs" mr={"xs"} style={{ zIndex: 100 }}>
                  {r.name}
                </Text>
              </Stack>
            </Group>
          </UnstyledButton>
        </Stack>
      </Box>
    );

    return ret;
  }

  const createRowsInBlock = (r, index, arrPosX) => {
    let posX = 0;
    const startDate = new Date(startYear, 0, 1);

    const day1 = r.startDateTime < startDate.getTime() ? startDate.getTime() : r.startDateTime;

    const diffInDays = diffBetweenDays(day1, r.endDateTime);

    const blockW = diffInDays * relationPixeDay;

    if (r.startDateTime < startDate.getTime()) {
      posX = 0;
    } else {
      posX = diffBetweenDays(startDate, r.startDateTime) * relationPixeDay;
    }

    arrPosX?.push(posX);

    const ret = (
      <Row key={r.id} id={r.id} order={index} selected={r.id === selectedRowId ? true : false} onClick={onRowSelected}>
        <Box py={2} pos={"relative"} h={rowHeight} w={blockW} left={posX}>
          <UnstyledButton
            onClick={() => {
              onInspect ? onInspect(r) : null;
            }}
            h={"100%"}
            w={"100%"}
            bg={r.color ? r.color : barColor}
            style={{ borderRadius: 0 }}
          ></UnstyledButton>
        </Box>
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
        <Stack gap={0} miw={minItemWidth} h={rowHeight} justify="center">
          <Group gap={0} px={3} justify="flex-start" align="center">
            <Text fw={500} size="sm" truncate="end">
              {r.name}
            </Text>
          </Group>
          <Group gap={0} px={3} justify="flex-start" align="center">
            <Text fw={600} size="xs" truncate="end">
              {r.description}
            </Text>
          </Group>

          {r.values
            ? r.values.map((v) => {
                const ret = (
                  <Group key={`${r.id}-${v.label}`} wrap="nowrap" gap={5} px={3} justify="flex-start" align="center">
                    <Text miw={"25%"} fw={700} size="xs" truncate="end">
                      {v.label}
                    </Text>
                    <Text fw={600} size="xs" truncate="end">
                      {v.value ? v.value : "(NO DEFINIDO)"}
                    </Text>
                  </Group>
                );

                return ret;
              })
            : null}
        </Stack>
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
            viewportRef={horizontalRef}
            //offsetScrollbars
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
              {
                <Body h={h - headerHeight}>
                  {objRows}
                  {objLayers}
                </Body>
              }
            </ScrollArea>
          </ScrollArea>
        </Stack>
      </SplitPane>
    </div>
  );
};

export default EventTimeline;
