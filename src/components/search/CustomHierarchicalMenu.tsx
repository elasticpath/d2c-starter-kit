import {
  useHierarchicalMenu,
  UseHierarchicalMenuProps,
} from "react-instantsearch-hooks-web";
import { clsx } from "clsx";
import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react";

type HierarchicalListProps = Pick<
  ReturnType<typeof useHierarchicalMenu>,
  "items" | "createURL"
> & {
  onNavigate: (value: string) => void;
};

export type HierarchicalMenuProps = React.ComponentProps<"div"> &
  HierarchicalListProps & {
    hasItems: boolean;
    showMore?: boolean;
    canToggleShowMore: boolean;
    isShowingMore: boolean;
  };

function HierarchicalList({
  items,
  createURL,
  onNavigate,
}: HierarchicalListProps) {
  return (
    <UnorderedList display="grid" gap={2} listStyleType="none">
      {items.map((item) => (
        <ListItem
          key={item.value}
          className={clsx(
            "ais-HierarchicalMenu-item",
            item.data && clsx("ais-HierarchicalMenu-item--parent"),
            item.isRefined && clsx("ais-HierarchicalMenu-item--selected")
          )}
        >
          <a
            className={clsx("ais-HierarchicalMenu-link")}
            href={createURL(item.value)}
            onClick={(event) => {
              if (isModifierClick(event)) {
                return;
              }
              event.preventDefault();
              onNavigate(item.value);
            }}
          >
            <Flex gap={2}>
              <Box
                as="span"
                fontSize="sm"
                className={clsx("ais-HierarchicalMenu-label")}
              >
                {item.label}
              </Box>
              {/* <Tag fontSize="sm" className={clsx("ais-HierarchicalMenu-count")}>
                {item.count}
              </Tag> */}
            </Flex>
          </a>
          {item.data && item.data.length > 0 && (
            <Box pt={2}>
              <HierarchicalList
                items={item.data!}
                onNavigate={onNavigate}
                createURL={createURL}
              />
            </Box>
          )}
        </ListItem>
      ))}
    </UnorderedList>
  );
}

export default function CustomHierarchicalMenu(
  props: UseHierarchicalMenuProps
): JSX.Element {
  const { items, canRefine, refine, createURL } = useHierarchicalMenu(props);

  const hasItems = canRefine;
  const onNavigate = refine;

  return (
    <div
      {...props}
      className={clsx(
        "ais-HierarchicalMenu",
        !hasItems && clsx("ais-HierarchicalMenu--noRefinement")
      )}
    >
      <HierarchicalList
        items={items}
        onNavigate={onNavigate}
        createURL={createURL}
      />
    </div>
  );
}

function isModifierClick(event: React.MouseEvent) {
  const isMiddleClick = event.button === 1;

  return Boolean(
    isMiddleClick ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
  );
}
