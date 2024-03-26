import React from "react";
import {
  Button,
  ButtonGroup,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { PencilIcon, TrashIcon } from "lucide-react";

type AdminListProps = {
  content: object[];
  columns: { key: string; label: string }[];
  onDelete?: (elem: object) => void;
  onEdit?: (elem: object) => void;
  onAdd?: () => void;
};

function AdminList(props: AdminListProps) {
  return (
    <React.Fragment>
      <Table aria-label={"Admin table"}>
        <TableHeader columns={props.columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={props.content}>
          {(item) => (
            <TableRow className={"group"}>
              {(column) =>
                column !== "action" ? (
                  <TableCell>{getKeyValue(item, column)}</TableCell>
                ) : (
                  <TableCell
                    className={"opacity-0 w-[1%] group-hover:opacity-100"}
                  >
                    <ButtonGroup>
                      <Button
                        isIconOnly={true}
                        onClick={() => props.onEdit && props.onEdit(item)}
                        color={"primary"}
                      >
                        <PencilIcon size={15} />
                      </Button>
                      <Button
                        isIconOnly={true}
                        onClick={() => props.onDelete && props.onDelete(item)}
                        color={"danger"}
                      >
                        <TrashIcon size={15} />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default AdminList;
